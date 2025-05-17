<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { isLoggedIn } from "../../stores/userStore";

  const { children } = $props();

  onMount(() => {
    if (!$isLoggedIn) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  });
</script>

{#if $isLoggedIn}
  {@render children()}
{/if}
