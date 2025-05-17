<script>
  import { Button } from "flowbite-svelte";
  import { CashOutline } from "flowbite-svelte-icons";

  const { title, message, price, onClickConfirm, onClickCancel } = $props();
</script>

<div class="bg-white p-4 rounded shadow w-80">
  <h2 class="text-lg font-bold mb-2">{title}</h2>
  <p class="mb-4">{message}</p>
  <div class="flex justify-end gap-2">
    <Button color="red" onclick={onClickCancel}>Cancel</Button>
    <Button class="gap-1" color="green" onclick={onClickConfirm}
      >Buy: {price}<CashOutline /></Button
    >
  </div>
</div>
