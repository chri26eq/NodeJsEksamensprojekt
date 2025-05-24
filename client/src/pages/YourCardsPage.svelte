<script>
  import CarList from "../components/CarList.svelte";
  import { userCars } from "../stores/userStore";
</script>


<CarList cars={$userCars} />