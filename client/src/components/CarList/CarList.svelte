<script>
  import CarCard from "../CarCard/CarCard.svelte";
  import { Button } from "flowbite-svelte";
  import * as pp from "./filters/pp.js";
  import * as tyres from "./filters/tyres.js";
  import * as drivetrain from "./filters/drivetrain.js";
  import { FilterOutline } from "flowbite-svelte-icons";

  const { cars, preview = false, onclick = undefined } = $props();

  let ppFilters = $state([pp.all]);
  let tyresFilter = $state([tyres.all]);
  let drivetrainFilter = $state([drivetrain.all]);
  let showButtons = $state(false);

  const ppButtons = [
    { title: "PP", filter: pp.all },
    { title: "Common", filter: pp.isCommon },
    { title: "Uncommon", filter: pp.isUncommon },
    { title: "Rare", filter: pp.isRare },
    { title: "Super", filter: pp.isSuper },
    { title: "Legendary", filter: pp.isLegendary },
  ];

  const tyresButtons = [
    { title: "Tyres", filter: tyres.all },
    { title: "Standard", filter: tyres.isStandard },
    { title: "Performance", filter: tyres.isPerformance },
    { title: "Slicks", filter: tyres.isSlicks },
    { title: "All-terrain", filter: tyres.isAllTerrain },
    { title: "Offroad", filter: tyres.isOffroad },
  ];

  const drivetrainButtons = [
    { title: "Drivetrain", filter: drivetrain.all },
    { title: "RWD", filter: drivetrain.isRWD },
    { title: "FWD", filter: drivetrain.isFWD },
    { title: "4X4", filter: drivetrain.is4X4 },
  ];

  function matchesAnyFilter(car) {
    const mathesAnyPpFilter = ppFilters.some((filter) => filter(car));
    const mathesAnyTyresFilter = tyresFilter.some((filter) => filter(car));
    const mathesAnyDrivetrainFilter = drivetrainFilter.some((filter) =>
      filter(car)
    );

    return [
      mathesAnyPpFilter,
      mathesAnyTyresFilter,
      mathesAnyDrivetrainFilter,
    ].every((filterGroup) => filterGroup == true);
  }
</script>

<div class="flex flex-1">
  <div
    role="button"
    tabindex="0"
    class="fixed not-hover:my-6 not-hover:mr-6 hover:py-6 hover:pr-24"
    onkeydown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        showButtons = true;
      }
    }}
    onmouseenter={() => (showButtons = true)}
    onmouseleave={() => (showButtons = false)}
  >
    {#if !showButtons}
      <Button color="gray"><FilterOutline /></Button>
    {/if}

    {#if showButtons}
      <div class="flex flex-col gap-1">
        <div class="flex gap-2">
          {#each ppButtons as ppButton}
            <Button
              color={ppFilters.includes(ppButton.filter) ? "yellow" : "gray"}
              onclick={(event) => {
                event.stopPropagation();
                ppFilters = pp.togglePpFilter(ppFilters, ppButton.filter);
              }}
            >
              {ppButton.title}
            </Button>
          {/each}
        </div>
        <div class="flex gap-2">
          {#each tyresButtons as tyreButton}
            <Button
              color={tyresFilter.includes(tyreButton.filter) ? "green" : "gray"}
              onclick={(event) => {
                event.stopPropagation();
                tyresFilter = tyres.toggleTyresFilter(
                  tyresFilter,
                  tyreButton.filter
                );
              }}
            >
              {tyreButton.title}
            </Button>
          {/each}
        </div>
        <div class="flex gap-2">
          {#each drivetrainButtons as drivetrainButton}
            <Button
              color={drivetrainFilter.includes(drivetrainButton.filter) ? "blue" : "gray"}
              onclick={(event) => {
                event.stopPropagation();
                drivetrainFilter = drivetrain.toggleDrivetrainFilter(
                  drivetrainFilter,
                  drivetrainButton.filter
                );
              }}
            >
              {drivetrainButton.title}
            </Button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="flex flex-wrap gap-6 justify-center w-full">
    {#if cars.filter(matchesAnyFilter).length > 0}
      {#each cars as car (car.user_car_id)}
        {#if matchesAnyFilter(car)}
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
      <p class="text-gray-600 text-[2.5rem] text-center my-[8%]">No Cards</p>
    {/if}
  </div>
</div>
