import { fetchGet, fetchPost } from "./fetch.js";
import { getBaseServerUrl } from "../stores/urlStore.js";

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

export async function getTrackById(trackId) {
  try {
    const response = await fetchGet(URL + `/content/tracks/${trackId}`);
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error("Error fetching cash balance", error);
  }
}