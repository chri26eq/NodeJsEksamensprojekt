<script>
  import {
    CheckPlusCircleOutline,
    CirclePlusOutline,
  } from "flowbite-svelte-icons";
  import { updateUserContentFromServer } from "../../stores/userStore";
  import { upgradeCar } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuySellModal from "../BuySellModal.svelte";

  let { car, class: className = "" } = $props();
  
  let isUpgraded = $derived(car.upgraded);
  let showModal = $state(false);

  

  const upgradePrice = 2000;
  const modalTitle = "Upgrade Car?";
  const modalMessage = $derived(`Do you want to pay ${upgradePrice} CarCash to upgrade your ${car.brand_name} ${car.model_name}?`);

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


  {#if isUpgraded}
    <div>
      <CheckPlusCircleOutline class={"text-green-500 " + className} />
    </div>
  {:else}
    <button onclick={openUpgradeModal}>
      <CirclePlusOutline class={"hover:text-blue-500 " + className} />
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

