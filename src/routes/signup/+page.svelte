<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SignupRequest, SignupResponse } from '$lib/types';
	import { post, setSession } from '$lib/utils';
	import ListErrors from '$lib/ListErrors.svelte';

	let username = '';
	let email = '';
	let password = '';
	let errors : any = null;

	async function submit(event: any) {
		console.log(`submit called`)

		const req : SignupRequest = { username : username, email : email, password : password}
 		const response : SignupResponse = await post(`api/signup`, req);

		// TODO handle network errors
		errors = response.errors;

		if (response.user) {
			setSession(response.user)
			goto('/');
		}
   	}
</script>

<svelte:head>
	<title>Sign up • Captain Dirgo</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="captain-dirgo-style">Sign up</h1>
				<p class="text-xs-center">
					<a class="captain-dirgo-style" href="/login">Have an account?</a>
				</p>

				<ListErrors {errors} />

				<form on:submit|preventDefault={submit}>
						<div class="basic-form">
							<input
								class="form-control form-control-lg"
								type="text"
								required
								placeholder="Username"
								autocomplete="name"
								bind:value={username}
							/>
							<input
								class="form-control form-control-lg"
								type="email"
								required
								placeholder="Email"
								autocomplete="email"
								bind:value={email}
							/>
							<input
								class="form-control form-control-lg"
								type="password"
								required
								placeholder="Password"
								autocomplete="new-password"
								bind:value={password}
							/>
						</div>
						<button class="captain-dirgo-style"> Sign up </button>
				</form>
			</div>
		</div>
	</div>
</div>
