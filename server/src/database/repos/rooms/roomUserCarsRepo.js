import db from "../../connection.js";

export async function addRoomUserCars(roomId, userCarIds) {
  if (userCarIds.length !== 5) {
    throw new Error("Must contain exactly 5 userCarIds");
  }

  const placeholders = userCarIds.map(() => `(?, ?, ?)`).join(", ");
  const flatValues = userCarIds.flatMap((userCarId, index) => [
    roomId,
    index + 1, // slot fra 1 til 5
    userCarId,
  ]);

  const query = `
      INSERT INTO room_user_cars (room_id, slot, user_car_id)
      VALUES ${placeholders}
    `;

  await db.run(query, flatValues);
}

export async function getRoomUserCarsByRoomId(roomId) {
  const results = await db.all(
    "SELECT * FROM room_user_cars WHERE room_id = ? ORDER BY slot",
    [roomId]
  );
  return results;
}

export async function deleteRoomUserCarsByRoomId(roomId) {
    const result = await db.run(
      "DELETE FROM room_user_cars WHERE room_id = ?",
      [roomId]
    );
  
    if (result.changes === 0) {
      console.log(`No room_user_cars found with room_id ${roomId}`);
    } else {
      console.log(`Deleted ${result.changes} room_user_cars for room_id ${roomId}`);
    }
  }
  