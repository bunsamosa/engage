<script setup lang="ts">
import {fetchTweets} from '$lib/utils/DataConnector';
import Spinner from '$lib/components/core/Spinner.svelte'

let tweets = [];
async function loadData() {
    let data = await fetchTweets("week", 0, 20);
    tweets =[...data];
};
</script>

<div class="flex flex-col w-96">
    {#await loadData()}
        <div><Spinner/></div>
    {:then data}
        {#each tweets as tweet}
        <div class="card w-full variant-filled m-4">
            <div class="flex flex-row justify-between p-2">
                <div>
                    User: {tweet.user_id}
                </div>
                <div class="text-xl font-bold">
                    {tweet.score}
                </div>
            </div>
        </div>
        {/each}
    {/await}
</div>
