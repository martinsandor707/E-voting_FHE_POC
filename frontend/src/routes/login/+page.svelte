<script lang="ts">
    import type { PageData } from './$types';
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import Input from "$lib/components/ui/input/input.svelte";
    
    export let data: PageData;
</script>
<div class="flex justify-center items-center">
    <Card.Root>
        <Card.Header class="text-center">
            <Card.Title>Login</Card.Title>
            <Card.Description>If you're already registered</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="GET" class="grid gap-y-4">
                <Input
                    name="email"
                    autocomplete="off"
                    type="email"
                    placeholder="E-mail"
                    required
                />
                <Input
                    name="password"
                    autocomplete="off"
                    type="password"
                    placeholder="Password"
                    required
                />
                <Button>Sign in</Button>
            </form>
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