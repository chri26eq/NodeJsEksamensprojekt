export function isRWD(car) {
  return car.drivetrain == "RWD";
}
export function isFWD(car) {
  return car.drivetrain == "FWD";
}
export function is4X4(car) {
  return car.drivetrain == "4X4";
}
export function all(car) {
  return true;
}

export function toggleDrivetrainFilter(currentFilters, filterToToggle) {
  if (filterToToggle === all) {
    // Hvis man klikker på "all", fjern andre filtre
    return [all];
  }

  const i = currentFilters.findIndex((f) => f === filterToToggle);
  if (i === -1) {
    //hvis filter ikke er angivet i forvejen
    const withoutAll = currentFilters.filter((f) => f !== all); //fjern "all"-filteret
    return [...withoutAll, filterToToggle]; //tilføj valgt filter
  } else {
    // Fjern filter
    const newFilters = currentFilters.toSpliced(i, 1);

    return newFilters.length === 0 ? [all] : newFilters; //hvis ingen filtre er valgt, vælges "all"-filteret
  }
}
