<script>
  import Navbar from "./components/Navbar/Navbar.svelte";
  import NavContent from "./components/Navbar/NavContent.svelte";

  const { url = "" } = $props()
</script>


<Navbar/>

<NavContent/>
