

export function applyUpgradeBonus(car) {
  if (car.upgraded) {
    return {
      ...car,
      top_speed: Math.round(car.top_speed * 1.1),
      accel_0_to_100: Math.round(car.accel_0_to_100 * 0.9),
      handling: Math.round(car.handling * 1.1),
    };
  }
  return car;
}

