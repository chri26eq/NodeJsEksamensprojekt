import { fetchPost } from "../utils/fetch.js";
import { getBaseUrl } from "../stores/urlStore.js";
import toast from "svelte-french-toast";
import { updateUserContentFromServer } from "../stores/userStore.js";

const URL = getBaseUrl();

export async function buyCarPack(packPrice) {
  try {
    const response = await fetchPost(URL + "/shop/buypack", {price: packPrice});
    if (response.status == 402) {
      return { message: "Not enough CarCash" };
    }
    if (response.ok) {
      const result = await response.json();

      updateUserContentFromServer();
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
      updateUserContentFromServer();
      return true;
    }
  } catch (error) {
    throw new Error("Error", error);
  }
}
