import { goto } from "$app/navigation";

const client_id = import.meta.env.VITE_TWITCH_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_TWITCH_REDIRECT_URI;
const twitch_url = import.meta.env.VITE_TWITCH_AUTH_URL;


// authenticate with twitch
async function authenticate() {
    const url = twitch_url + `?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
    goto(url);
}


export {authenticate};
