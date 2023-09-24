<script setup lang="ts">
	import { getData } from '$lib/utils/StorageClient';
	import Spinner from '$lib/components/core/Spinner.svelte';
	let creator_cid = localStorage.getItem('creator_metadata');
	import { Avatar } from '@skeletonlabs/skeleton';
	import { checkMembership, unlockMembership } from '$lib/utils/UnlockClient';
	import { address } from '$lib/utils/WalletConnect';

	async function fetchProfile() {
		let creator_profile = await getData(creator_cid);
		console.log(creator_profile);
		return creator_profile;
	}
</script>

<div class="flex flex-col h-full m-auto max-w-3xl">
	{#await fetchProfile()}
		<Spinner />
	{:then creator_profile}
		<div class="flex flex-row items-center justify-around">
			<div>
				<Avatar src={creator_profile.profile_picture} width="w-48" />
			</div>
			<div class="flex flex-col">
				<div class="text-4xl font-bold">
					{creator_profile.name}
				</div>
				<div class="flex flex-row items-center justify-center">
					<div class="m-8">
						<Avatar src="/images/twitch_logo.png" rounded="none" width="w-16" background="none" />
					</div>
					<div class="m-8">
						<Avatar src="/images/lens_logo.png" rounded="none" width="w-16" background="none" />
					</div>
					<div class="m-8">
						<Avatar src="/images/twitter_logo.png" rounded="none" width="w-16" background="none" />
					</div>
				</div>
			</div>
		</div>

		<div class="text-xl font-bold p-2 text-center">Challenges</div>
		<div class="flex flex-col items-center justify-center text-center">
			{#each creator_profile.challenges as challenge}
				{#if challenge.lock == null}
					<div class="card variant-filled m-2 p-4 w-full">
						<div class="text-xl font-bold">{challenge.name}</div>
					</div>
				{:else if checkMembership($address, challenge.lock)}
					<div class="card variant-filled m-2 p-4 w-full">
						<div class="text-xl font-bold">{challenge.name}</div>
					</div>
				{:else}
					<div class="card variant-filled m-2 p-4 w-full">
						<btn
							class="btn variant-filled-primary"
							on:click={() => {
								unlockMembership(challenge.lock);
							}}>Unlock</btn
						>
					</div>
				{/if}
			{/each}
		</div>
	{/await}
</div>
