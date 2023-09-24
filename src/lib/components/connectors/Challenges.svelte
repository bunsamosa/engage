<script setup lang="ts">
	import { getData } from '$lib/utils/StorageClient';
	import Spinner from '../core/Spinner.svelte';

	// read data from metadat stored on Lens profile
	let cid = localStorage.getItem('creator_metadata');
	let challenges = [];
	let loading = true;

	getData(cid).then((data) => {
		challenges = [...data.challenges];
		loading = false;
	});
</script>

<div
	class="w-96 h-auto m-4 rounded-xl shadow-lg overflow-hidden
        flex flex-col items-center p-2"
>
	<div class="text-xl">Challenges</div>
	{#if loading}
		<Spinner />
	{:else}
		<div class="flex flex-col items-center">
			{#each challenges as challenge}
				<div class="card variant-filled m-2 p-4 w-full">
					<div class="text-xl font-bold">{challenge.name}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
