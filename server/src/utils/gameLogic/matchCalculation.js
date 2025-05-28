export function calculateWinner(cars, track) {
  let bestCar = null;
  let bestScore = -Infinity;

  for (const car of cars) {
    let actualHandling = car.handling;
    let actualAccel = car.accel_0_to_100;

    // Juster handling og acceleration ud fra overflade og dæk
    if (track.surface === "Asphalt") {
      if (car.tyres === "Performance") actualHandling += 5;
      if (car.tyres === "Slicks") actualHandling += 10;
      if (car.tyres === "All-terrain") {
        actualHandling -= 5;
        actualAccel *= 1.1;
      }
      if (car.tyres === "Offroad") {
        actualHandling -= 10;
        actualAccel *= 1.2;
      }
    }

    if (track.surface === "Gravel") {
      if (car.tyres === "Performance") {
        actualHandling -= 5;
        actualAccel *= 1.1;
      }
      if (car.tyres === "Slicks") {
        actualHandling -= 10;
        actualAccel *= 1.2;
      }
      if (car.tyres === "All-terrain") actualHandling += 5;
      if (car.tyres === "Offroad") actualHandling += 10;
      if (car.tyres === "Standard") actualAccel *= 1.05;
    }

    if (track.surface === "Dirt") {
      if (car.tyres === "Standard") {
        actualHandling -= 5;
        actualAccel *= 1.2;
      }
      if (car.tyres === "Performance") {
        actualHandling -= 10;
        actualAccel *= 1.3;
      }
      if (car.tyres === "Slicks") {
        actualHandling -= 15;
        actualAccel *= 1.4;
      }
      if (car.tyres === "All-terrain") actualHandling += 5;
      if (car.tyres === "Offroad") actualHandling += 10;
    }

    if (track.surface === "Sand") {
      if (car.tyres === "Standard") {
        actualHandling -= 10;
        actualAccel *= 1.3;
      }
      if (car.tyres === "Performance") {
        actualHandling -= 15;
        actualAccel *= 1.4;
      }
      if (car.tyres === "Slicks") {
        actualHandling -= 20;
        actualAccel *= 1.5;
      }
      if (car.tyres === "Offroad") actualHandling += 5;
    }

    // Beregn performance score
    const accelScore = 100 - actualAccel; // lavere tid er bedre
    const handlingScore = actualHandling * track.num_corners;
    const speedScore = car.top_speed * (track.length / 1000); // vægtet efter længde

    const totalScore = accelScore + handlingScore + speedScore;

    // Sammenlign med bedste score
    if (totalScore === bestScore) {
      return undefined
    } else if (totalScore > bestScore) {
      bestScore = totalScore;
      bestCar = car;
    }
  }

  return bestCar;
}
