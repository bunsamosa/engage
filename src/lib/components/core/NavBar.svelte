<script setup lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { connected, login, logout } from '$lib/utils/WalletConnect';
</script>

<AppBar background="">
	<svelte:fragment slot="lead">
		<a href="/" class="text-2xl font-semibold">Engage</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $connected}
			<button class="px-1" on:click={logout}> Logout </button>
		{:else}
			<button class="px-1" on:click={login}> Login </button>
		{/if}
	</svelte:fragment>
</AppBar>
