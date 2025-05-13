<script>
  import { Router, Link } from "svelte-routing";
import { BarsOutline, CloseOutline } from "flowbite-svelte-icons"
  import HomePage from "../../pages/HomePage.svelte";
  import LogInPage from "../../pages/auth/LogInPage.svelte";
  import SignUpPage from "../../pages/auth/SignUpPage.svelte";
  import ChooseCardsPage from "../../pages/ChooseCardsPage.svelte";
  import YourCardsPage from "../../pages/YourCardsPage.svelte";
  import MatchPage from "../../pages/MatchPage.svelte";
  import NavItem from "./NavItem.svelte";

  const { url = "" } = $props();
  let showMenu = $state(false);
</script>

<div class="fixed top-0 left-0 w-full z-50 bg-blue-300/70 md:bg-blue-300">
  <Router {url}>
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
    <nav class={`flex-col md:flex md:flex-row gap-2 p-4 ${showMenu ? 'flex' : 'hidden'}`}>
      <Link to="/" let:active><NavItem text="Home" active={active} /></Link>
      <Link to="/choosecards" let:active><NavItem text="Choose Cards" active={active} /></Link>
      <Link to="/yourcards" let:active><NavItem text="Your Cards" active={active} /></Link>
      <Link to="/match" let:active><NavItem text="Find Match" active={active} /></Link>
      <Link to="/login" let:active><NavItem text="Login" active={active} /></Link>
      <Link to="/signup" let:active><NavItem text="Sign Up" active={active} /></Link>
    </nav>
  </Router>
</div>
