import { Server } from "socket.io";
import { getUserCarById } from "./database/repos/userCarsRepo.js";
import {
  getRandomTrackIds,
  getTracksById,
} from "./database/repos/tracksRepo.js";
import { calculateWinner } from "./utils/gameLogic/matchCalculation.js";

const gameRooms = new Map();

export function initSocket(server, sessionMiddleware) {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    const session = socket.request.session;
    const user = session.user; // { email: '1', nickname: 'user1', id: 1 }
    console.log("✅ A client connected:", socket.id);

    if (user) {
      // -------------------------------------------------------------------------------------------

      socket.on("findGame", async () => {
        // Find ledigt room...
        let room = [...gameRooms.values()].find(
          (room) => room.players.length === 1
        );

        // ...og hvis der er et rum
        if (room) {
          room.players.push({
            userId: user.id,
            nickname: user.nickname,
            cars: {},
            ready: false,
            socketId: socket.id,
          });
        }
        // ...ellers så oprettes et nyt rum
        else {
          room = {
            id: crypto.randomUUID(),
            players: [
              {
                //og put sig selv i det nye rum
                userId: user.id,
                nickname: user.nickname,
                cars: {},
                ready: false,
                socketId: socket.id,
              },
            ],
            trackIds: await getRandomTrackIds(5),
          };
          gameRooms.set(room.id, room);
        }

        socket.join(room.id);
        console.log(`🧩 ${user.nickname} joined room ${room.id}`);
        io.to(room.id).emit("roomContent", room);
      });

      // -------------------------------------------------------------------------------------------

      socket.on("chooseCar", ({ roomId, car, trackId }) => {
        const room = gameRooms.get(roomId);
        if (!room) return;

        const player = room.players.find((p) => p.userId === user.id);
        if (!player) return;

        // Gem valgte bil for den spiller
        player.cars[trackId] = car;

        // hvis playeren har valgt alle fem biler, så send til alle i rummet
        console.log(player.nickname, Object.keys(player.cars).length);
        if (Object.keys(player.cars).length === 5) {
          io.to(room.id).emit("roomContent", room);

          // ellers send til modstanderen
        } else {
          socket.to(room.id).emit("roomContent", room);
        }
      });

      // -------------------------------------------------------------------------------------------

      socket.on("removeCar", ({ roomId, trackId }) => {
        const room = gameRooms.get(roomId);
        if (!room) return;

        const player = room.players.find((p) => p.userId === user.id);
        if (!player) return;

        delete player.cars[trackId];

        player.ready = false;

        // Send opdateret spillerdata til alle i rummet
        // nødt til at sende til alle i rummet (io.to()) da den ene spiller skal vide at den anden har fjernet en bil,
        // og den anden skal have frataget ready knappen, som afhænger af antal biler.
        io.to(room.id).emit("roomContent", room);
      });

      // -------------------------------------------------------------------------------------------

      socket.on("clickedReady", async ({ roomId, ready }) => {
        const room = gameRooms.get(roomId);
        if (!room) return;

        const player = room.players.find((p) => p.userId === user.id);
        if (!player) return;

        // Opdater ready status
        player.ready = ready;

        io.to(room.id).emit("roomContent", room); // fortæller alle spillere at spiller trykkede "klar"

        const allReady =
          room.players.length === 2 && room.players.every((p) => p.ready);
        if (!allReady) return;

        io.to(roomId).emit("raceStarted");
        const playerNrOfWins = {
          [room.players[0].userId]: 0,
          [room.players[1].userId]: 0,
        };

        // Løb igennem de 5 tracks
        for (let i = 0; i < room.trackIds.length; i++) {
          const trackId = room.trackIds[i];
          const track = await getTracksById(trackId);

          // Find de to spillere og deres valgte biler til denne bane
          const cars = room.players.map((player) => player.cars[trackId]);

          // Vinderen bestemmes
          const roundWinnerCar = calculateWinner(cars, track);

          if (roundWinnerCar) {
            // Find ejeren af vinderbil
            const roundWinner = room.players.find(
              (p) => p.cars[trackId].user_car_id === roundWinnerCar.user_car_id
            );
            // Vent 5 sekunder for at simulere et race
            await new Promise((res) => setTimeout(res, 5000));

            // hvis en spiller er leavet
            if (room.players.length !== 2) {
              io.to(roomId).emit("matchResult", {
                winner: {
                  nickname: room.players[0].nickname,
                  userId: room.players[0].userId,
                },
                opponentLeft: true,
              });
              return;
            }

            playerNrOfWins[roundWinner.userId] += 1;
            io.to(roomId).emit("raceResult", {
              trackId: trackId,
              winner: {
                nickname: roundWinner.nickname,
                userId: roundWinner.userId,
                carId: roundWinnerCar.user_car_id,
              },
            });
          } else {
            io.to(roomId).emit("raceResult", {
              trackId: trackId,
              winner: null,
            });
          }
        }
        const sortedWins = Object.entries(playerNrOfWins).sort(
          (a, b) => b[1] - a[1]
        );

        if (sortedWins[0][1] === sortedWins[1][1]) {
          io.to(roomId).emit("matchResult", {
            winner: null,
            opponentLeft: false,
          });
          return;
        }

        const [matchWinnerId, nrOfWins] = sortedWins[0];

        const winner = room.players.find((p) => p.userId == matchWinnerId);

        io.to(roomId).emit("matchResult", {
          winner: {
            nickname: winner.nickname,
            userId: winner.userId,
          },
          opponentLeft: false,
        });
      });

      // -------------------------------------------------------------------------------------------

      // -------------------------------------------------------------------------------------------

      socket.on("user-leaves-room", ({ roomId }) => {
        if (!roomId) return;
        const room = gameRooms.get(roomId);
        if (!room) return;

        // filtrerer spiller med socket id fra
        room.players = room.players.filter(
          (player) => player.socketId !== socket.id
        );
        socket.leave(roomId);

        if (room.players.length === 0) {
          gameRooms.delete(roomId);
        }
      });

      // -------------------------------------------------------------------------------------------

      socket.on("disconnect", () => {
        console.log("❌ A client disconnected:", socket.id);

        for (const [roomId, room] of gameRooms.entries()) {
          room.players = room.players.filter(
            (player) => player.socketId !== socket.id
          );

          if (room.players.length === 0) {
            gameRooms.delete(roomId);
          }
        }
      });
    }
  });
}
