import db from "../connection.js";

export async function getRandomTracks(nrOfTracks) {
  const tracks = await db.all(
    "SELECT * FROM tracks ORDER BY RANDOM() LIMIT ?",
    [nrOfTracks]
  );
  return tracks;
}

export async function getTracksByIds(trackIds) {
  if (!trackIds || trackIds.length === 0) return [];

  const placeholders = trackIds.map(() => "?").join(", ");

  const query = `SELECT * FROM tracks WHERE id IN (${placeholders})`;

  const tracks = await db.all(query, trackIds);

  return tracks;
}

