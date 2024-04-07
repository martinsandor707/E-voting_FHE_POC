import type { PageServerLoad, Actions } from "./$types.js";
import { fail, superValidate } from "sveltekit-superforms";
import { loginSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod"


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

        const URL="http://127.0.0.1:8000/polls/login"

        let sessionKey={}
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
                    throw new Error("Network response not OK")
                }
                return response.text()
            })
            .then(data => {
                console.log("This is data:" +data)
                sessionKey=JSON.parse(data)
            })
            .catch(error =>{
                console.error('There was a problem with the login request', error)
            });

        console.log(sessionKey)
        cookies.set("sessionKey", sessionKey.sessionKey, {path : "/"})
        //console.log(form)
        let username= form.data.email.split('@')[0]
        //console.log(username)
        cookies.set("user", username, {path : "/"})
        return {form,}

    },
};