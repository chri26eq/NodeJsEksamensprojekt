<script>
  import { Router, Route } from "svelte-routing";

  import HomePage from "../../pages/HomePage.svelte";
  import LogInPage from "../../pages/auth/LogInPage.svelte";
  import SignUpPage from "../../pages/auth/SignUpPage.svelte";
  import YourCardsPage from "../../pages/YourCardsPage.svelte";
  import BuyPacksPage from "../../pages/BuyPacksPage.svelte";
  import MatchPage from "../../pages/MatchPage.svelte";
  import PrivateRoute from "../PrivateRoute/PrivateRoute.svelte";

  const { url = "" } = $props();
</script>

<div class="min-h-screen bg-green-100 pt-23 pb-6 px-2 min-w-screen w-fit">
  <Router {url}>
    <Route path="/"><HomePage /></Route>

    <Route path="/yourcards"><PrivateRoute><YourCardsPage /></PrivateRoute></Route>
    <Route path="/buycards"><PrivateRoute><BuyPacksPage /></PrivateRoute></Route>
    <Route path="/match"><PrivateRoute><MatchPage /></PrivateRoute></Route>

    <Route path="/login"><LogInPage /></Route>
    <Route path="/signup"><SignUpPage /></Route>
  </Router>
</div>


