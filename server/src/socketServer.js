import { Server } from "socket.io";

import { getRandomTrackIds, getTrackById } from "./database/repos/tracksRepo.js";
import { calculateWinner } from "./utils/gameLogic/matchCalculation.js";
import { addToCashBalanceByUserId } from "./database/repos/usersRepo.js";

export function initSocket(server, sessionMiddleware) {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);

  const gameRooms = new Map();

  io.on("connection", (socket) => {
    const session = socket.request.session;
    const user = session.user;

    if (user) {
      // -------------------------------------------------------------------------------------------

      socket.on("findGame", async () => {
        let room = [...gameRooms.values()].find(
          (room) => room.players.length === 1
        );

        if (room) {
          room.players.push({
            userId: user.id,
            nickname: user.nickname,
            cars: {},
            ready: false,
            socketId: socket.id,
          });
        } else {
          room = {
            id: crypto.randomUUID(),
            players: [
              {
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
        io.to(room.id).emit("roomContent", room);
      });

      // -------------------------------------------------------------------------------------------

      socket.on("chooseCar", ({ roomId, car, trackId }) => {
        const room = gameRooms.get(roomId);
        if (!room) return;

        const player = room.players.find((p) => p.userId === user.id);
        if (!player) return;

        player.cars[trackId] = car;

        if (Object.values(player.cars).length === 5) {
          io.to(room.id).emit("roomContent", room);
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

        io.to(room.id).emit("roomContent", room);
      });

      // -------------------------------------------------------------------------------------------

      socket.on("clickedReady", async ({ roomId, ready }) => {
        const room = gameRooms.get(roomId);
        if (!room) return;

        const player = room.players.find((p) => p.userId === user.id);
        if (!player) return;

        player.ready = ready;

        io.to(room.id).emit("roomContent", room);

        const allReady =
          room.players.length === 2 && room.players.every((p) => p.ready);
        if (!allReady) return;

        io.to(roomId).emit("raceStarted");

        const playerNrOfWins = {
          [room.players[0].userId]: 0,
          [room.players[1].userId]: 0,
        };

        for (let i = 0; i < room.trackIds.length; i++) {
          const trackId = room.trackIds[i];
          const track = await getTrackById(trackId);

          const cars = room.players.map((player) => player.cars[trackId]);

          const roundWinnerCar = calculateWinner(cars, track);
          // Vent 5 sekunder for at simulere et race
          await new Promise((res) => setTimeout(res, 5000));
          const opponentLeft = room.players.length !== 2;
          if (opponentLeft) {
            await endMatch(opponentLeft);
            return;
          }

          if (roundWinnerCar) {
            const roundWinner = room.players.find(
              (p) => p.cars[trackId].user_car_id === roundWinnerCar.user_car_id
            );
            playerNrOfWins[roundWinner.userId] += 1;
            endRace(trackId, roundWinner, roundWinnerCar);
          } else {
            endRace(trackId);
          }
        }

        const sortedWins = Object.entries(playerNrOfWins).sort(
          (a, b) => b[1] - a[1]
        );

        if (sortedWins[0][1] === sortedWins[1][1]) {
          endMatch();
          return;
        }

        const [matchWinnerId, nrOfWins] = sortedWins[0]; // [key, value]

        const winner = room.players.find((p) => p.userId == matchWinnerId);

        await endMatch(false, winner);

        function endRace(trackId, winner = undefined, winnerCar = undefined) {
          io.to(roomId).emit("raceResult", {
            trackId: trackId,
            winner:
              winner && winnerCar
                ? {
                    nickname: winner.nickname,
                    userId: winner.userId,
                    carId: winnerCar.user_car_id,
                  }
                : null,
          });
        }

        async function endMatch(opponentLeft = false, winner = null) {
          let result = {};
          if (opponentLeft) {
            result = {
              winner: {
                nickname: room.players[0].nickname,
                userId: room.players[0].userId,
              },
              opponentLeft: true,
            };
          } else if (winner) {
            result = {
              winner: {
                nickname: winner.nickname,
                userId: winner.userId,
              },
              opponentLeft: false,
            };
          } else {
            result = {
              winner: null,
              opponentLeft: false,
            };
          }
          if (result.winner) {
            await addToCashBalanceByUserId(result.winner.userId, 1000);
          }
          io.to(roomId).emit("matchResult", result);
        }
      });

      // -------------------------------------------------------------------------------------------

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
