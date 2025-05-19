<script>
  import { onMount, onDestroy } from "svelte";
  import io from "socket.io-client";

  import { Button } from "flowbite-svelte";
  import { getBaseServerUrl } from "../stores/urlStore";
  import { user, userCars } from "../stores/userStore";

  let socket;
  onMount(() => {
    socket = io(getBaseServerUrl(), {
      withCredentials: true,
    });
  });

  onDestroy(() => {
    if (socket) {
      socket.emit("user-leaves-room", { user: $user });

      socket.disconnect({ user: $user });
    }
  });

  function handleFindGameButtonClick() {
    socket.emit("client-sends-find-game", { user: $user });
  }
</script>

<h1>Match Page</h1>

<Button onclick={handleFindGameButtonClick} >Find Game</Button>
