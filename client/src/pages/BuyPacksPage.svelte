<script>
  import CarPack from "../components/CarPack/CarPack.svelte";
</script>

<div class="flex justify-center gap-6">
  <CarPack
    packName="Feeling Lucky Pack"
    packPrice="750"
    numberOfCards="1"
    size="lg"
  />
  <CarPack 
    packName="Triple Pack" 
    packPrice="2000" 
    numberOfCards="3" 
    size="lg" />
  <CarPack
    packName="Starter Pack"
    packPrice="5000"
    numberOfCards="5"
    size="lg"
  />
  <CarPack 
    packName="Big Pack" 
    packPrice="9000" 
    numberOfCards="10" 
    size="lg" />
  <CarPack
    packName="Economy Pack"
    packPrice="40000"
    numberOfCards="50"
    size="lg"
  />
</div>
