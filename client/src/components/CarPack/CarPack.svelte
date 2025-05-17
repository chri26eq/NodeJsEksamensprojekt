<script>
  import { Button } from "flowbite-svelte";
  import { buyCarPack } from "../../utils/shop";
  import toast from "svelte-french-toast";
  import BuyModal from "../BuyModal.svelte";
  import { updateUserContentFromServer } from "../../stores/userStore";

  const { packName, packPrice,  } = $props();
  
  const modalTitle = `Buy ${packName}?`
  const modalMessage = `Do you want to pay ${packPrice} to buy the ${packName}?`

  let showModal = $state(false);

  function openBuyPackModal(event) {
    event.stopPropagation();
    showModal = true;
  }


  async function confirmBuyPack(event) {
    event.stopPropagation();

    const result = await buyCarPack(packPrice);
  if (result.cars) {
    toast.success(result.message)
  } else {
    toast.error(result.message)
  }

  showModal = false;
  await updateUserContentFromServer();
  }

  function cancelBuyPack(event) {
    event.stopPropagation();
    showModal = false;
  }







</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col bg-amber-100 h-50 w-30">
    <div class="flex-1 bg-amber-700 mt-3"></div>
    <div class="flex-1 bg-amber-500"></div>
  </div>
  <Button onclick={openBuyPackModal} color="light">Buy</Button>
</div>




{#if showModal}
  <!-- Modal overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={(event) => event.stopPropagation()}
    class="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
  >
    <!-- Modal content -->

    <BuyModal
      title={modalTitle}
      message={modalMessage}
      price={packPrice}
      onClickConfirm={confirmBuyPack}
      onClickCancel={cancelBuyPack}
    />
  </div>
{/if}
