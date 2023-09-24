import { Web3InboxClient } from '@web3inbox/core';
import { getAccount } from '@wagmi/core';
import { signMessage } from '@wagmi/core';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

async function loadInbox() {
	console.log('Loading inbox');
	const client = await Web3InboxClient.init({ projectId: projectId });
	console.log(client);

	let accountState = '';
	let subscriptionState = '';

	const account = await getAccount();
	console.log(account);

	// const nonReactiveMessageState = client.getMessageHistory(address);
	const messages = client.getMessageHistory(account);
	console.log(messages);
}

export { loadInbox };
