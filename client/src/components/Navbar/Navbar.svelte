<script>
  import { Router, Link } from "svelte-routing";
  import { BarsOutline, CloseOutline } from "flowbite-svelte-icons";
  import { isLoggedIn } from "../../stores/userStore";
import { logout } from "../../utils/auth.js"
  import NavbarItem from "./NavbarItem.svelte";

  const { url = "" } = $props();
  let showMenu = $state(false);
</script>

<div class="fixed top-0 left-0 w-full z-50 bg-blue-300/70 md:bg-blue-300">
  
  <Router url={url}>
    <div class="md:hidden p-4">
      <button
        onclick={() => (showMenu = !showMenu)}
        class="text-white bg-blue-700 px-4 py-2 rounded"
      >
        {#if showMenu}
          <CloseOutline />
        {:else}
          <BarsOutline />
        {/if}
      </button>
    </div>

    <!-- Navigationsmenu -->
    <nav
      class={`flex-col md:flex md:flex-row gap-2 p-4 ${showMenu ? "flex" : "hidden"}`}
    >
      <Link to="/" let:active><NavbarItem text="Home" {active} /></Link>

      {#if $isLoggedIn}
        <Link to="/choosecards" let:active
          ><NavbarItem text="Choose Cards" {active} /></Link
        >
        <Link to="/yourcards" let:active
          ><NavbarItem text="Your Cards" {active} /></Link
        >
        <Link to="/match" let:active
          ><NavbarItem text="Find Match" {active} /></Link
        >
        <NavbarItem text="Logout" onClick={logout} />
      {:else}
        <Link to="/login" let:active><NavbarItem text="Login" {active} /></Link>
        <Link to="/signup" let:active
          ><NavbarItem text="Sign Up" {active} /></Link
        >
      {/if}
    </nav>
  </Router>
</div>
