import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({cookies}) => {
    const number_of_voters = cookies.get('number_of_voters')
    const tally_results = cookies.get('tally_results')
    const vote_status = cookies.get('vote_status')
    const choice = cookies.get('choice')
    return {
        "number_of_voters":number_of_voters,
        "tally_results":tally_results,
        "vote_status":vote_status,
        "choice":choice
    };
}) satisfies PageServerLoad;

async function send_vote(vote:number, sessionKey:string|undefined){
    const URL="http://127.0.0.1:8000/polls/votes/"
    let answer=200
    //Sending sessionKey cookie to Django backend
    await fetch(URL,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionKey: sessionKey,
                vote: vote
            })
            })
            .then(response =>{
                answer=response.status
                if (!response.ok){
                    throw new Error("Django can't see the session key")
                }
                console.log('Success: ' +response.status)
                return response.text()  //Response is not JSON due to Django blackbox reasons. 
            })
            .then(data => {
                console.log("This is data:" +data)
            })
            .catch(error =>{
                answer=error.message
                console.error('There was a problem with the vote POST request', error)
            });
        return answer
}


export const actions: Actions = {
    cats: async ({request, cookies}) => {
        const sessionKey = cookies.get('sessionKey')
        console.log(sessionKey)
        let status=await send_vote(1, sessionKey)
        
        if (status===201){
            cookies.set("choice", "cats", {path : "/",})
            cookies.set("vote_status", "Vote successful!", {path : "/",})
        }
        else{
            cookies.set("vote_status", "You are either not logged in, or already voted!", {path : "/",})
        }
        
    },
    dogs: async ({request, cookies}) => {
        const sessionKey = cookies.get('sessionKey')
        console.log(sessionKey)
        let status=await send_vote(0, sessionKey)
        
        if (status===201){
            cookies.set("choice", "dogs", {path : "/",})
            cookies.set("vote_status", "Vote successful!", {path : "/",})
        }
        else{
            cookies.set("vote_status", "You are either not logged in, or already voted!", {path : "/",})
        }
        
    },
    tally: async ({request, cookies}) => {
        const URL="http://127.0.0.1:8000/polls/votes/results/"
        let response_body = {}
        await fetch(URL,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
                })
                .then(response =>{
                    if (!response.ok){
                        throw new Error("Django can't see the session key")
                    }
                    console.log('Success: ' +response.status)
                    return response.text()  //Response is not JSON due to Django blackbox reasons. 
                })
                .then(data => {
                    response_body=JSON.parse(data)
                    console.log("This is data:" +data)
                })
                .catch(error =>{
                    console.error('There was a problem with the login request', error)
                });
        if (response_body){
            cookies.set("vote_status", "", {path : "/",})
            cookies.set("number_of_voters", response_body.number_of_voters, {path : "/",})
            cookies.set("tally_results", response_body.vote_results, {path : "/",})
        }
        
    }
}