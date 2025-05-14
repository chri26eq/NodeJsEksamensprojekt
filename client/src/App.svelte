<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavContent from "./components/Navbar/NavContent.svelte";
  import { Toaster }  from "svelte-french-toast";
  import { checkSession } from "./utils/auth";
  import { isLoggedIn, updateUserContent } from "./stores/userStore";
  const { url = "" } = $props()

  onMount(async () => {
    await checkSession();
    if ($isLoggedIn)
    updateUserContent();
  });
</script>


<Navbar/>

<NavContent/>
<Toaster position="top-right" />