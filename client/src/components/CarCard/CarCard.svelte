<script>
  import { CashOutline } from "flowbite-svelte-icons";
  import FavoriteButton from "./FavoriteButton.svelte";
  import SellCarButton from "./SellCarButton.svelte";
  import UpgradeButton from "./UpgradeButton.svelte";
  import * as category from "../../utils/carCategory";

  const { car, preview = false, size = "md" } = $props();

  const sizeClasses = {
    xs: " h-[12.75rem] w-[8.25rem] text-[0.75rem] ",
    sm: " h-[14.875rem] w-[9.625rem] text-[0.875rem] ",
    md: " h-[17rem] w-[11rem] text-[1rem] ",
    lg: " h-[19.125rem] w-[12.375rem] text-[1.125rem] ",
    xl: " h-[21.25rem] w-[13.75rem] text-[1.25rem] ",
  };

  const cardColors = {
    pp00_39: {
      topBar: " bg-neutral-300 ",
      sideBar: " bg-neutral-50 border-l-1 ",
      mainBody: " bg-neutral-50 ",
      bottom: " bg-neutral-200 ",
    },
    pp40_59: {
      topBar: " bg-lime-300 ",
      sideBar: " bg-neutral-50 border-l-1 ",
      mainBody: " bg-neutral-50 ",
      bottom: " bg-neutral-200 ",
    },
    pp60_79: {
      topBar: " bg-red-600 ",
      sideBar: " bg-neutral-50 border-l-1 ",
      mainBody: " bg-neutral-800 text-white ",
      bottom: " bg-neutral-600 text-white ",
    },
    pp80_89: {
      topBar: " bg-violet-700 text-white ",
      sideBar: " bg-teal-200 ",
      mainBody: " bg-neutral-800 text-white ",
      bottom: " bg-teal-400 ",
    },
    pp90_100: {
      topBar: " bg-amber-300 ",
      sideBar: " bg-cyan-500 ",
      mainBody: " bg-cyan-300 ",
      bottom: " bg-amber-300 ",
    },
  };

  let cardColor = $derived(() => {
    if (category.isLegendary(car)) return cardColors.pp90_100;
    else if (category.isSuper(car)) return cardColors.pp80_89;
    else if (category.isRare(car)) return cardColors.pp60_79;
    else if (category.isUncommon(car)) return cardColors.pp40_59;
    else if (category.isCommon(car))return cardColors.pp00_39;
  });
</script>

<div
  class={"flex flex-col shadow-xl/30 rounded-md overflow-hidden" +
    sizeClasses[size]}
>
  <div class={"flex flex-1 items-center" + cardColor().topBar}>
    <p class="text-[0.9em] font-bold mx-[0.5em]">{car.brand_name + " " + car.user_car_id}</p>
  </div>
  <div class="flex flex-6">
    <div class={"flex flex-col flex-7 " + cardColor().mainBody}>
      <div class="flex flex-col flex-1 text-[0.9em] items-start">
        <p class="font-semibold mx-[0.5em] my-[0.25em] break-words text-left">
          {car.model_name}
        </p>
      </div>
      <div class="flex flex-row items-end justify-between">
        <p
          class="text-[0.9em] font-semibold mx-[0.5em] my-[0.25em] break-words max-w-[70%] text-left"
        >
          {car.country_name}
        </p>

        <p
          class="text-[0.8em] bold font-semibold whitespace-nowrap bg-amber-200 text-black px-1 py-0.5 rounded m-[0.25em]"
        >
          {car.pp} PP
        </p>
      </div>
    </div>
    <div class={"flex flex-col px-[0.05em] flex-1" + cardColor().sideBar}>
      {#if !preview}
        <FavoriteButton class="size-full" {car} />
        <UpgradeButton class="size-full" {car} />
        <SellCarButton class="size-full" {car} />
      {/if}
    </div>
  </div>
  <div class={"flex flex-4" + cardColor().bottom}>
    <div class="flex-1 flex-col">
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">Topspeed:</p>
        <p class="text-[0.6em]">{car.top_speed} km/h</p>
      </div>
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">0-100 km/h:</p>
        <p class="text-[0.6em]">{car.accel_0_to_100 / 100} sec.</p>
      </div>
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">Handling:</p>
        <p class="text-[0.6em]">{car.handling}</p>
      </div>
    </div>
    <div class="flex-1 flex-col">
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">Tyres:</p>
        <p class="text-[0.6em]">{car.tyres}</p>
      </div>
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">Drivetrain:</p>
        <p class="text-[0.6em]">{car.drivetrain}</p>
      </div>
      <div class="border-t-1 py-[0.125em] px-[0.25em] justify-items-start">
        <p class="text-[0.6em]">Value:</p>
        <p class="text-[0.6em] flex flex-row gap-[0.25em] items-center">
          {car.value}<CashOutline class="h-[1.25em] w-[1.25em]" />
        </p>
      </div>
    </div>
  </div>
</div>
