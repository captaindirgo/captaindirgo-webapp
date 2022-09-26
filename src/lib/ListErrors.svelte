<script lang="ts">
    import type { CaptainDirgoError} from '$lib/types'
	import { printError } from '$lib/utils'
	export let errors : Array<CaptainDirgoError>;

</script>

{#if errors}
	<ul class="error-messages">
		{#each errors as e}
			<li>{printError(e)}</li>
		{/each}
	</ul>
{/if}
