<script>
  import CarList from "../components/CarList/CarList.svelte";
  import { userCars } from "../stores/userStore";
</script>


<CarList cars={$userCars} />