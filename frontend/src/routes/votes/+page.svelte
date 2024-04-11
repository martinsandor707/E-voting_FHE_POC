<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
    import type { PageData } from './$types';
    
    export let data: PageData;
    console.log(data)
</script>

<div class="grid grid-cols-6 gap-8">
    <div></div>
    <Card.Root class="col-span-2 hover:border-green-500">
        <Card.Header>
          <Card.Title class="text-center">So what now?</Card.Title>
        </Card.Header>
        <Card.Content>
            For the sake of showcasing homomorphic encryption, we will have a simple survey between two choices:
            Let's vote on which species of pets you like more.
            <div class="flex justify-evenly mt-8 ">
                <Card.Footer class="grid grid-flow gap-y-8 justify-center place-items-center">
                    <form action="?/cats" method="post">
                        <Button type="submit" name="foo" value="bar">Cats</Button>
                    </form>
                </Card.Footer>
    
                <Card.Footer class="grid grid-flow gap-y-8 justify-center place-items-center">
                    <form action="?/dogs" method="post">
                        <Button type="submit" name="foo" value="bar">Dogs</Button>
                    </form>
                </Card.Footer>
    
            </div>
            {#if data.vote_status}
                {#if data.vote_status ==="Vote successful!"}
                <p class="text-primary-foreground bg-primary rounded-lg text-center">{data.vote_status} You chose {data.choice}</p>
                {:else}
                <p class="text-destructive-foreground bg-destructive rounded-lg text-center">{data.vote_status}</p>
                {/if}
            {/if}
        </Card.Content>
        <Card.Footer class="grid grid-flow gap-y-8 justify-center place-items-center">
            <form action="?/tally" method="post">
                <Button class="bg-yellow-500 text-black" type="submit" name="foo" value="bar">Tally the votes!</Button>
            </form>
        </Card.Footer>
    </Card.Root>
    
    {#if data.tally_results}
    <Card.Root class="col-span-2 hover:border-green-500">
        <Card.Header>
          <Card.Title class="text-center">Here are the tally results!</Card.Title>
          <Card.Description class="text-center">Naturally only the sum of all the votes is shown, no partial tallies</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>There was a total of {data.number_of_voters} people who took part in the vote, and we have absolutely no idea what their votes were individually!</p>
        </Card.Content>
        <Card.Footer class="grid grid-cols-2 grid-rows-2 grid-flow-col gap-y-8 justify-center place-items-center">
          <p class="text-primary">Cats</p>
          <p>{data.tally_results}</p>
          <p class="text-primary">Dogs</p>
          <p>{Number(data.number_of_voters)-Number(data.tally_results)}</p>
        </Card.Footer>
    </Card.Root>
    {/if}
</div>