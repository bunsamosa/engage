<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { AppShell } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<AppShell class="max-w-screen-xl m-auto">
	<svelte:fragment slot="header">
	<NavBar />
	</svelte:fragment>
	<slot />
</AppShell>
