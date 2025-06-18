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


<div
  class={"flex flex-col bg-gray-200 rounded-md overflow-hidden justify-between border-2" +
    sizeClasses[size]}
>
  <div class="flex flex-3 bg-amber-100 items-center justify-center text-center">
    <p class="text-[1.1em] font-bold">{track ? track.name : "Loading..."}</p>
  </div>

  <div class="flex flex-1 px-[0.5em] border-t-2">
    <p class="flex-1">Length:</p>
    <p class="flex-1">{track ? track.length / 1000 + " km." : "Loading..."}</p>
  </div>
  <div class="flex flex-1 px-[0.5em] border-t-2">
    <p class="flex-1">Corners:</p>
    <p class="flex-1">{track ? track.num_corners : "Loading..."}</p>
  </div>
  <div class="flex flex-1 px-[0.5em] border-t-2">
    <p class="flex-1">Surface:</p>
    <p class="flex-1">{track ? track.surface : "Loading..."}</p>
  </div>
</div>
