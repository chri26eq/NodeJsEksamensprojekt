<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import { cashBalance } from "../../stores/userStore";
</script>

<p class="flex flex-row bg-amber-100 px-3 py-1 rounded items-center gap-1">
  CarCash: {Intl.NumberFormat('da-DK').format($cashBalance)} <CashOutline size="md" />
</p>
