<script>
  import { HeartOutline, HeartSolid } from "flowbite-svelte-icons";
  import toast from "svelte-french-toast";

  import { updateUserCarsIsFavorite } from "../../utils/content.js";

  const { car, class: className = "" } = $props();

  let isFavorite = $derived(car.favorite);

  async function handleButtonClick(event) {
    event.stopPropagation();
    isFavorite = !isFavorite;

    const message = await updateUserCarsIsFavorite(car.user_car_id, isFavorite);
    toast.success(message);
  }
</script>

<button onclick={handleButtonClick}>
  {#if isFavorite}
    <HeartSolid color="red" class={className} />
  {:else}
    <HeartOutline color="red" class={className} />
  {/if}
</button>
