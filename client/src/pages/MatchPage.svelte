<script>
  import { onMount, onDestroy } from "svelte";
  import io from "socket.io-client";
  import { getBaseServerUrl } from "../stores/urlStore";
  import { user, userCars } from "../stores/userStore";
  import CarCard from "../components/CarCard/CarCard.svelte";
  import CardSlot from "../components/Match/CardSlot.svelte";
  import { Button, Modal } from "flowbite-svelte";
  import Track from "../components/Track/Track.svelte";
  import CarList from "../components/CarList.svelte";
  import CardPlaceHolder from "../components/Match/CardPlaceHolder.svelte";

  let socket = io(getBaseServerUrl(), {
    withCredentials: true,
  });
  let currentRoom = $state(undefined);
  let player = $state(undefined);
  let opponent = $state(undefined);
  let selectedCars = $state({});

  let availableCars = $derived(
    $userCars.filter(
      (userCar) =>
        !Object.values(selectedCars).some(
          (selectedCar) => selectedCar?.user_car_id === userCar.user_car_id
        )
    )
  );

  let showModal = $state(false);
  let chosenTrackId = $state(null);

  socket.on("room-found", (room) => {
    currentRoom = room;
    for (const roomPlayer of room.players) {
      if (roomPlayer.userId === $user.id) player = roomPlayer;
      else opponent = roomPlayer;
    }
  });

  socket.on("opponent", (opponentFromServer) => {
    opponent = opponentFromServer;
    console.log("Opponent cars:", opponent.cars);
  });

socket.on("opponent-left", () => {
    opponent = undefined;
    console.log("Opponent left:");
  });

  onDestroy(() => {
    if (socket) {
      socket.emit("user-leaves-room", { roomId: currentRoom?.id });
      socket.disconnect();
    }
  });

  function handleFindGameButtonClick() {
    socket.emit("client-sends-find-game");
  }

  function handleSlotClick(trackId) {
    if (selectedCars[trackId]) {
      delete selectedCars[trackId];
      socket.emit("removeCar", { roomId: currentRoom.id, trackId: trackId });
    } else {
      chosenTrackId = trackId;
      showModal = true;
    }
  }

  function selectCarForSlot(car) {
    selectedCars[chosenTrackId] = car;
    socket.emit("chooseCar", {
      roomId: currentRoom.id,
      car: car,
      trackId: chosenTrackId,
    });
    showModal = false;
    chosenTrackId = null;
  }
</script>

{#if currentRoom}
  <!-- Valg af kort -->
  <div class="flex flex-row">
    <h2 class="flex flex-1 text-lg font-bold">Choose cars</h2>
    <div class="flex flex-8 gap-2">
      {#each currentRoom.tracksIds as trackId}
        <CardSlot size="xs" onclick={() => handleSlotClick(trackId)}>
          {#if selectedCars[trackId]}
            <CarCard size="xs" car={selectedCars[trackId]} preview />
          {/if}
        </CardSlot>
      {/each}
    </div>
  </div>
  <!-- Tracks -->

  <div class="flex flex-row">
    <h2 class="flex flex-1 text-lg font-bold">Tracks</h2>
    <div class="flex flex-8 gap-2">
      {#each currentRoom.tracksIds as trackId}
        <Track size="xs" {trackId} />
      {/each}
    </div>
  </div>

  <!-- Opponent -->

  {#if opponent}
    <div class="flex flex-row">
      <h2 class="flex flex-1 text-lg font-bold">Choose cars</h2>
      <div class="flex flex-8 gap-2">
        {#each currentRoom.tracksIds as trackId}
          <CardSlot size="xs">
            {#if opponent.cars[trackId]}
              <CardPlaceHolder size="xs" />
            {/if}
          </CardSlot>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Modal -->
  <Modal size="xl" title="Choose car" bind:open={showModal} autoclose>
    <CarList onclick={selectCarForSlot} cars={availableCars} />
  </Modal>
{:else}
  <div class="flex justify-center items-center h-[60vh]">
    <Button color="light" onclick={handleFindGameButtonClick}>Find Game</Button>
  </div>
{/if}
