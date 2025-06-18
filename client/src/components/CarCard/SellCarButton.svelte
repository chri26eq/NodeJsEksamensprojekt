<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import toast from "svelte-french-toast";

  import { updateUserContentFromServer } from "../../stores/userStore.js";
  import { sellCar } from "../../utils/shop.js";

  import BuySellModal from "../BuySellModal.svelte";

  let { car, class: className = "" } = $props();
  let showModal = $state(false);

  let carBrand = $derived(car.brand_name);
  let carModel = $derived(car.model_name);
  let carValue = $derived(car.value);

  const modalTitle = "Sell Car?";
  let modalMessage = $derived(
    `Do you want to sell your ${carBrand} ${carModel} for ${carValue} CarCash?`
  );

  async function confirmSale(event) {
    event.stopPropagation();

    const { success, message, value } = await sellCar(car);
    if (success) {
      toast.success("Car sold for " + value + " CarCash");
    } else {
      toast.error(message);
    }
    await updateUserContentFromServer();
  }
</script>

<button onclick={() => (showModal = true)}>
  <CashOutline class={"hover:text-red-500 " + className} />
</button>

<BuySellModal
  bind:open={showModal}
  title={modalTitle}
  message={modalMessage}
  price={carValue}
  onConfirm={confirmSale}
  sell
/>
