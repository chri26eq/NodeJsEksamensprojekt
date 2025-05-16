import { fetchPost } from "../utils/fetch.js";
import { getBaseUrl } from "../stores/urlStore.js";
import toast from "svelte-french-toast";
import { updateUserContent } from "../stores/userStore.js";

const URL = getBaseUrl();

export async function buyCarPack() {
  try {
    const response = await fetchPost(URL + "/shop/buypack");
    if (response.status == 402) {
      toast.error("Not enough CarCash");
    }
    if (response.ok) {
      const result = await response.json();
      toast.success(result.message);
      updateUserContent();
      return result.cars;
    }
  } catch (error) {
    throw new Error("Error", error);
  }
}
