<script lang="ts">
	import Spinner from '$lib/components/core/Spinner.svelte';
	import { loadMemberships } from '$lib/utils/UnlockClient';
	import { address } from '$lib/utils/WalletConnect';
	import { onMount } from 'svelte';

	// fetch membership locks from Unlock
	let memberships = [];
	let loading = false;
	async function loadData() {
		let locks = await loadMemberships($address);
		memberships.push(...locks);
		loading = false;
		console.log(memberships);
	}

	onMount(async () => {
		loading = true;
		await loadData();
	});
</script>

<div
	class="w-72 h-auto m-4 rounded-xl shadow-lg overflow-hidden
        flex flex-col items-center p-2"
>
	{#if loading}
		<div class="m-auto">
			<Spinner />
		</div>
	{:else}
		<div class="text-xl">Memberships</div>
		<div class="flex flex-col items-center">
			{#each memberships as membership}
				<div class="card variant-filled m-2 p-4 w-full">
					<div class="flex flex-row items-end justify-between">
						<div class="text-2xl font-bold">{membership.name}</div>
						<div class="text-xl font-semibold">${membership.price / 1000000}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
