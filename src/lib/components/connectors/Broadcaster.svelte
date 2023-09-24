<script lang="ts">
	import { loadInbox } from '$lib/utils/InboxClient';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div
	class="card w-72 h-72 m-4 rounded-xl shadow-lg overflow-hidden
        variant-filled flex flex-col items-center p-2"
>
	<Avatar src="/images/lens_logo.png" width="w-32" rounded="rounded-full" background="none" />
	<div class="p-3 text-2xl">Lens</div>
	<button class="btn variant-filled-primary m-2" on:click={loadInbox}>Connect</button>
</div>
