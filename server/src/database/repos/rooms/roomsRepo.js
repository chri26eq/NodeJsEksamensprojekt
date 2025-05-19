import db from "../../connection.js";

export async function addRoom() {
  const result = await db.run("INSERT INTO rooms DEFAULT VALUES");
  return result.lastID;
}

export async function getRoomById(roomId) {
  const room = await db.get("SELECT * FROM rooms WHERE id = ?", [roomId]);
  return room;
}

export async function getRoom() {
  const room = await db.get("SELECT * FROM rooms WHERE is_full = 0 LIMIT 1");
  return room;
}

export async function setRoomIsFullTrue(roomId) {
  await db.run("UPDATE rooms SET is_full = 1 WHERE id = ?", [roomId]);
}

export async function deleteRoom(roomId) {
  const result = await db.run("DELETE FROM rooms WHERE id = ?", [roomId]);

  if (result.changes === 0) {
    console.log(`No room found with id ${roomId}`);
  } else {
    console.log(`Room with id ${roomId} deleted`);
  }
}
