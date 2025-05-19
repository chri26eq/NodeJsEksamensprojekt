import { fetchGet, fetchPost } from "../utils/fetch.js";
import { getBaseServerUrl } from "../stores/urlStore.js";
import { user, isLoggedIn } from "../stores/userStore.js";
import toast from "svelte-french-toast";

const URL = getBaseServerUrl();

export async function getCashBalance() {
  try {
    const response = await fetchGet(URL + "/users/cashbalance");
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const result = await response.json();
    return result.cashBalance;
  } catch (error) {
    throw new Error("Error fetching cash balance", error);
  }
}

export async function getUserCars() {
  try {
    const response = await fetchGet(URL + "/users/usercars");
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const result = await response.json();
    return result.userCars;
  } catch (error) {
    throw new Error("Error fetching usercars", error);
  }
}

export async function updateUserCarsIsFavorite(userCarId, isFavorite) {
  try {
    const response = await fetchPost(URL + "/users/usercars/favorite", {
      user_car_id: userCarId,
      favorite: isFavorite,
    });
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    
    const result = await response.json();
    return result.message;
  } catch (error) {
    throw new Error("Error fetching usercars", error);
  }
}
