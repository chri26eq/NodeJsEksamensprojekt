<script>
  import { navigate } from "svelte-routing";
  import CarList from "../components/CarList/CarList.svelte";
  import { userCars } from "../stores/userStore";
  import { Button } from "flowbite-svelte";

  function buttonHandler() {
    navigate("/buycards", { replace: true });
  }
</script>

{#if $userCars.length === 0}
  <div class="flex flex-col items-center justify-center text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">You have no CarCards</h1>
    <Button size="xl" color="green" onclick={buttonHandler}>Go to store</Button>
  </div>
{:else}
  <CarList cars={$userCars} />
{/if}

