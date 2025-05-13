<script>
  const { active = false, text } = $props();

  function itemClass() {
    return active
      ? " text-white bg-blue-700"
      : " text-gray-700 hover:text-white hover:bg-blue-400 bg-blue-300/70 md:bg-transparent";
  }
</script>

<div class={ "py-2 rounded px-4" + itemClass()}>{text}</div>
