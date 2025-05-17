<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavContent from "./components/Navbar/NavContent.svelte";
  import { Toaster }  from "svelte-french-toast";
  import { checkSession } from "./utils/auth";
  import { isLoggedIn, updateUserContentFromServer } from "./stores/userStore";

  onMount(async () => {
    await checkSession();
    if ($isLoggedIn)
    updateUserContentFromServer();
  
  });
</script>


<Navbar/>

<NavContent/>
<Toaster position="bottom-center" />