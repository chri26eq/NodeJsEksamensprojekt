import { writable } from "svelte/store";
import { getCashBalance } from "../utils/userContent";





export const isLoggedIn = writable(false);
export const user = writable(null);


export const cashBalance = writable(null);

export async function updateUserContent() {
    try {
        const balance = await getCashBalance();
        cashBalance.set(balance);
        
    } catch (error) {
        console.log("Not logged in")
    }
}
