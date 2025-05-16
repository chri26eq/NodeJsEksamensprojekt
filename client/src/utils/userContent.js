import { fetchGet, fetchPost } from "../utils/fetch.js";
import { getBaseUrl } from "../stores/urlStore.js";
import { user, isLoggedIn } from "../stores/userStore.js";
import toast from "svelte-french-toast";

const URL = getBaseUrl();

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
