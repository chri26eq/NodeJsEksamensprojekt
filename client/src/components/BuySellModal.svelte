<script>
  import { Button, Modal } from "flowbite-svelte";
  import { CashOutline } from "flowbite-svelte-icons";

  let {
    open = $bindable(),
    title,
    message,
    price,
    onConfirm,
    sell = false,
  } = $props();
</script>

<Modal size="sm" title={title} bind:open autoclose>
  
  <p class="mb-4">{message}</p>
  <div class="flex justify-end gap-2">
    <Button color={sell ? "green" : "red"} onclick={() => (open = false)}
      >Cancel</Button
    >
    <Button class="gap-1" color={sell ? "red" : "green"} onclick={(event) => {
      onConfirm(event)
      open = false}}
      >{sell ? "Sell:" : "Buy:"} {Math.abs(price)}<CashOutline /></Button
    >
  </div>
</Modal>
