import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { polygon, polygonMumbai } from '@wagmi/core/chains';
import { writable } from 'svelte/store';
import { disconnect, watchAccount } from '@wagmi/core';
import { goto } from '$app/navigation';


// wallet connect setup and modal
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const chains = [polygon, polygonMumbai];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: 'Web3Modal' });
const modal = createWeb3Modal({ wagmiConfig, projectId, chains });

// data stores
const storedAddress = localStorage.getItem('address');
const address = writable(storedAddress || '');
const connected = writable(false);

// open connection modal
async function login() {
    await modal.open();
};

// watch for changes in account
watchAccount(async (account) => {
    if(account.isConnected) {
        connected.set(true);
        address.set(account.address);
        localStorage.setItem('address', account.address);
        console.log('User is connected');
        goto('/creator/onboard');
    } else {
        connected.set(false);
        address.set('');
        localStorage.setItem('address', account.address);
        console.log('User is not connected');
    }
});

// logout the user
async function logout() {
    await disconnect();
};

export { address, connected, logout, login };
