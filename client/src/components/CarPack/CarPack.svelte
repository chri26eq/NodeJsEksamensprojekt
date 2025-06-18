<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import { Modal } from "flowbite-svelte";
  import toast from "svelte-french-toast";

  import { buyCarPack } from "../../utils/shop.js";
  import { updateUserContentFromServer } from "../../stores/userStore.js";

  import BuySellModal from "../BuySellModal.svelte";
  import CarList from "../CarList/CarList.svelte";

  const { packName, packPrice, numberOfCards, size = "md" } = $props();

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
</script>

<button
  onclick={() => (showConfirmModal = true)}
  class={"flex flex-col items-center justify-between rounded-[0.5em] overflow-hidden shadow-xl/30 hover:scale-105 transition-transform duration-200 border border-black " +
    sizeClasses[size]}
>
  <div class="flex-1 w-full flex bg-amber-200 justify-end">
    <p
      class="flex flex-row text-[1em] font-bold items-center gap-[0.1em] px-[0.5em]"
    >
      {packPrice}<CashOutline class="size-[1em]" />
    </p>
  </div>
  <div
    class="flex-5 w-full flex items-center justify-center bg-amber-700/90 px-[0.2em] py-[0.2em]"
  >
    <p class="text-white text-[1.2em] font-bold rotate-[10deg]">
      {packName}
    </p>
  </div>

  <div
    class="flex-5 w-full flex items-center justify-center bg-amber-500/90 px-[0.2em] py-[0.2em]"
  >
    <p class="text-white text-[1.1em] font-medium text-center">
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

<Modal
  title="New {numberOfCards == 1 ? 'CarCard' : 'CarCards'}"
  bind:open={showResultModal}
  autoclose
>
  <CarList preview filterExcluded cars={newCars} />
</Modal>
