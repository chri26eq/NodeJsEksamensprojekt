export function isStandard(car) {
  return car.tyres == "Standard";
}
export function isPerformance(car) {
  return car.tyres == "Performance";
}
export function isSlicks(car) {
  return car.tyres == "Slicks";
}
export function isAllTerrain(car) {
  return car.tyres == "All-terrain";
}
export function isOffroad(car) {
  return car.tyres == "Offroad";
}
export function all(car) {
  return true;
}

export function toggleTyresFilter(currentFilters, filterToToggle) {
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
