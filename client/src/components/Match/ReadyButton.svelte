<script>
  import { Button } from "flowbite-svelte";

  let isHovered = $state(false);

  let {
    raceStarted = false,
    playerIsReady = false,
    handleReadyButtonClick,
  } = $props();

  function getLabel() {
    if (raceStarted) return "Racing!";
    if (isHovered && playerIsReady) return "Cancel";
    if (isHovered && !playerIsReady) return "Ready?";
    return playerIsReady ? "Ready!" : "Not Ready";
  }
</script>

<Button
  size="xl"
  color={raceStarted ? "blue" : playerIsReady ? "green" : "red"}
  onclick={!raceStarted ? handleReadyButtonClick : undefined}
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  class="min-w-[8em]"
>
  {getLabel()}
</Button>
