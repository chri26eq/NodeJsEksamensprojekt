<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import { Modal } from "flowbite-svelte";

  import { user } from "../../stores/userStore.js";

  let { open = $bindable(), matchWinner, opponentLeft } = $props();
</script>

<Modal size="xl" title="Race" bind:open autoclose>
  {#if matchWinner}
    {#if matchWinner.userId === $user.id}
      <h2>YOU WON</h2>
      <h3 class="flex flex-row items-center gap-x-1">
        1.000<CashOutline size="md" />was added to your account
      </h3>
    {:else}
      <h2>YOU LOST</h2>
    {/if}

    {#if opponentLeft}
      <h4 color="red">Opponent left match.</h4>
    {/if}
  {:else}
    <h2>Tie..</h2>
  {/if}
</Modal>
