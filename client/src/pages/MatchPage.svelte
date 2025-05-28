<script>
  import { onDestroy, onMount } from "svelte";
  import io from "socket.io-client";
  import { getBaseServerUrl } from "../stores/urlStore";
  import { user, userCars } from "../stores/userStore";
  import CarCard from "../components/CarCard/CarCard.svelte";
  import CardSlot from "../components/Match/CardSlot.svelte";
  import { Button, Modal } from "flowbite-svelte";
  import Track from "../components/Track/Track.svelte";
  import CarList from "../components/CarList/CarList.svelte";
  import CardPlaceHolder from "../components/Match/CardPlaceHolder.svelte";

  let socket = io(getBaseServerUrl(), {
    withCredentials: true,
  });
  let currentRoom = $state(undefined);

  let raceStarted = $state(false);
  let matchWinner = $state(undefined);

  let gameOver = $derived(!!matchWinner);
  let opponentLeft = $state(false);

  let races = $state([]);

  let player = $derived(
    currentRoom?.players.find((p) => p.userId === $user.id)
  );
  let opponent = $derived(
    currentRoom?.players.find((p) => p.userId !== $user.id)
  );

  let allCarsChosen = $derived(Object.keys(player?.cars ?? {}).length === 5);
  let playerIsReady = $derived(player?.ready ?? false);

  let chosenTrackId = $state(null);
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

  function carOverlay(races, trackId, car) {
    const race = races.find((r) => r.trackId === trackId);
    if (!race) return undefined;
    if (!race.winner) return "tied";
    return race.winner.carId === car.user_car_id ? "winner" : "loser";
  }
  // Listeners
  // -------------------------------------------------------------------------------------------

  socket.on("roomContent", (room) => {
    currentRoom = room;
    console.log("ROOM:", currentRoom);
  });

  // -------------------------------------------------------------------------------------------

  socket.on("raceStarted", () => {
    raceStarted = true;
  });

  // -------------------------------------------------------------------------------------------

  socket.on("raceResult", (result) => {
    races.push(result);
  });

  // -------------------------------------------------------------------------------------------

  socket.on("matchResult", (result) => {
    matchWinner = result.winner;
    opponentLeft = result.opponentLeft;
  });

  // -------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------------------

  // Emitters
  // -------------------------------------------------------------------------------------------

  function handleFindGameButtonClick() {
    socket.emit("findGame");
  }

  onDestroy(leaveGame);

  function leaveGame() {
    if (socket) {
      socket.emit("user-leaves-room", { roomId: currentRoom?.id });
      socket.disconnect();
    }
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

  function handleReadyButtonClick() {
    playerIsReady = !playerIsReady;
    socket.emit("clickedReady", {
      roomId: currentRoom.id,
      ready: playerIsReady,
    });
  }
</script>

{#if currentRoom}
  <div class="flex flex-row gap-6">
    <div  class=" flex flex-col gap-2">
      <!-- Valg af kort -->
      <div class="flex flex-row">
        <h2 class="flex flex-1 text-lg font-bold">Choose cars</h2>
        <div class="flex flex-8 gap-2">
          {#each currentRoom.trackIds as trackId}
            <CardSlot
              size="xs"
              onclick={raceStarted ? undefined : () => handleSlotClick(trackId)}
            >
              {#if selectedCars[trackId]}
                <CarCard
                  overlay={carOverlay(races, trackId, selectedCars[trackId])}
                  size="xs"
                  car={selectedCars[trackId]}
                  preview
                />
              {/if}
            </CardSlot>
          {/each}
        </div>
      </div>
      <!-- Tracks -->

      <div class="flex flex-row">
        <h2 class="flex flex-1 text-lg font-bold">Tracks</h2>
        <div class="flex flex-8 gap-2">
          {#each currentRoom.trackIds as trackId}
            <Track size="xs" {trackId} />
          {/each}
        </div>
      </div>

      <!-- Opponent -->

      {#if opponent}
        <div class="flex flex-row">
          <h2 class="flex flex-1 text-lg font-bold">Opponent cars</h2>
          <div class="flex flex-8 gap-2">
            {#each currentRoom.trackIds as trackId}
              <CardSlot size="xs">
                {#if opponent.cars[trackId]}
                  {#if raceStarted}
                    <CarCard
                      overlay={carOverlay(
                        races,
                        trackId,
                        opponent.cars[trackId]
                      )}
                      size="xs"
                      car={opponent.cars[trackId]}
                      preview
                    />
                  {:else}
                    <CardPlaceHolder size="xs" />
                  {/if}
                {/if}
              </CardSlot>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    <div>
      {#if allCarsChosen}
        <Button
          size="xl"
          color={raceStarted ? "blue" : playerIsReady ? "green" : "red"}
          onclick={raceStarted ? undefined : handleReadyButtonClick}
          >{raceStarted
            ? "Racing!"
            : playerIsReady
              ? "Ready!"
              : "Ready?"}</Button
        >
      {/if}
    </div>
  </div>
  <!-- -----------------------CHOOSE CAR MODAL----------------------- -->
  <Modal size="xl" title="Choose car" bind:open={showModal} autoclose>
    <CarList onclick={selectCarForSlot} cars={availableCars} />
  </Modal>

  <!-- -----------------------GAME OVER----------------------- -->
  <Modal size="xl" title="Race" bind:open={gameOver} autoclose>
    <h2>{matchWinner.nickname} WON!!</h2>
    {#if opponentLeft}
      <h4 color="red">Opponent left match.</h4>
    {/if}
  </Modal>

  <!-- -----------------------FIND GAME BUTTON----------------------- -->
{:else}
  <div class="flex justify-center items-center h-[60vh]">
    <Button color="light" onclick={handleFindGameButtonClick}>Find Game</Button>
  </div>
{/if}
