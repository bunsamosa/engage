const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const notifyApiSecret = process.env.NOTIFY_API_SECRET;

const headers = {
	Authorization: `Bearer ${notifyApiSecret}`
};

// 1. Get the list of subscribers for your project
const subscribersRes = await fetch(`https://notify.walletconnect.com/${projectId}/subscribers`, {
	headers
});
const subscribers = await subscribersRes.json();

// 2. Send a notification to all your subscribers
const body = JSON.stringify({
	accounts: subscribers,
	notification: {
		title: 'GM Hackers!',
		body: 'Enjoy hacking on WalletConnect',
		icon: 'https://avatars.githubusercontent.com/u/37784886?s=48&v=4',
		url: 'https://hackers.gm.walletconnect.com/',
		type: 'promotional'
	}
});

const notifyRes = await fetch(`https://notify.walletconnect.com/${projectId}/notify`, {
	method: 'POST',
	headers,
	body
});
const result = await notifyRes.json();
console.log(result);
