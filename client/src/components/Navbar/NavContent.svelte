<script>
  import { Router, Route } from "svelte-routing";

  import HomePage from "../../pages/HomePage.svelte";
  import LogInPage from "../../pages/auth/LogInPage.svelte";
  import SignUpPage from "../../pages/auth/SignUpPage.svelte";
  import ChooseCardsPage from "../../pages/ChooseCardsPage.svelte";
  import YourCardsPage from "../../pages/YourCardsPage.svelte";
  import BuyPacksPage from "../../pages/BuyPacksPage.svelte";
  import MatchPage from "../../pages/MatchPage.svelte";

  const { url = "" } = $props();
</script>

<div class="min-h-screen bg-green-100 pt-20">
  <Router {url}>
    <Route path="/"><HomePage /></Route>

    <Route path="/choosecards"><ChooseCardsPage /></Route>
    <Route path="/yourcards"><YourCardsPage /></Route>
    <Route path="/buycards"><BuyPacksPage /></Route>
    <Route path="/match"><MatchPage /></Route>

    <Route path="/login"><LogInPage /></Route>
    <Route path="/signup"><SignUpPage /></Route>
  </Router>
</div>
