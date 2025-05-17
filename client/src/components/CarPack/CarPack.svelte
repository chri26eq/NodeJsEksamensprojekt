<script>
  import { Button } from "flowbite-svelte";
  import { buyCarPack } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuySellModal from "../BuySellModal.svelte";
  import CarCard from "../CarCard/CarCard.svelte";
  import { updateUserContentFromServer } from "../../stores/userStore";

  const { packName, packPrice, packSize } = $props();

  const modalTitle = `Buy ${packName}?`;
  const modalMessage = `Do you want to pay ${packPrice} CarCash to buy the ${packName} containing ${packSize} cars?`;

  let showConfirmModal = $state(false);
  let showResultModal = $state(false);
  let newCars = $state([]);

  function openBuyPackModal(event) {
    event.stopPropagation();
    showConfirmModal = true;
  }

  async function confirmBuyPack(event) {
    event.stopPropagation();
    const result = await buyCarPack(packPrice, packSize);
    showConfirmModal = false;

    if (result.cars) {
      toast.success(result.message);
      newCars = result.cars;

      showResultModal = true;
    } else {
      toast.error(result.message);
    }

    await updateUserContentFromServer();
  }

  function cancelBuyPack(event) {
    event.stopPropagation();
    showConfirmModal = false;
  }

  function closeResultModal(event) {
    event.stopPropagation();
    showResultModal = false;
    newCars = [];
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col bg-amber-100 h-50 w-30">
    <div class="flex-1 bg-amber-700 mt-3"></div>
    <div class="flex-1 bg-amber-500"></div>
  </div>
  <Button onclick={openBuyPackModal} color="light">Buy</Button>
</div>

{#if showConfirmModal}
  <BuySellModal
    title={modalTitle}
    message={modalMessage}
    price={packPrice}
    onClickConfirm={confirmBuyPack}
    onClickCancel={cancelBuyPack}
  />
{/if}

{#if showResultModal}
  <div
      class="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full">
      <h2 class="text-xl font-bold mb-4">You got:</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto"
      >
        {#each newCars as car}
          <CarCard {car} preview/>
        {/each}
      </div>
      <div class="mt-6 flex justify-end">
        <Button color="light" onclick={closeResultModal}>Close</Button>
      </div>
    </div>
  </div>
{/if}
