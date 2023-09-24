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
			<a href="/subscriber" class="px-2">Subscriber</a>
			<a href="/creator/onboard" class="px-2">Onboard</a>
			<a href="/creator/dashboard" class="px-2">Dashboard</a>
			<button class="px-1" on:click={logout}> Logout </button>
		{:else}
			<button class="px-1" on:click={login}> Login </button>
		{/if}
	</svelte:fragment>
</AppBar>
