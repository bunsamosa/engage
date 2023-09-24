<script lang="ts">
	import { address } from '$lib/utils/WalletConnect';
	import { authenticate, fetchProfile, createProfile } from '$lib/utils/LensConnect';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Spinner from '$lib/components/core/Spinner.svelte';

	const displayName = localStorage.getItem('twitch_display_name');
	const handle = localStorage.getItem('twitch_login');
	let lens_handle = '';
	let loading = false;
	let userProfile = null;

	async function createLens() {
		const userAddress = $address;
		loading = true;
		await authenticate(userAddress);

		userProfile = await fetchProfile(userAddress);
		if (userProfile == null) {
			lens_handle = await createProfile(userAddress, handle, displayName);
			userProfile = await fetchProfile(userAddress);
			loading = false;
		} else {
			loading = false;
		}
	}
</script>

<div
	class="card w-72 h-72 m-4 rounded-xl shadow-lg overflow-hidden
        variant-filled flex flex-col items-center p-2"
>
	<Avatar src="/images/lens_logo.png" width="w-32" rounded="rounded-full" background="none" />
	<div class="p-3 text-2xl">Lens</div>
	{#if !loading && userProfile === null}
		<button class="btn variant-filled-primary m-2" on:click={createLens}>Connect</button>
	{:else if userProfile != null}
		<h3 class="p-4">Connected to {localStorage.getItem('lens_handle')}!</h3>
	{:else}
		<Spinner />
	{/if}
</div>
