<script>
  import { derived } from "svelte/store";

  import { navigate } from "svelte-routing";
  import { Button } from "flowbite-svelte";

  import { userCars } from "../stores/userStore.js";

  import CarList from "../components/CarList/CarList.svelte";

  const userHasNoCards = derived(userCars, $userCars => $userCars?.length === 0);
  
  function buttonHandler() {
    navigate("/buycards", { replace: true });
  }
</script>

{#if $userHasNoCards}
  <div class="flex flex-col items-center justify-center text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">You have no CarCards</h1>
    <Button size="xl" color="green" onclick={buttonHandler}>Go to store</Button>
  </div>
{:else}
  <CarList cars={$userCars} />
{/if}

