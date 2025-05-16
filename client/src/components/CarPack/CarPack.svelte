<script>
    import { Button } from "flowbite-svelte";
  import { buyCarPack } from "../../utils/shop";

</script>
<div class="flex flex-col gap-4">
<div class="flex flex-col bg-amber-100 h-50 w-30">
    <div class="flex-1 bg-amber-700 mt-3"></div>
    <div class="flex-1 bg-amber-500"></div>
</div>
<Button onclick={buyCarPack} color="light" >Buy</Button>

</div>



