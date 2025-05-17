import { writable } from "svelte/store";
import { getCashBalance, getUserCars } from "../utils/userContent";





export const isLoggedIn = writable(false);
export const user = writable(null);
export const userCars = writable(undefined)

export const cashBalance = writable(null);

export async function updateUserContentFromServer() {
    try {
        const balance = await getCashBalance();
        cashBalance.set(balance);

        const cars = await getUserCars();
        userCars.set(cars);
    } catch (error) {
        console.log("Not logged in")
    }
}
