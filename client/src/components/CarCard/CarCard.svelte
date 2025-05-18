<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import FavoriteButton from "./FavoriteButton.svelte";
  import SellCarButton from "./SellCarButton.svelte";
  import UpgradeButton from "./UpgradeButton.svelte";

  const { car, preview = false } = $props();

  const cardColors = {
    pp00_39: { topBar: " bg-neutral-300 ", sideBar: " bg-neutral-50 border-l-1 ", mainBody: " bg-neutral-50 ", bottom: " bg-neutral-200 "},
    pp40_59: { topBar: " bg-lime-300 ", sideBar: " bg-neutral-50 border-l-1 ", mainBody: " bg-neutral-50 ", bottom: " bg-neutral-200 "},
    pp60_79: { topBar: " bg-red-600 ", sideBar: " bg-neutral-50 border-l-1 ", mainBody: " bg-neutral-800 text-white ", bottom: " bg-neutral-600 text-white "},
    pp80_89: { topBar: " bg-violet-700 text-white ", sideBar: " bg-teal-200 ", mainBody: " bg-neutral-800 text-white ", bottom: " bg-teal-400 "},
    pp90_100: { topBar: " bg-amber-300 ", sideBar: " bg-cyan-500 ", mainBody: " bg-cyan-300 ", bottom: " bg-amber-300 "},
  };

  let cardColor = $derived(() => {
  if (car.pp >= 90) return cardColors.pp90_100;
  else if (car.pp >= 80) return cardColors.pp80_89;
  else if (car.pp >= 60) return cardColors.pp60_79;
  else if (car.pp >= 40) return cardColors.pp40_59;
  else return cardColors.pp00_39;
});

</script>

<div class="flex flex-col h-70 w-45 shadow-xl/30 rounded-md overflow-hidden ">
  <div class={"flex flex-1 items-center" + cardColor().topBar}>
    <p class="text-[0.9em] font-bold mx-1">{car.brand_name}</p>
  </div>
  <div class="flex flex-6">
    <div class={"flex flex-col flex-7" + cardColor().mainBody}>
      <div class="flex flex-col flex-1 text-sm">
        <p class="font-semibold px-1 py-0.5 break-words">{car.model_name}</p>
      </div>
      <div class="flex flex-row items-end justify-between h-full ">
        <p
          class="text-[0.9em] font-semibold px-1 py-0.5 break-words max-w-[70%]"
        >
          {car.country_name}
        </p>

        <p
          class="text-[0.8em] bold font-semibold whitespace-nowrap bg-amber-200 text-black px-1 py-0.5 rounded m-1"
        >
          {car.pp} PP
        </p>
      </div>
    </div>
    <div class={"flex flex-col flex-1" + cardColor().sideBar}>
      {#if !preview}
        <FavoriteButton {car} />
        <UpgradeButton {car} />
        <SellCarButton {car} />
      {/if}
    </div>
  </div>
  <div class={"flex flex-4" + cardColor().bottom}>
    <div class="flex-1 flex-col">
      <div class="border-t-1 py-0.5 px-1">
        <p class="text-[0.6em]">Topspeed:</p>
        <p class="text-[0.6em]">{car.top_speed} km/h</p>
      </div>
      <div class="border-t-1 py-0.5 px-1">
        <p class="text-[0.6em]">0-100 km/h:</p>
        <p class="text-[0.6em]">{car.accel_0_to_100 / 100} sec.</p>
      </div>
      <div class="border-t-1 py-0.5 px-1">
        <p class="text-[0.6em]">Handling:</p>
        <p class="text-[0.6em]">{car.handling}</p>
      </div>
    </div>
    <div class="flex-1 flex-col">
      <div class="border-t-1 p-0.5">
        <p class="text-[0.6em]">Tyres:</p>
        <p class="text-[0.6em]">{car.tyres}</p>
      </div>
      <div class="border-t-1 p-0.5">
        <p class="text-[0.6em]">Drivetrain:</p>
        <p class="text-[0.6em]">{car.drivetrain}</p>
      </div>
      <div class="border-t-1 p-0.5">
        <p class="text-[0.6em]">Value:</p>
        <p class="text-[0.6em] flex flex-row gap-0.5 items-center">
          {car.value}<CashOutline size="xs" />
        </p>
      </div>
    </div>
  </div>
</div>
