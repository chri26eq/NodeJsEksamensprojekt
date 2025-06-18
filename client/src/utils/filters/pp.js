export function isCommon(car) {
  return car.pp >= 0 && car.pp < 40;
}
export function isUncommon(car) {
  return car.pp >= 40 && car.pp < 60;
}
export function isRare(car) {
  return car.pp >= 60 && car.pp < 80;
}
export function isSuper(car) {
  return car.pp >= 80 && car.pp < 90;
}
export function isLegendary(car) {
  return car.pp >= 90;
}
export function all(car) {
  return true;
}

export function togglePpFilter(currentFilters, filterToToggle) {
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
