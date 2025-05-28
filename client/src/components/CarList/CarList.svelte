<script>
  import CarCard from "../CarCard/CarCard.svelte";
  import { Button } from "flowbite-svelte";
  import * as pp from "./filters/pp";
  import { FilterOutline } from "flowbite-svelte-icons";


  const { cars, preview = false, onclick = undefined } = $props();

  
  let ppFilter = $state(pp.all);
  let showButtons = $state(false);

  const buttons = [
    { title: "All", filter: pp.all },
    { title: "Common", filter: pp.isCommon },
    { title: "Uncommon", filter: pp.isUncommon },
    { title: "Rare", filter: pp.isRare },
    { title: "Super", filter: pp.isSuper },
    { title: "Legendary", filter: pp.isLegendary },
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
            ppFilter = button.filter;
          }}>{button.title}</Button
        >
      {/each}
    {/if}
  </div>

  <div class="flex flex-wrap gap-6 justify-center w-full">
    {#if cars && cars.filter(ppFilter).length > 0}
      {#each cars as car (car.user_car_id)}
        {#if ppFilter(car)}
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
