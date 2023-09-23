import { LensClient, development, isRelayerResult } from '@lens-protocol/client';
import { signMessage } from '@wagmi/core';

// create lens client
const lensClient = new LensClient({
	environment: development
});

// authenticate with lens client
async function authenticate(address) {
	console.log('Authenticating lens client');

	// generate challenge and sign messsage with WAGMI
	const challenge = await lensClient.authentication.generateChallenge(address);
	const signature = await signMessage({ message: challenge });
	await lensClient.authentication.authenticate(address, signature);
	const authenticated = await lensClient.authentication.isAuthenticated();

	return authenticated;
}

// fetch lens profile
async function fetchProfile(address) {
	console.log('Fetching profile for address: ', address);
	const allOwnedProfiles = await lensClient.profile.fetchAll({
		ownedBy: [address],
		limit: 1
	});

	// defaultProfile is a ProfileFragment
	const defaultProfile = allOwnedProfiles.items[0];
	return defaultProfile;
}

// create profile
async function createProfile(address, handle, name) {
	console.log('Creating profile for address: ', address);
	let lenshandle = handle + Math.floor(Math.random() * 100);
	const profileCreateResult = await lensClient.profile.create({
		handle: lenshandle.toLowerCase()
		// other request args
	});

	// profileCreateResult is a Result object
	const profileCreateResultValue = profileCreateResult.unwrap();

	if (!isRelayerResult(profileCreateResultValue)) {
		console.log(`Something went wrong`, profileCreateResultValue);
		return;
	}

	console.log(`Transaction was successfuly broadcasted with txId ${profileCreateResultValue.txId}`);
}

export { authenticate, fetchProfile, createProfile };
