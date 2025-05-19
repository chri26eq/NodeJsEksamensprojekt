import { fetchGet, fetchPost } from "../utils/fetch.js";
import { getBaseServerUrl } from "../stores/urlStore.js";
import { user, isLoggedIn, updateUserContentFromServer } from "../stores/userStore.js";
import toast from "svelte-french-toast";
import { navigate } from "svelte-routing";

const URL = getBaseServerUrl();

export async function checkSession() {
  try {
    const response = await fetchGet(URL + "/auth/checksession");
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const result = await response.json();

    isLoggedIn.set(result.isLoggedIn);
    user.set(result.user || null);
  } catch (error) {
    console.error("Error:", error);
    isLoggedIn.set(false);
    user.set(null);
  }
}

export async function logout() {
  try {
    await fetchPost(URL + "/auth/logout");
    navigate("/", { replace: true })
    toast.success("Logged out");
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    await checkSession();
    await updateUserContentFromServer();
  }
}

export async function login(email, password) {
  try {
    const response = await fetchPost(URL + "/auth/login", { email, password });

    let data = null;

    try {
      data = await response.json();
    } catch (error) {
      console.log("Error parsing login response JSON:", error);
    }

    return { status: response.status, data: data };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, data: null };
  } finally {
    await checkSession();
    await updateUserContentFromServer();
  }
}

export async function signUp(email, password, nickname) {
  try {
    const response = await fetchPost(URL + "/auth/signup", {
      email,
      password,
      nickname,
    });
    let data = null;

    try {
      data = await response.json();
    } catch (error) {
      console.log("Error parsing login response JSON:", error);
    }

    return { status: response.status, data: data };
  } catch (error) {
    console.error("Sign up error", error);
    return { status: 500 };
  } finally {
    await checkSession();
  }
}
