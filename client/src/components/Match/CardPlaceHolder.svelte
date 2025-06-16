<script>
  const { size = "md" } = $props();

  const sizeClasses = {
    xs: " h-[12.75rem] w-[8.25rem] text-[0.75rem] ",
    sm: " h-[14.875rem] w-[9.625rem] text-[0.875rem] ",
    md: " h-[17rem] w-[11rem] text-[1rem] ",
    lg: " h-[19.125rem] w-[12.375rem] text-[1.125rem] ",
    xl: " h-[21.25rem] w-[13.75rem] text-[1.25rem] ",
  };
</script>

<div
  class={"flex flex-col justify-between items-center bg-white border border-gray-300 rounded-md shadow-xl/30 overflow-hidden" +
    sizeClasses[size]}
>
  <p class="text-[1.8em] font-semibold mt-[0.5em]">CarCards</p>


  <img
    src="/sport-car.png"
    alt="Sports car"
    class="object-contain w-full px-[1em]"
    draggable="false"
  />

  <p class="text-[1.8em] font-semibold mb-[0.5em] rotate-180">CarCards</p>
</div>
