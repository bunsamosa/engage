import { readContract } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { PublicLockV13 } from '@unlock-protocol/contracts';
import { Paywall } from '@unlock-protocol/paywall';
import networks from '@unlock-protocol/networks';
import { SubgraphService } from '@unlock-protocol/unlock-js';

// read data only from Goerli
const NETWORK = 5;

// create paywall handler
const paywall = new Paywall(networks);

// load memberships by querying the subgraph
async function loadMemberships(address) {
	const service = new SubgraphService();
	const locks = await service.locks(
		{
			where: {
				lockManagers: [address]
			},
			first: 5
		},
		{
			networks: [NETWORK]
		}
	);
	return locks;
}

// check if the user is a member of any of the locks
function checkMembership(address, lock) {
	let res = 0;
	readContract({
		address: lock,
		abi: PublicLockV13.abi,
		functionName: 'balanceOf',
		chainId: NETWORK,
		args: [address]
	}).then((result) => {
		res = result;
	});
	console.log(res);

	let isMember = res > 0;
	console.log(isMember);
	return isMember;
}

// show paywall modal
async function unlockMembership(lock) {
	const paywall = new Paywall(networks);
	const provider = new InjectedConnector().getProvider();
	await paywall.connect(provider);
	await paywall.loadCheckoutModal({
		locks: {
			[lock]: {
				network: NETWORK
			}
		},
		pessimistic: true
	});
}

export { checkMembership, loadMemberships, unlockMembership };
