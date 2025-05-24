import { Server } from "socket.io";
import { getUserIdByEmail } from "./database/repos/usersRepo.js";
import { getRandomTrackIds } from "./database/repos/tracksRepo.js";
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

    // -------------------------------------------------------------------------------------------

    socket.on("client-sends-find-game", async () => {
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
              socketId: socket.id,
            },
          ],
          tracksIds: await getRandomTrackIds(5),
        };
        gameRooms.set(room.id, room);
      }

      socket.join(room.id);
      console.log(`🧩 ${user.nickname} joined room ${room.id}`);
      io.to(room.id).emit("room-found", room);
    });

    // -------------------------------------------------------------------------------------------

    socket.on("chooseCar", ({ roomId, car, trackId }) => {
      const room = gameRooms.get(roomId);
      if (!room) return;

      const player = room.players.find((p) => p.userId === user.id);
      if (!player) return;

      player.cars[trackId] = car.user_car_id;

      const opponentFromServer = player;

      socket.to(roomId).emit("opponent", opponentFromServer);
    });

    // -------------------------------------------------------------------------------------------

    socket.on("removeCar", ({ roomId, trackId }) => {
      const room = gameRooms.get(roomId);
      if (!room) return;

      const player = room.players.find((p) => p.userId === user.id);
      if (!player) return;

      delete player.cars[trackId];

      const opponentFromServer = player;

      socket.to(roomId).emit("opponent", opponentFromServer);
      
      io.to(roomId).emit("not-ready");
    });

    

    // -------------------------------------------------------------------------------------------

    socket.on("client-start-game", ({ roomId }) => {
      const room = gameRooms.get(roomId);
      if (!room) return;

      const [p1, p2] = room.players;
      const tracks = room.tracksIds;
      let p1Wins = 0;
      let p2Wins = 0;

      for (let i = 0; i < 5; i++) {
        const car1 = p1.cars[i];
        const car2 = p2.cars[i];
        const track = tracks[i];
        const winnerCar = calculateWinner(car1, car2, track);

        if (winnerCar === car1) {
          p1Wins++;
        } else if (winnerCar === car2) {
          p2Wins++;
        }

        io.to(roomId).emit("round-result", {
          round: i + 1,
          car1,
          car2,
          winnerSocketId: winnerCar,
        });
      }

      let overallWinner = null;
      if (p1Wins > p2Wins) {
        overallWinner = p1;
      } else if (p2Wins > p1Wins) {
        overallWinner = p2;
      } else {
        overallWinner = null; // Uafgjort
      }

      io.to(roomId).emit("game-over", {
        winner: overallWinner, // eller null hvis uafgjort
        p1: { nickname: p1.nickname, wins: p1Wins },
        p2: { nickname: p2.nickname, wins: p2Wins },
      });

      gameRooms.delete(roomId);
    });

    // -------------------------------------------------------------------------------------------

    socket.on("user-leaves-room", ({ roomId }) => {
      if (!roomId) return
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

      socket.to(roomId).emit("opponent-left");

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
  });
}
