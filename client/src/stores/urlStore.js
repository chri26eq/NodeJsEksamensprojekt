import { readable, get } from "svelte/store";

export const BASE_SERVER_URL = readable(import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:8080");


export function getBaseServerUrl() {
    return get(BASE_SERVER_URL);
  }
  