<script>
  import {
    CashOutline,
  } from "flowbite-svelte-icons";
  import { updateUserContentFromServer } from "../../stores/userStore";
  import { sellCar, upgradeCar } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuySellModal from "../BuySellModal.svelte";

  let { car } = $props();
  let showModal = $state(false);

  const carBrand = car.brand_name;
  const carModel = car.model_name;
  const carValue = car.value;

  const modalTitle = "Sell Car?";
  const modalMessage = `Do you want to sell your ${carBrand} ${carModel} for ${carValue} CarCash?`;

  function openSellModal(event) {
    event.stopPropagation();
    showModal = true;
  }

  async function confirmSale(event) {
    event.stopPropagation();

    const { success, message, value } = await sellCar(car);
    if (success) {
      toast.success("Car sold");
    } else {
      toast.error(message);
    }
    showModal = false;
    await updateUserContentFromServer();
  }

  function cancelSale(event) {
    event.stopPropagation();
    showModal = false;
  }
</script>

<div>
  <button onclick={openSellModal}>
    <CashOutline />
  </button>

  {#if showModal}
    <BuySellModal
      title={modalTitle}
      message={modalMessage}
      price={carValue}
      onClickConfirm={confirmSale}
      onClickCancel={cancelSale}
      sell
    />
  {/if}
</div>
