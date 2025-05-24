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
