<script lang="ts">
	import { authenticate, fetchProfile } from '$lib/utils/TwitchClient';
	import { page } from '$app/stores';
	import Spinner from '$lib/components/core/Spinner.svelte';
    import { Avatar } from '@skeletonlabs/skeleton';


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
</script>

<div class="card w-72 h-72 m-4 rounded-xl shadow-lg overflow-hidden
        variant-filled flex flex-col items-center p-2"
    >
    <Avatar src="/images/twitch_logo.png" width="w-32" rounded="rounded-full" background="none" />
    <div class="p-3 text-2xl">
        Twitch
    </div>
    {#if !loading && profileData === null}
        <button class="btn variant-filled-primary m-2" on:click={authenticate}>Connect</button>
    {:else if profileData != null}
        <h3 class="p-4">Connected to {localStorage.getItem('twitch_display_name')}!</h3>
    {:else}
        <Spinner />
    {/if}
</div>
