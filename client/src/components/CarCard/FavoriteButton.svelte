<script>
  import { HeartOutline, HeartSolid } from "flowbite-svelte-icons";
  import { updateUserContentFromServer } from "../../stores/userStore";
  import { updateUserCarsIsFavorite } from "../../utils/userContent";
  import toast from "svelte-french-toast";
  let { car } = $props();
  let isFavorite = $state(car.favorite);

  async function handleButtonClick(event) {
    event.stopPropagation();
    car.favorite = !isFavorite;
    isFavorite = !isFavorite;
    const message = await updateUserCarsIsFavorite(
      car.user_car_id,
      car.favorite

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
