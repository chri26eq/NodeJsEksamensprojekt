import { fetchDelete, fetchPost } from "../utils/fetch.js";
import { getBaseServerUrl } from "../stores/urlStore.js";

const URL = getBaseServerUrl();

export async function buyCarPack(packPrice, packSize) {
  try {
    const response = await fetchPost(URL + "/shop/buypack", {
      price: packPrice,
      packSize: packSize,
    });

    if (response.status == 402) {
      return { message: "Not enough CarCash" };
    }
    if (response.ok) {
      const result = await response.json();
      return { cars: result.cars, message: result.message };
    }
  } catch (error) {
    throw new Error("Error", error);
  }
}

export async function upgradeCar(car) {
  try {
    const response = await fetchPost(URL + "/shop/upgradecar", {
      user_car_id: car.user_car_id,
      upgraded: car.upgraded,
    });
    if (response.status == 402) {
      return false;
    }
    if (response.ok) {
      return true;
    }
  } catch (error) {
    throw new Error("Error", error);
  }
}

export async function sellCar(car) {
  try {
    const response = await fetchDelete(URL + "/users/usercars", {
      user_car_id: car.user_car_id,
    });
    if (response.status === 404) {
      return { success: false, message: "Car not found" };
    }

    if (response.status === 400) {
      return { success: false, message: "Car could not be deleted" };
    }

    if (response.ok) {
      const result = await response.json();
      return { success: true, value: result.carValue };
    }

    return { success: false, message: "Unexpected error" };
  } catch (error) {
    throw new Error("Error", error);
  }
}
