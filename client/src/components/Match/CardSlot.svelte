<script>

    const { children = null, onclick = undefined, size = "md" } = $props()

  const sizeClasses = {
    xs: " h-[13.75rem] w-[9.25rem] text-[0.75rem] ",
    sm: " h-[15.875rem] w-[10.625rem] text-[0.875rem] ",
    md: " h-[18rem] w-[12rem] text-[1rem] ",
    lg: " h-[20.125rem] w-[13.375rem] text-[1.125rem] ",
    xl: " h-[22.25rem] w-[14.75rem] text-[1.25rem] ",
  }
</script>
{#if onclick}
  
<button onclick={onclick} class={"flex flex-col bg-[#a4a4a4] rounded-md overflow-hidden items-center justify-center hover:bg-[#8e8e8e]" + sizeClasses[size]}>
    {#if children}
    {@render children()}
    {/if}
</button>
{:else}
<div class={"flex flex-col bg-[#a4a4a4] rounded-md overflow-hidden items-center justify-center" + sizeClasses[size]}>
  {#if children}
  {@render children()}
  {/if}
</div>
{/if}