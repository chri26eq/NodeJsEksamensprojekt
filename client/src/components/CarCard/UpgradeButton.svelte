<script>
  import {
    CheckPlusCircleOutline,
    CirclePlusOutline,
    CashOutline,
  } from "flowbite-svelte-icons";
  import { updateUserContentFromServer } from "../../stores/userStore";
  import { upgradeCar } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuySellModal from "../BuySellModal.svelte";

  let { car } = $props();
  let isUpgraded = $state(car.upgraded);
  let showModal = $state(false);

  const carBrand = car.brand_name;
  const carModel = car.model_name;

  const upgradePrice = 2000;
  const modalTitle = "Upgrade Car?";
  const modalMessage = `Do you want to pay ${upgradePrice} CarCash to upgrade your ${carBrand} ${carModel}?`;

  function openUpgradeModal(event) {
    event.stopPropagation();
    showModal = true;
  }

  async function confirmUpgrade(event) {
    event.stopPropagation();

    car.upgraded = true;

    const wasUpgraded = await upgradeCar(car);
    if (wasUpgraded) {
      toast.success("Car upgraded");
      isUpgraded = true;
    } else {
      toast.error("Not enough CarCash");
      isUpgraded = false;
    }
    showModal = false;
    await updateUserContentFromServer();
  }

  function cancelUpgrade(event) {
    event.stopPropagation();
    showModal = false;
  }
</script>

<div>
  {#if isUpgraded}
    <div>
      <CheckPlusCircleOutline />
    </div>
  {:else}
    <button onclick={openUpgradeModal}>
      <CirclePlusOutline />
    </button>
  {/if}

  {#if showModal}
    <!-- Modal overlay -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    
      <BuySellModal
        title={modalTitle}
        message={modalMessage}
        price={upgradePrice}
        onClickConfirm={confirmUpgrade}
        onClickCancel={cancelUpgrade}
      />
    
  {/if}
</div>
