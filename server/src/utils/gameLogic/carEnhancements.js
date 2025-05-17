export function applyCarEnhancements(car) {
  return applyCarValue(applyUpgradeBonus(applyPerformancePoints(car)));
}

export function applyPerformancePoints(car) {
    
  function limit(x) {
    return Math.max(0, Math.min(1, x)); //højest 1  -  mindst 0
  }

  const weights = { speed: 1 / 3, accel: 1 / 3, handl: 1 / 3 };
  const MAX_SPEED = 500;
  const MAX_ACCEL = 2000;

  const normS = limit(car.top_speed / MAX_SPEED);
  const normA = limit((MAX_ACCEL - car.accel_0_to_100) / MAX_ACCEL);
  const normH = limit(car.handling / 100);

  const pp =
    (weights.speed * normS + weights.accel * normA + weights.handl * normH) *
    100;

  car.pp = Math.round(pp);
  return car;
}

function applyCarValue(car) {
  const base = 100;
  const ppBonus = car.pp * 10;
  const upgradeBonus = car.upgraded ? 500 : 0;

  const value = base + ppBonus + upgradeBonus;

  return {
    ...car,
    value,
  };
}

function applyUpgradeBonus(car) {
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
