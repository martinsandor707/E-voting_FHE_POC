/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
	if (request.url.startsWith('https://localhost:8000/')) {
		request.headers.set('sessionKey', event.request.headers.get('sessionKey'));
	}

	return fetch(request);
}