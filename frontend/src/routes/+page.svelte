<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card";
</script>
<Card.Root>
    <Card.Header>
      <Card.Title>What do you want to showcase?</Card.Title>
    </Card.Header>
    <Card.Content>
        <p class="w-96">Modern e-voting schemes almost always have at least one thing in common: 
        the usage of homomorphic encryption! This special kind of encryption lets us
        do calculations on encrypted data without ever having to decrypt it first.
        This is extremely useful, since this way we can count the votes without endangering your privacy.
        </p>
    </Card.Content>
    <Card.Footer>
        <a href="/votes"><img src="voting.jpg" alt="Simplistic art depicting a ballot" width=50%></a>
    </Card.Footer>
</Card.Root>
