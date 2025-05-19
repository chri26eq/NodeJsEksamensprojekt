import { Server } from "socket.io";
import { findAvailableRoom, leaveRoom } from "./service/roomService.js";
import {
  getRoomIdByUserId,
  getUserIdByEmail,
} from "./database/repos/usersRepo.js";
import { calculateWinner } from "./utils/gameLogic/matchCalculation.js";
const gameRooms = new Map(); // Runtime memory til spil

export function initSocket(server, sessionMiddleware) {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    console.log("✅ A client connected:", socket.id);




    // Når en klient ønsker at finde et spil
    socket.on("client-sends-find-game", async (data) => {
      const user = data.user;
      const userId = await getUserIdByEmail(user.email);

      // Find eller opret et ledigt rum
      const roomId = await findAvailableRoom(userId);
      socket.join(roomId);
      
      // Hvis rummet ikke eksisterer endnu i memory, opret det
      if (!gameRooms.has(roomId)) {
        gameRooms.set(roomId, { players: {} });
      }

      const game = gameRooms.get(roomId);
      game.players[socket.id] = []; // Start med tom bil-liste

      console.log(`🧩 ${socket.id} joined ${roomId}`);
    });





    // Når en spiller vælger en bil
    socket.on("chooseCar", ({ room, car }) => {
      const game = gameRooms.get(room);
      if (!game) return;

      if (!game.players[socket.id]) {
        game.players[socket.id] = [];
      }

      if (game.players[socket.id].length < 5) {
        game.players[socket.id].push(car);
      }

      // Tjek om alle spillere har valgt 5 biler
      const allPlayersReady =
        Object.values(game.players).every((cars) => cars.length === 5) &&
        Object.keys(game.players).length === 2;

      if (allPlayersReady) {
        const [p1, p2] = Object.keys(game.players);
        const cars1 = game.players[p1];
        const cars2 = game.players[p2];

        // TODO: beregn vinder
        const winnerSocketId = calculateWinner(cars1, cars2);

        // Send resultat til alle i rummet
        io.to(room).emit("winner", {
          winnerSocketId,
          cars1,
          cars2,
        });

        // Ryd op
        gameRooms.delete(room);
      }
    });

    // Når en bruger forlader et rum eksplicit
    socket.on("user-leaves-room", async (data) => {
      console.log("🚪 User left room:", data);
      const user = data.user;
      const userId = await getUserIdByEmail(user.email);
      const userRoomId = await getRoomIdByUserId(userId);
      await leaveRoom(userRoomId);
      socket.leave(data.room);
      // Evt. fjern fra gameRooms hvis nødvendigt
    });

    socket.on("disconnect", () => {
      console.log("❌ A client disconnected:", socket.id);

      // Ryd op i gameRooms (fjern socket.id fra players)
      for (const [roomId, game] of gameRooms.entries()) {
        if (game.players[socket.id]) {
          delete game.players[socket.id];
          // Hvis ingen spillere er tilbage i rummet, fjern det helt
          if (Object.keys(game.players).length === 0) {
            gameRooms.delete(roomId);
          }
        }
      }
    });
  });
}
