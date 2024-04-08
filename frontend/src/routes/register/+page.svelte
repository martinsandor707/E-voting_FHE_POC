<script lang="ts">
  import RegisterForm from "$lib/components/auth/RegisterForm.svelte";
  import * as Card from "$lib/components/ui/card";
  import type { PageData } from "../$types";
  import { superForm } from "sveltekit-superforms/client";

  export let data:PageData
</script>

<div class="flex justify-center items-center">
  <Card.Root>
      <Card.Header class="text-center">
          <Card.Title>Create an account</Card.Title>
          <Card.Description>If you haven't already</Card.Description>
      </Card.Header>
      <Card.Content>
          <RegisterForm data={data.form}></RegisterForm>
      </Card.Content>
      <Card.Footer class="flex justify-center">
          <div>
          <p
            class="mx-4 mb-0 text-center font-semibold">
            OR
          </p>
          <p class="text-center underline">
              <a href="/login">Go back to the login page</a>
          </p>
        </div>
      </Card.Footer>
  </Card.Root>
</div>