<script>
  import { navigate } from "svelte-routing";
  import { Button } from "flowbite-svelte";
  import { toast } from "svelte-french-toast";

  import { login } from "../../utils/auth.js";

  const {} = $props();

  let email = $state("");

  let password = $state("");

  async function handleLogin() {
    const result = await login(email, password);

    if (result.status === 200) {
      email = "";
      password = "";
      navigate("/", { replace: true });
      return "Welcome " + result.data.nickname;
    } else if (result.status === 401) {
      password = "";
      throw new Error("Wrong email or password");
    } else {
      throw new Error("Something went wrong");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault(); // sørger for at siden ikke reloades grundet form-element
    if (!email && !password) {
      toast.error("All fields must be filled out");
      return;
    }
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    toast.promise(handleLogin(), {
      loading: "Logging in...",
      success: (msg) => msg, // return value fra `handleLogin`
      error: (err) => err.message, // Error-objekt fra `throw`
    });
  }
</script>

<form onsubmit={handleSubmit} class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
      >Your email</label
    >

    <!-- email inputfield should include type="email", but this has been removed in order to use the dummy-users 1, 2, 3, etc... -->
    <!-- type="email" -->
    <input
      bind:value={email}
      id="email"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Email..."
      required
    />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
      >Your password</label
    >
    <input
      bind:value={password}
      type="password"
      id="password"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Password..."
      required
    />
  </div>

  <Button type="submit" color="light">Login</Button>
</form>

<style>
</style>
