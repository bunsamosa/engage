<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div
	class="card w-72 h-72 m-4 rounded-xl shadow-lg overflow-hidden
        variant-filled flex flex-col items-center p-2"
>
	<Avatar src="/images/twitter_logo.png" width="w-32" rounded="none" background="none" />
	<div class="p-3 text-2xl">X</div>
	<h3 class="p-4">Connected to {localStorage.getItem('twitch_display_name')}!</h3>
</div>
