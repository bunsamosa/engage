<script setup lang="ts">
import TwitchCard from "$lib/components/connectors/TwitchCard.svelte";
import LensCard from "$lib/components/connectors/LensCard.svelte";
import TwitterCard from "$lib/components/connectors/TwitterCard.svelte";
import {uploadData} from '$lib/utils/StorageClient';
import {updateMetadata} from '$lib/utils/LensConnect';
import Spinner from '$lib/components/core/Spinner.svelte';

let loading = false;
async function saveData() {
    loading = true;
    let data = [
        {
            "key": "lens_handle",
            "value": localStorage.getItem('lens_handle') || "",
        },
        {
            "key": "twitch_display_name",
            "value": localStorage.getItem('twitch_display_name') || "",
        },
        {
            "key": "twitch_id",
            "value": localStorage.getItem('twitch_id') || "",
        },
        {
            "key": "twitter_handle",
            "value": localStorage.getItem('twitter_handle') || "",
        },
        {
            "key": "lens_profile_id",
            "value": localStorage.getItem('lens_profile_id') || "",
        }
];
    console.log(data);
    let attributes = {
        "attributes": data
    };
    const cid = await uploadData(attributes);
    console.log(cid);
    loading = false;
    await updateMetadata(cid);
}
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
        <TwitterCard/>
    </div>
    <div class="m-auto">
        {#if loading}
            <Spinner/>
        {:else}
            <button class="btn variant-filled m-2 font-bold" on:click={saveData}>Save</button>
        {/if}
    </div>
</div>
