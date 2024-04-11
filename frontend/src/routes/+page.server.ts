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

        let all_cookies=cookies.getAll()
        for (let cookie_instance of all_cookies){
            cookies.delete(cookie_instance.name, { path: "/"})
        }
        console.log("Session cookies deleted")
    }
}