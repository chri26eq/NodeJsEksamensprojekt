<script>
  import CarCardExpanded from "./CarCardExpanded.svelte";
  import FavoriteButton from "./FavoriteButton.svelte";
  import SellCarButton from "./SellCarButton.svelte";
  import UpgradeButton from "./UpgradeButton.svelte";

  const { car, preview = false } = $props();
  let showModal = $state(false);

  function closeModal() {
    showModal = false;
  }
  function openModal() {
    showModal = true;
  }

  function handleKeyPress(event) {
    if (event.key === "Enter" || event.key === " ") {
      openModal();
    }
  }
</script>

<div class="flex flex-col gap-4">
  <!-- Kort -->
  <div
    role="button"
    tabindex="0"
    onkeydown={handleKeyPress}
    aria-label={car.brand_name + " " + car.model_name + " card"}
    class="flex flex-col h-70 w-45 cursor-pointer"
    onclick={openModal}
  >
    <div class="flex flex-1 bg-amber-100 items-center">
      <p class="text-[0.7em] ml-1">{car.model_name}</p>
    </div>
    <div class="flex flex-6 bg-amber-700">
      <div class="bg-cyan-300 flex-7"></div>
      <div class="flex flex-col bg-cyan-500 flex-1">
        {#if !preview}
          <FavoriteButton {car} />
          <UpgradeButton {car} />
          <SellCarButton {car} />
        {/if}
      </div>
    </div>

    <div class="flex-4 bg-amber-500"></div>
  </div>

  {#if showModal}
    <div class="fixed inset-0 flex justify-center items-center">
      <button onclick={closeModal}>
        <CarCardExpanded {car} />
      </button>
    </div>
  {/if}
</div>
