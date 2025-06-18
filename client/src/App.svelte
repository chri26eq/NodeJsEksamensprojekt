<script>
  import { onMount } from "svelte";
  
  import { Toaster }  from "svelte-french-toast";

  import { checkSession } from "./utils/auth.js";
  import { isLoggedIn, updateUserContentFromServer } from "./stores/userStore.js";

  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavContent from "./components/Navbar/NavContent.svelte";

  onMount(async () => {
    await checkSession();
    if ($isLoggedIn)
    updateUserContentFromServer();
  
  });
</script>

<Navbar/>

<NavContent/>

<Toaster position="bottom-center" />