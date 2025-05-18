<script>
  import { HeartOutline, HeartSolid } from "flowbite-svelte-icons";
  import { updateUserCarsIsFavorite } from "../../utils/userContent";
  import toast from "svelte-french-toast";

  const { car } = $props();

  let isFavorite = $derived(car.favorite);

  async function handleButtonClick(event) {
    event.stopPropagation();
    isFavorite = !isFavorite;

    const message = await updateUserCarsIsFavorite(
      car.user_car_id,
      isFavorite
    );
    toast.success(message);
  }
</script>

<div>
  <button onclick={handleButtonClick}>
    {#if isFavorite}
      <HeartSolid color="red" />
    {:else}
      <HeartOutline color="red" />
    {/if}
  </button>
</div>
