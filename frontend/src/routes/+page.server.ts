import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({cookies}) => {
    const user = cookies.get('user')
    return {
        user: user
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({request, cookies}) => {
        console.log("Logout Button pressed")

        cookies.delete("sessionKey", { path: "/"})
        cookies.delete("user", { path: "/"})

        console.log("Session cookies deleted")
    }
}