<script>
  import { Button } from "flowbite-svelte";
  import { CashOutline } from "flowbite-svelte-icons";

  const {
    title,
    message,
    price,
    onClickConfirm,
    onClickCancel,
    sell = false,
  } = $props();
</script>
<!-- Modal background -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      onclick={(event) => event.stopPropagation()}
      class="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
    >
<!-- Modal content -->
  <div class="bg-white p-4 rounded shadow w-80">
    <h2 class="text-lg font-bold mb-2">{title}</h2>
    <p class="mb-4">{message}</p>
    <div class="flex justify-end gap-2">
      <Button color={sell ? "green" : "red"} onclick={onClickCancel}
        >Cancel</Button
      >
      <Button
        class="gap-1"
        color={sell ? "red" : "green"}
        onclick={onClickConfirm}
        >{sell ? "Sell:" : "Buy:"} {Math.abs(price)}<CashOutline /></Button
      >
    </div>
  </div>
</div>
