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
        console.log(form)
        let username= form.data.email.split('@')[0]
        console.log(username)
        cookies.set("user", username, {path : "/"})
        return {form,}

    },
};