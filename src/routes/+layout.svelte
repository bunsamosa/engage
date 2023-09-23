<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell class="max-w-screen-xl m-auto">
	<svelte:fragment slot="header">
		<AppBar background="">
			<svelte:fragment slot="lead">
				<a href="/" class="text-2xl font-semibold">Engage.gg</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="" target="_blank" class="px-1"> Login </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
