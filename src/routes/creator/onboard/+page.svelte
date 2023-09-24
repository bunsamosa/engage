<script setup lang="ts">
	import TwitchCard from '$lib/components/connectors/TwitchCard.svelte';
	import LensCard from '$lib/components/connectors/LensCard.svelte';
	import TwitterCard from '$lib/components/connectors/TwitterCard.svelte';
	import { uploadData, getData } from '$lib/utils/StorageClient';
	import { updateMetadata } from '$lib/utils/LensConnect';
	import Spinner from '$lib/components/core/Spinner.svelte';
	import { uuid } from 'uuidv4';

	let loading = false;
	async function saveData() {
		loading = true;
		let data = [
			{
				key: 'lens_handle',
				value: localStorage.getItem('lens_handle') || ''
			},
			{
				key: 'twitch_display_name',
				value: localStorage.getItem('twitch_display_name') || ''
			},
			{
				key: 'twitch_id',
				value: localStorage.getItem('twitch_id') || ''
			},
			{
				key: 'twitter_handle',
				value: localStorage.getItem('twitter_handle') || ''
			},
			{
				key: 'lens_profile_id',
				value: localStorage.getItem('lens_profile_id') || ''
			}
		];
		let metadata = {
			name: localStorage.getItem('twitch_display_name') || '',
			bio: '',
			cover_picture: '',
			attributes: data,
			version: '1.0.0',
			metadata_id: uuid(),
			profile_picture:
				'https://www.wallpaperup.com/uploads/wallpapers/2013/03/24/60099/756a8618a516f770b26eedd0fb5783ad.jpg',
			challenges: [
				{
					name: 'Streams viewed: Monthly streak',
					lock: '0xdc33c092816a96aab0eb77d3ff8a8e1680fba2e4'
				},
				{
					name: 'Gift 5 Twitch subscriptions',
					lock: '0xb82d59afb49cf3783c4d27e8f43023057eaf4063'
				},
				{
					name: 'Streams viewed: Weekly streak',
					lock: '0xb15e7fc38aab34c4e8e1f541346bc9496ceaa108'
				},
				{
					name: 'Follow me on 5 social platforms',
					lock: null
				}
			]
		};
		const cid = await uploadData(metadata);
		console.log(cid);
		localStorage.setItem('creator_metadata', cid);
		await updateMetadata(cid);
		loading = false;
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
		<TwitchCard />
		<LensCard />
		<TwitterCard />
	</div>
	<div class="m-auto">
		{#if loading}
			<Spinner />
		{:else}
			<button class="btn variant-filled m-2 font-bold" on:click={saveData}>Save</button>
		{/if}
	</div>
</div>
