import type { PageServerLoad, Actions } from "./$types.js";
import { fail, message, superValidate } from "sveltekit-superforms";
import { loginSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema))
      }
};

export const actions: Actions = {
    default: async ({request, cookies}) => {
        const form = await superValidate(request, zod(loginSchema))
        if (!form.valid) {
            return fail(400, { form, })
        }

        const URL="http://127.0.0.1:8000/polls/users/"
        let responseStatus=200
        let errorMessage=''
        //Sending register request to Django backend
        await fetch(URL,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: form.data.email,
                password: form.data.password,
            })
            })
            .then(response =>{
                if (!response.ok){
                    responseStatus=response.status
                    throw new Error("Network response not OK")
                }
                console.log('Success: ' +response.status)
                return response.text()  //Response is not JSON due to Django blackbox reasons. 
            })
            .then(data => {
                console.log("This is data:" +data)
            })
            .catch(error =>{
                console.error('There was a problem with the login request', error)
            });

        if (responseStatus!==200){
            console.error('An error occurred!\nError code: '+responseStatus)
            switch(responseStatus){
                case 406:
                    errorMessage='User already exists'
                    return message(form, errorMessage)
            }
        }
        else{
            redirect(307,'/')
        }

    },
};