<script>
  import { Router, Link } from "svelte-routing";
  import { BarsOutline, CloseOutline } from "flowbite-svelte-icons";

  import { isLoggedIn } from "../../stores/userStore.js";
  import { logout } from "../../utils/auth.js";

  import NavbarItem from "./NavbarItem.svelte";
  import CashBalance from "./CashBalance.svelte";

  const { url = "" } = $props();
  let showMenu = $state(false);

  function toggleMenu() {
    showMenu = !showMenu;
  }
</script>

<div class="fixed top-0 left-0 w-full z-50 bg-blue-300/70 md:bg-blue-300">
  <Router {url}>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex flex-col md:flex-row">
        <div class="md:hidden flex justify-between">
          <div class="p-4">
            <button
              onclick={toggleMenu}
              class="text-white bg-blue-700 px-4 py-2 rounded"
            >
              {#if showMenu}
                <CloseOutline />
              {:else}
                <BarsOutline />
              {/if}
            </button>
          </div>
          {#if $isLoggedIn}
            <div class="flex md:hidden items-center pr-4">
              <CashBalance />
            </div>
          {/if}
        </div>

        <nav
          class={`flex-col md:flex md:flex-row gap-2 p-4 ${showMenu ? "flex" : "hidden"}`}
        >
          <Link to="/" let:active onclick={toggleMenu}>
            <NavbarItem text="Home" {active} />
          </Link>

          {#if $isLoggedIn}
            <Link to="/yourcards" let:active onclick={toggleMenu}
              ><NavbarItem text="Your Cards" {active} />
            </Link>
            <Link to="/buycards" let:active onclick={toggleMenu}
              ><NavbarItem text="Buy Cards" {active} />
            </Link>
            <Link to="/match" let:active onclick={toggleMenu}
              ><NavbarItem text="Find Match" {active} />
            </Link>
            <NavbarItem
              text="Logout"
              onclick={() => {
                logout();
                toggleMenu();
              }}
            />
          {:else}
            <Link to="/login" let:active onclick={toggleMenu}
              ><NavbarItem text="Login" {active} /></Link
            >
            <Link to="/signup" let:active onclick={toggleMenu}
              ><NavbarItem text="Sign Up" {active} /></Link
            >
          {/if}
        </nav>
      </div>

      {#if $isLoggedIn}
        <div class="hidden md:flex items-center pr-4">
          <CashBalance />
        </div>
      {/if}
    </div>
  </Router>
</div>
