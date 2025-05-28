import db from "../connection.js";

export async function getRandomTrackIds(nrOfTracks) {
  const rows = await db.all("SELECT id FROM tracks ORDER BY RANDOM() LIMIT ?", [
    nrOfTracks,
  ]);
  return rows.map((row) => row.id);
}

export async function getTracksByIds(trackIds) {
  if (!trackIds || trackIds.length === 0) return [];

  const placeholders = trackIds.map(() => "?").join(", ");

  const query = `SELECT * FROM tracks WHERE id IN (${placeholders})`;

  const tracks = await db.all(query, trackIds);

  return tracks;
}

export async function getTrackById(trackId) {
  const track = await db.get("SELECT * FROM tracks WHERE id = ?", [trackId]);
  return track;
}
