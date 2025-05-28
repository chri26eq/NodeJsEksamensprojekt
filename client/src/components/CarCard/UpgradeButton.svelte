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
  const modalMessage = $derived(
    `Do you want to pay ${upgradePrice} CarCash to upgrade your ${car.brand_name} ${car.model_name}?`
  );

  async function confirmUpgrade() {
    car.upgraded = true;

    const wasUpgraded = await upgradeCar(car);
    if (wasUpgraded) {
      toast.success("Car upgraded");
      isUpgraded = true;
    } else {
      toast.error("Not enough CarCash");
      isUpgraded = false;
    }
    await updateUserContentFromServer();
  }
</script>

{#if isUpgraded}
  <div>
    <CheckPlusCircleOutline class={"text-green-500 " + className} />
  </div>
{:else}
  <button
    onclick={() => {
      showModal = true;
    }}
  >
    <CirclePlusOutline class={"hover:text-blue-500 " + className} />
  </button>
{/if}

<BuySellModal
  bind:open={showModal}
  title={modalTitle}
  message={modalMessage}
  price={upgradePrice}
  onConfirm={confirmUpgrade}
/>
