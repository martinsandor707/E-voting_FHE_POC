import type { PageServerLoad } from './$types';

export const load = (async ({cookies}) => {
    const user = cookies.get('user')
    return {
        user: user
    };
}) satisfies PageServerLoad;