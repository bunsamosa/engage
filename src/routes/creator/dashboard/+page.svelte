<script setup lang="ts">
	import Membership from "$lib/components/connectors/Membership.svelte";
    import Challenges from "$lib/components/connectors/Challenges.svelte";


</script>
<div class="flex flex-col h-full">
    <div class="text-center">
        <div class="p-4 text-4xl font-bold md:text-3xl lg:text-4xl">Dashboard</div>
    </div>

    <div class="flex flex-row flex-wrap overflow-y-scroll justify-center">
        <Membership/>
        <Challenges/>
    </div>
</div>
