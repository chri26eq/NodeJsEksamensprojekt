<script>
  import { onMount } from "svelte";

  import { navigate } from "svelte-routing";

  import { checkSession } from "../../utils/auth";
  import { isLoggedIn } from "../../stores/userStore";

  const { children } = $props();
  onMount(async () => {
    await checkSession();
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
