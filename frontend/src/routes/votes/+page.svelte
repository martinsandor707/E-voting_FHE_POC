<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import type { PageData } from './$types';
    
    export let data: PageData;
    console.log(data)
</script>

<Card.Root class="col-span-2 hover:border-green-500">
    <Card.Header>
      <Card.Title>So what now?</Card.Title>
    </Card.Header>
    <Card.Content>
        {#if data.answer}
        <p class="text-destructive-foreground bg-destructive">Your email is {data.answer}</p>
        {/if}
        {#if data.sessionKey}
        <p class="text-primary-foreground bg-primary">{data.sessionKey}</p>
        {/if}
    </Card.Content>
    <Card.Footer class="grid grid-flow gap-y-8 justify-center place-items-center">
        <form action="" method="post">
            <Button type="submit" name="foo" value="bar">Click me!</Button>
        </form>
    </Card.Footer>
</Card.Root>