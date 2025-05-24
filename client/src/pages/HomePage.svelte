<script>
  import CarCard from "../components/CarCard/CarCard.svelte";
import CardPlaceHolder from "../components/Match/CardPlaceHolder.svelte";
  import CardSlot from "../components/Match/CardSlot.svelte";
  import { userCars } from "../stores/userStore";
  import { Button, Modal } from "flowbite-svelte";
  let showModal = $state(false);
</script>

<h1>Home Page</h1>

<Button onclick={() => (showModal = true)}>Default modal</Button>
<div class=" flex flex-1 justify-center items-center align-middle">
<div class=" flex flex-row gap-3" >
<CardSlot />
  <CarCard car={$userCars[2]} />
  <CardPlaceHolder />
</div>
</div>
<Modal  size="xl" title="Choose cars" bind:open={showModal} autoclose>
  <div class="flex flex-wrap gap-6 justify-center">

 
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
  <CardSlot onclick={undefined}><CardPlaceHolder /></CardSlot>
 </div >
  
</Modal>
