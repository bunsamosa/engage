<script lang="ts">
import {onMount} from 'svelte';
import {authenticate} from '$lib/utils/TwitchClient';

onMount(() => {
    authenticate();
});
</script>
<div>

</div>
