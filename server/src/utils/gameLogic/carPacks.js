import { getCarModels } from "../../database/repos/carModelsRepo.js";

// thanks chatgpt for this logic
export async function generateCarPack(size) {
  const cars = await getCarModels();

  const intervals = [
    { min: 90, max: 100, chance: 10 },
    { min: 80, max: 90, chance: 20 },
    { min: 70, max: 80, chance: 30 },
    { min: 60, max: 70, chance: 40 },
    { min: 50, max: 60, chance: 50 },
    { min: 40, max: 50, chance: 60 },
    { min: 30, max: 40, chance: 70 },
    { min: 0, max: 30, chance: 80 },
  ];

  const buckets = buildBuckets(cars, intervals);

  const pack = [];
  for (let i = 0; i < size; i++) {
    const intervalIndex = chooseIntervalIndex(intervals, buckets);
    pack.push(removeRandomCarFromBucket(buckets[intervalIndex]));
  }

  return pack;
}

function buildBuckets(cars, intervals) {
  return intervals.map(({ min, max }) =>
    cars.filter((car) => car.pp >= min && car.pp < max)
  );
}

function chooseIntervalIndex(intervals, buckets) {
  const available = intervals
    .map((intv, i) => ({ chance: intv.chance, index: i }))
    .filter(({ index }) => buckets[index].length > 0);

  const totalChance = available.reduce((sum, cur) => sum + cur.chance, 0);
  let randomValue = Math.random() * totalChance;

  for (const { chance, index } of available) {
    if (randomValue < chance) return index;
    randomValue -= chance;
  }

  return available[available.length - 1].index;
}

function removeRandomCarFromBucket(bucket) {
  const id = Math.floor(Math.random() * bucket.length);
  return bucket.splice(id, 1)[0];
}
