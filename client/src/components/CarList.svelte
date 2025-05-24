<script>
  import CarCard from "./CarCard/CarCard.svelte";
  import { Button } from "flowbite-svelte";
  import * as category from "../utils/carCategory";
  import { FilterOutline } from "flowbite-svelte-icons";
  import { userCars } from "../stores/userStore";
  import { get } from "svelte/store";

  const { cars, preview = false, onclick = undefined } = $props();

  
  let filter = $state(category.all);
  let showButtons = $state(false);

  const buttons = [
    { title: "All", filter: category.all },
    { title: "Common", filter: category.isCommon },
    { title: "Uncommon", filter: category.isUncommon },
    { title: "Rare", filter: category.isRare },
    { title: "Super", filter: category.isSuper },
    { title: "Legendary", filter: category.isLegendary },
  ];
</script>

<div class="flex flex-1 ">
  <div
    role="button"
    tabindex="0"
    class=" fixed flex gap-2 justify-center not-hover:my-6 not-hover:mr-6 hover:py-6 hover:pr-24"
    onkeydown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        showButtons = true;
      }
    }}
    onmouseenter={() => (showButtons = true)}
    onmouseleave={() => (showButtons = false)}
  >
    {#if !showButtons}
      <Button><FilterOutline /></Button>
    {/if}

    {#if showButtons}
      {#each buttons as button}
        <Button
          onclick={(event) => {
            event.stopPropagation();
            filter = button.filter;
          }}>{button.title}</Button
        >
      {/each}
    {/if}
  </div>

  <div class="flex flex-wrap gap-6 justify-center w-full">
    {#if cars && cars.filter(filter).length > 0}
      {#each cars as car (car.user_car_id)}
        {#if filter(car)}
          {#if onclick}
            <button onclick={() => onclick(car)}>
              <CarCard preview {car} />
            </button>
          {:else}
            <CarCard {preview} {car} />
          {/if}
        {/if}
      {/each}
    {:else}
   

      <p class="text-gray-600 text-[2.5rem] text-center my-[8%] ">No Cards</p>
    
    {/if}
  </div>
  
</div>
