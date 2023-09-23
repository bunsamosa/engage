<script lang="ts">
	import { address } from '$lib/utils/WalletConnect';
	import { authenticate, fetchProfile, createProfile } from '$lib/utils/LensConnect';
	import Spinner from '$lib/components/Spinner.svelte';

	const displayName = localStorage.getItem('twitch_display_name');
	const handle = localStorage.getItem('twitch_handle');
	let loading = false;
	let profileData = null;

	async function createLens() {
		const userAddress = $address;
		loading = true;
		await authenticate(userAddress);

		let userProfile = await fetchProfile(userAddress);
		if (userProfile == null) {
			await createProfile(userAddress, displayName, handle);
		}
	}
</script>

<div class="h-screen flex flex-col w-full text-center items-center">
	<div class="p-4 text-4xl font-bold md:text-3xl lg:text-4xl">
		Welcome {displayName}!
	</div>
	<div class="text-xl mb-8 font-semibold lg:text-2xl sm:px-16 xl:px-48">
		We are setting up your lens account.
	</div>
	<div class="flex-1">
		<div class="m-auto card w-80 h-96 flex flex-col">
			<div class="m-auto">
				{#if !loading && profileData === null}
					<button class="btn variant-filled" on:click={createLens}>Connect</button>
				{:else if profileData != null}
					<h3 class="p-4">Connected to {localStorage.getItem('twitch_display_name')}!</h3>
					<button class="btn variant-filled">Continue</button>
				{:else}
					<Spinner />
				{/if}
			</div>
		</div>
	</div>
</div>
