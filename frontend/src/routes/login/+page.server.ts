import type { PageServerLoad, Actions } from "./$types.js";
import { fail, message, superValidate } from "sveltekit-superforms";
import { loginSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";


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

        const URL="http://127.0.0.1:8000/polls/login/"
        let responseStatus=200
        let errorMessage=''
        let sessionKey={}
        //Sending login request to Django backend
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
                sessionKey=JSON.parse(data)
            })
            .catch(error =>{
                console.error('There was a problem with the login request', error)
            });

        if (responseStatus===200){
            console.log(sessionKey)
            cookies.set("sessionKey", sessionKey.sessionKey, {path : "/"})
        }
        else{
            console.error('An error occurred!\nError code: '+responseStatus)
            switch(responseStatus){
                case 400:
                case 404:
                    errorMessage='Incorrect credentials'
                    break
                default:
                    errorMessage='Something unexpected happened'
            }
        }
        if (responseStatus===200){
            let username= form.data.email.split('@')[0]
            cookies.set("user", username, {path : "/"})
        }
        else{
            return message(form, errorMessage)
        }
        return {form,}

    },
};