<script>
  const { active = false, text, onclick = undefined } = $props();

  function itemClass() {
    let classString = "text-left py-2 rounded px-4";
    classString += active
      ? " text-white bg-blue-700"
      : " text-gray-700 hover:text-white hover:bg-blue-400 bg-blue-300/70 md:bg-transparent";
    return classString;
  }
</script>

{#if onclick}
  <button onclick={onclick} class={itemClass()}>{text}</button>
{:else}
  <div class={itemClass()}>{text}</div>
{/if}
