import db from "../../connection.js";
import { getRandomTracks } from "../tracksRepo.js";

export async function addRoomTracks(roomId) {
  const tracks = await getRandomTracks(5);
  const placeholders = tracks.map(() => `(?, ?, ?)`).join(", ");
  const flatValues = tracks.flatMap((track, index) => [
    roomId,
    track.id,
    index + 1,
  ]);

  const query = `
      INSERT INTO room_tracks (room_id, track_id, slot)
      VALUES ${placeholders}
    `;

  await db.run(query, flatValues);
}

export async function deleteRoomTracksByRoomId(roomId) {
    const result = await db.run("DELETE FROM room_tracks WHERE room_id = ?", [roomId]);

  if (result.changes === 0) {
    console.log(`No tracks found with room_id ${roomId}`);
  } else {
    console.log(`Tracks with room_id ${roomId} deleted`);
  }
}