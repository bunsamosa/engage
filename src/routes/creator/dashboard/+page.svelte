<script setup lang="ts">
	import Membership from '$lib/components/connectors/Membership.svelte';
	import Challenges from '$lib/components/connectors/Challenges.svelte';
	import Spinner from '$lib/components/core/Spinner.svelte';
	import Stats from '$lib/components/connectors/Stats.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	let creator_cid = localStorage.getItem('creator_metadata');
	import { getData } from '$lib/utils/StorageClient';

	async function fetchProfile() {
		if(creator_cid == null) {
			alert("Failed to load data, Please try again");
			return;
		};
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

		<div class="text-xl font-bold p-2 text-center">Dashboard</div>
		<Stats />
		<div class="flex flex-row flex-wrap overflow-y-scroll justify-around">
			<Membership />
			<Challenges />
		</div>
	{/await}
</div>

<!-- <div class="flex flex-col h-full">
	<div class="max-w-3xl m-auto">
		<div class="text-center">
			<div class="p-4 text-4xl font-bold md:text-3xl lg:text-4xl">Dashboard</div>
		</div>
			<Stats/>
		<div class="flex flex-row flex-wrap overflow-y-scroll justify-around">
			<Membership />
			<Challenges />
		</div>
	</div>
</div> -->
