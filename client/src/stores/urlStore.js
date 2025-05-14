import { readable, get } from "svelte/store";

export const BASE_URL = readable(import.meta.env.VITE_BASE_URL || "http://localhost:8080");


export function getBaseUrl() {
    return get(BASE_URL);
  }
  