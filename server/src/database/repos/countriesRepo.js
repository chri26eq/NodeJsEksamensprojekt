import db from "../connection.js";

export async function getCountries() {
  const result = await db.all("SELECT * FROM countries");

  return result;
}

export async function getCountryById(countryCode) {
  const result = await db.all("SELECT * FROM countries WHERE code = ?", [
    countryCode,
  ]);

  return result;
}
