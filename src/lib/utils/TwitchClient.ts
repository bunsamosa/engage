import { goto } from '$app/navigation';

const client_id = import.meta.env.VITE_TWITCH_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_TWITCH_REDIRECT_URI;
const twitch_url = import.meta.env.VITE_TWITCH_AUTH_URL;

// authenticate with twitch
async function authenticate() {
	const url =
		twitch_url + `?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
	goto(url);
}

// fetch profile data
const profile_url = import.meta.env.VITE_TWITCH_PROFILE_URL;
async function fetchProfile(token) {
	const response = await fetch(profile_url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Client-ID': client_id
		}
	});
	const data = await response.json();
	localStorage.setItem('twitch_id', data.data[0].id);
	localStorage.setItem('twitch_login', data.data[0].login);
	localStorage.setItem('twitch_display_name', data.data[0].display_name);
	return data;
}
export { authenticate, fetchProfile };
