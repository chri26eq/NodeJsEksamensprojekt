<script>
  import CarCard from "../components/CarCard/CarCard.svelte";
  import { updateUserContentFromServer, userCars } from "../stores/userStore";


</script>

<div class="flex flex-wrap justify-center gap-y-2 gap-x-1 ">
  {#each $userCars as car (car.user_car_id)}
    <div class="w-[48%] sm:w-[30%] md:w-[24%] lg:w-[18%] xl:w-[16%]">
      <CarCard car={car}/>
    </div>
  {/each}
</div>
