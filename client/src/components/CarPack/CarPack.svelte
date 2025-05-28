<script>
  import { Button } from "flowbite-svelte";
  import { buyCarPack } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuySellModal from "../BuySellModal.svelte";
  import CarCard from "../CarCard/CarCard.svelte";
  import { updateUserContentFromServer } from "../../stores/userStore";

  const { packName, packPrice, numberOfCards, size="md" } = $props();

  

  const sizeClasses = {
    xs: " h-[12.75rem] w-[8.25rem] text-[0.75rem] ",
    sm: " h-[14.875rem] w-[9.625rem] text-[0.875rem] ",
    md: " h-[17rem] w-[11rem] text-[1rem] ",
    lg: " h-[19.125rem] w-[12.375rem] text-[1.125rem] ",
    xl: " h-[21.25rem] w-[13.75rem] text-[1.25rem] ",
  };

  const modalTitle = `Buy ${packName}?`;
  const modalMessage = `Do you want to pay ${packPrice} CarCash to buy the ${packName} containing ${numberOfCards} ${numberOfCards == 1 ? "CarCard?" : "CarCards?"}`;

  let showConfirmModal = $state(false);
  let showResultModal = $state(false);
  let newCars = $state([]);


  async function confirmBuyPack() {
    const result = await buyCarPack(packPrice, numberOfCards);

    if (result.cars) {
      toast.success(result.message);
      newCars = result.cars;

      showResultModal = true;
    } else {
      toast.error(result.message);
    }

    await updateUserContentFromServer();
  }

  

  function closeResultModal(event) {
    event.stopPropagation();
    showResultModal = false;
    newCars = [];
  }
</script>

<button
onclick={() => showConfirmModal = true}
class={
  "flex flex-col items-center justify-between rounded-[0.5em] overflow-hidden shadow-xl/30 hover:scale-105 transition-transform duration-200 border border-black " +
  sizeClasses[size]
}

>
<!-- Top: pack name -->
<div class="flex-1 w-full flex items-center justify-center bg-amber-700/90 px-[0.2em] py-[0.2em]">
  <p class="text-white text-[1.2em] font-bold  rotate-[10deg]">
    {packName}
  </p>
</div>

<!-- Bottom: pack info -->
<div class="flex-1 w-full flex items-center justify-center bg-amber-500/90 px-[0.2em] py-[0.2em]">
  <p class="text-white text-[1.1em] font-medium text-center ">
    {numberOfCards} random {numberOfCards == 1 ? "CarCard" : "CarCards"}
  </p>
</div>

</button>



  <BuySellModal
  bind:open={showConfirmModal}
    title={modalTitle}
    message={modalMessage}
    price={packPrice}
    onConfirm={confirmBuyPack}
  />


{#if showResultModal}
  <div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
    <div class="bg-black/70 rounded-2xl shadow-lg p-6 max-w-4xl w-full">
      <div class="my-2 flex justify-between align-middle">
        <h2 class="text-white text-xl font-bold mb-4">You got:</h2>
        <Button color="light" onclick={closeResultModal}>Close</Button>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto py-3"
      >
        {#each newCars as car}
          <CarCard {car} preview />
        {/each}
      </div>
    </div>
  </div>
{/if}
