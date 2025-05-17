const weights = { speed: 1 / 3, accel: 1 / 3, handl: 1 / 3 };
const MAX_SPEED = 500;
const MAX_ACCEL = 2000;

export function applyPerformancePoints(car) {
  const normS = clamp(car.top_speed / MAX_SPEED);
  const normA = clamp((MAX_ACCEL - car.accel_0_to_100) / MAX_ACCEL);
  const normH = clamp(car.handling / 100);

  const pp =
    (weights.speed * normS + weights.accel * normA + weights.handl * normH) *
    100;

  car.pp = Math.round(pp);
  return car;
}

function clamp(x) {
  return Math.max(0, Math.min(1, x));
}
