<script lang="ts">
    import PasswordLoginForm from "$lib/components/auth/PasswordLoginForm.svelte";
    import * as Card from "$lib/components/ui/card";
    import { type LoginSchema } from '$lib/schema';
    import { superForm, type Infer, type SuperValidated} from 'sveltekit-superforms';
	import type { PageData } from "../$types";

    export let data: PageData
</script>
<div class="flex justify-center items-center">
    <Card.Root>
        <Card.Header class="text-center">
            <Card.Title>Login</Card.Title>
            <Card.Description>If you're already registered</Card.Description>
        </Card.Header>
        <Card.Content>
            <PasswordLoginForm data={data.form}></PasswordLoginForm>
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <div>
            <p
              class="mx-4 mb-0 text-center font-semibold">
              OR
            </p>
            <p class="text-muted-foreground">
                You don't have an account?
            </p>
            <p class="text-center">
                <a href="/register">Create one here</a>
            </p>
          </div>
        </Card.Footer>
    </Card.Root>
</div>