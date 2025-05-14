<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavContent from "./components/Navbar/NavContent.svelte";
  import { Toaster }  from "svelte-french-toast";
  import { checkSession } from "./utils/auth";
  const { url = "" } = $props()

  onMount(() => {
    checkSession();
  });
</script>


<Navbar/>

<NavContent/>
<Toaster position="top-right" />