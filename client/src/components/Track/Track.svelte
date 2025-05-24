<script>
  import { onMount } from "svelte";
  import { getTrackById } from "../../utils/content";

  const { trackId, size = "md" } = $props();

  const sizeClasses = {
    xs: " size-[9.25rem] text-[0.75rem] ",
    sm: " size-[10.625rem] text-[0.875rem] ",
    md: " size-[12rem] text-[1rem] ",
    lg: " size-[13.375rem] text-[1.125rem] ",
    xl: " size-[14.75rem] text-[1.25rem] ",
  };

  let track = $state(undefined);

  onMount(async () => {
    track = await getTrackById(trackId);
  });
</script>

<!-- id: 16
length: 5800
name: "Coastal Cruise"
num_corners: 15
surface: "Asphalt" -->

{#if track}
  <div
    class={"flex flex-col bg-gray-200 rounded-md overflow-hidden justify-between border-2" +
      sizeClasses[size]}
  >
  <div class="flex flex-3 bg-amber-100 items-center justify-center text-center">
    <p class="text-[1.1em] font-bold">{track.name}</p>
  </div>
  
  

    <div class="flex flex-1 px-[0.5em] border-t-2">
      <p class="flex-1 ">Length:</p>
      <p class="flex-1 ">{track.length / 1000} km.</p>
    </div>
    <div class="flex flex-1 px-[0.5em] border-t-2">
      <p class="flex-1 ">Corners:</p>
      <p class="flex-1 ">{track.num_corners}</p>
    </div>
    <div class="flex flex-1 px-[0.5em] border-t-2">
      <p class="flex-1 ">Surface:</p>
      <p class="flex-1 ">{track.surface}</p>
    </div>
    
  </div>
{:else}
  <p>Loading track info...</p>
  <!-- 
  <div class="flex-1 flex-col">
    <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
      <p class="text-[0.6em]">Tyres:</p>
      <p class="text-[0.6em]">{car.tyres}</p>
    </div>
    <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
      <p class="text-[0.6em]">Drivetrain:</p>
      <p class="text-[0.6em]">{car.drivetrain}</p>
    </div>
    <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
      <p class="text-[0.6em]">Value:</p>
      <p class="text-[0.6em] flex flex-row gap-[0.25em] items-center">
        {car.value}<CashOutline class="h-[1.25em] w-[1.25em]" />
      </p>
    </div>
  </div> -->
{/if}
