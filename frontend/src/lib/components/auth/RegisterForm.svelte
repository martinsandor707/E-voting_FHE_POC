<script lang="ts">
    import * as Form  from "$lib/components/ui/form/";
    import Input from "$lib/components/ui/input/input.svelte";
	  import { loginSchema, type LoginSchema } from '$lib/schema';
    import {superForm, type Infer, type SuperValidated} from 'sveltekit-superforms';
    import {zodClient} from 'sveltekit-superforms/adapters';
    import SuperDebug from 'sveltekit-superforms';
    
    export let data: SuperValidated<Infer<LoginSchema>>;

    const form = superForm(data, {
        validators: zodClient(loginSchema)
    })

    const {form: formData, message: myMessage, enhance } = form;
    
</script>

<!--<SuperDebug data={formData}/> -->
<form method="POST" use:enhance>
    {#if $myMessage}
        <p class="text-destructive-foreground bg-destructive rounded-lg mb-4 text-center">{$myMessage}</p>
    {/if}
    <Form.Field class="mb-3" {form} name="email">
      <Form.Control let:attrs>
        <Input 
            placeholder="Email" 
            type="email"
            {...attrs} 
            bind:value={$formData.email} 
        />
        <Form.FieldErrors/>
      </Form.Control>
      </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Input 
            placeholder="Password" 
            type="password"
            {...attrs} 
            bind:value={$formData.password} 
            />
        </Form.Control>
        <Form.FieldErrors/>
    </Form.Field>
    <div class="flex justify-center">
        <Form.Button>Register</Form.Button>
    </div>
  </form>