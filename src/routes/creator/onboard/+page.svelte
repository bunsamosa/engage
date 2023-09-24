<script setup lang="ts">
import TwitchCard from "$lib/components/connectors/TwitchCard.svelte";
import LensCard from "$lib/components/connectors/LensCard.svelte";
</script>
<div class="flex flex-col h-full">
    <div class="text-center">
        <div class="p-4 text-4xl font-bold md:text-3xl lg:text-4xl">Welcome to Engage!</div>
        <div class="text-xl mb-8 font-semibold lg:text-2xl sm:px-16 xl:px-48">
            Please connect your social accounts to get started.
        </div>
    </div>

    <div class="flex flex-row flex-wrap overflow-y-scroll justify-center">
        <TwitchCard/>
        <LensCard/>
    </div>
</div>
