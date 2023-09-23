<script setup lang="ts">
	import { login, connected } from '$lib/utils/WalletConnect';
</script>

<div class="h-screen flex flex-col w-full text-center py-8 px-4 lg:py-16 lg:px-12">
	<div class="m-auto items-center">
		<div class="p-4 text-4xl font-bold md:text-5xl lg:text-6xl">
			Supercharge your fan interactions
		</div>
		<div class="text-xl mb-8 font-semibold lg:text-2xl sm:px-16 xl:px-48">
			Reward your loyal fanbase with exclusive NFTs and experiences
		</div>
		<div
			class="flex flex-col mb-8 lg:mb-32 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
		>
			<button
				type="button"
				class="btn py-3 px-7 rounded-xl variant-filled-primary"
				on:click={login}
			>
				Get Started
			</button>
			<!-- <button type="button" class="btn py-3 px-5 rounded-xl variant-ringed-secondary">
				Learn more
			</button> -->
		</div>
		<dl class="grid max-w-screen-sm mx-auto sm:grid-cols-3">
			<div class="flex flex-col items-center justify-center">
				<dt class="mb-2 text-3xl md:text-4xl font-bold copy-gradient">14</dt>
				<dd class="text-gray-400">Streamers online</dd>
			</div>
			<div class="flex flex-col items-center justify-center">
				<dt class="mb-2 text-3xl md:text-4xl font-bold copy-gradient">3156</dt>
				<dd class="text-gray-400">NFTs dropped</dd>
			</div>
			<div class="flex flex-col items-center justify-center">
				<dt class="mb-2 text-3xl md:text-4xl font-bold copy-gradient">134567</dt>
				<dd class="font-semi-bold text-gray-400">Fans online</dd>
			</div>
		</dl>
	</div>
</div>
