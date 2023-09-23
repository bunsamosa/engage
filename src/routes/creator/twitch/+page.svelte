<script lang="ts">
	import { authenticate, fetchProfile } from '$lib/utils/TwitchClient';
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import { goto } from '$app/navigation';

	let twitchAuth = null;
	let loading = false;
	let profileData = null;

	// handle redirection from twitch
	const hashParams = new URLSearchParams($page.url.hash.slice(1));
	if (hashParams.has('access_token')) {
		loading = true;
		twitchAuth = hashParams.get('access_token') || null;

		if (twitchAuth !== null) {
			// fetch user name
			profileData = fetchProfile(twitchAuth);
		}
	}

	// move to next page
	function next() {
		goto('/creator/lens');
	}
</script>

<div class="h-screen flex flex-col w-full text-center items-center">
	<div class="p-4 text-4xl font-bold md:text-3xl lg:text-4xl">Welcome to Engage!</div>
	<div class="text-xl mb-8 font-semibold lg:text-2xl sm:px-16 xl:px-48">
		Please connect your Twitch account to get started.
	</div>
	<div class="flex-1">
		<div class="m-auto card w-80 h-96 flex flex-col">
			<div class="m-auto">
				{#if !loading && profileData === null}
					<button class="btn variant-filled" on:click={authenticate}>Connect</button>
				{:else if profileData != null}
					<h3 class="p-4">Connected to {localStorage.getItem('twitch_display_name')}!</h3>
					<button class="btn variant-filled" on:click={next}>Continue</button>
				{:else}
					<Spinner />
				{/if}
			</div>
		</div>
	</div>
</div>
