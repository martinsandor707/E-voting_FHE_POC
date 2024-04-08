import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({cookies}) => {
    const sessionKey = cookies.get('sessionKey')
    const email = cookies.get('email')
    let answer
    return {
        "sessionKey":sessionKey,
        "answer":email
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({request, cookies}) => {
        const sessionKey = cookies.get('sessionKey')
        console.log(sessionKey)

        const URL="http://127.0.0.1:8000/polls/token_test/"
        let answer=""
        //Sending sessionKey cookie to Django backend
        await fetch(URL,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionKey: sessionKey
            })
            })
            .then(response =>{
                if (!response.ok){
                    throw new Error("Django can't see the session key")
                }
                console.log('Success: ' +response.status)
                return response.text()  //Response is not JSON due to Django blackbox reasons. 
            })
            .then(data => {
                console.log("This is data:" +data)
                answer=JSON.parse(data).answer
            })
            .catch(error =>{
                console.error('There was a problem with the login request', error)
            });

            cookies.set("email", answer, {path : "/votes",})
    }
}