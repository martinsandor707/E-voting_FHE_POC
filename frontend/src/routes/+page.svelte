<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
     
    export let data


</script>
<div class="grid grid-cols-6 gap-8">
    <div></div>
    <Card.Root class="col-span-2 hover:border-green-500">
        <Card.Header>
            {#if data.user}
                <Card.Title>Hello, {data.user}!</Card.Title>
            {:else}
                <Card.Title>What do you want to showcase?</Card.Title>
            {/if}
        </Card.Header>
        <Card.Content>
            <p>Modern e-voting schemes almost always have at least one thing in common: 
            the usage of homomorphic encryption! This special kind of encryption lets us
            do calculations on encrypted data without ever having to decrypt it first.
            This is extremely useful, since this way we can count the votes without endangering your privacy.
            </p>
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <img src="voting.jpg" alt="Simplistic art depicting a ballot" width=60%>
        </Card.Footer>
    </Card.Root>
<Card.Root class="col-span-2 hover:border-green-500">
    <Card.Header>
      <Card.Title>So what now?</Card.Title>
    </Card.Header>
    <Card.Content>
        <p>Mainly two things. You can either</p>
    </Card.Content>
    <Card.Footer class="grid grid-flow gap-y-8 justify-center place-items-center">
        {#if data.user}
            <form action="" method="post">
                <Button type="submit" name="foo" value="bar">Log out</Button>
            </form>
        {:else}
            <a href="/login"><Button>Log in</Button></a>
        {/if}
        <p>or</p>
        <a href="/votes"><Button>Check the votes</Button></a>
    </Card.Footer>
</Card.Root>
<div></div>
</div>
