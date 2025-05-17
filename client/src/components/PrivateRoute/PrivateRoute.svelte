<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { isLoggedIn } from "../../stores/userStore";
  import { checkSession } from "../../utils/auth";

  const { children } = $props();
  onMount(async () => {
    await checkSession()
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
