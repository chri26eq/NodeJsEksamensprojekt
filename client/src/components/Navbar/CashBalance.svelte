<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import { cashBalance } from "../../stores/userStore";
</script>

<p class="flex flex-row bg-amber-100 px-3 py-1 rounded">
  CarCash: {$cashBalance}<CashOutline />
</p>
