<script>
  const { active = false, text, onClick = undefined } = $props();

  function itemClass() {
    let classString = "text-left py-2 rounded px-4";
    classString += active
      ? " text-white bg-blue-700"
      : " text-gray-700 hover:text-white hover:bg-blue-400 bg-blue-300/70 md:bg-transparent";
    return classString;
  }
</script>

{#if onClick}
  <button onclick={onClick} class={itemClass()}>{text}</button>
{:else}
  <div class={itemClass()}>{text}</div>
{/if}
