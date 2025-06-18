<script>
  import { navigate } from "svelte-routing";
  import { Button } from "flowbite-svelte";
  import { toast } from "svelte-french-toast";

  import {
    areFieldsFilled,
    doPasswordsMatch,
    isValidEmail,
    isValidPassword,
  } from "../../utils/credentialsInputVerifier.js";
  import { signUp } from "../../utils/auth.js";

  let email = $state("");
  let nickname = $state("");
  let password = $state("");
  let passwordConfirm = $state("");

  async function handleSignUp() {
    const response = await signUp(email, password, nickname);

    if (response.status === 200) {
      email = "";
      password = "";
      passwordConfirm = "";
      navigate("/login", { replace: true });
      return "Sign up successful!";
    } else if (response.status === 409) {
      email = "";
      password = "";
      passwordConfirm = "";
      throw new Error(response.data.error);
    } else {
      password = "";
      throw new Error("Something went wrong");
    }
  }

  function validateInputs() {
    if (!areFieldsFilled(email, nickname, password, passwordConfirm)) {
      toast.error("All fields must be filled out");
      return false;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!doPasswordsMatch(password, passwordConfirm)) {
      toast.error("Passwords do not match. Please try again");
      password = "";
      passwordConfirm = "";
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      password = "";
      passwordConfirm = "";
      return false;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
      );
      password = "";
      passwordConfirm = "";
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    toast.promise(handleSignUp(), {
      loading: "Signing up...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  }
</script>

<form onsubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label
      for="email"
      class="block mb-2 text-sm font-medium text-gray-900"
      >Your email</label
    >
    <input
      bind:value={email}
      type="email"
      id="email"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Email..."
      required
    />
  </div>
  <div class="mb-5">
    <label
      for="nickname"
      class="block mb-2 text-sm font-medium text-gray-900"
      >Your Nickname</label
    >
    <input
      bind:value={nickname}
      type="text"
      id="nickname"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Nickname..."
      required
    />
  </div>
  <div class="mb-5">
    <label
      for="password1"
      class="block mb-2 text-sm font-medium text-gray-900"
      >Your password</label
    >
    <input
      bind:value={password}
      type="password"
      id="password1"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Password..."
      required
    />
  </div>
  <div class="mb-5">
    <label
      for="password2"
      class="block mb-2 text-sm font-medium text-gray-900"
      >Repeat password</label
    >
    <input
      bind:value={passwordConfirm}
      type="password"
      id="password2"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Repeat password..."
      required
    />
  </div>
  <Button type="submit" color="light">Sign Up</Button>
</form>
