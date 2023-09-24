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
	localStorage.setItem('lens_handle', defaultProfile.handle);
	localStorage.setItem('lens_profile_id', defaultProfile.id)
	return defaultProfile;
}

// create profile
async function createProfile(address, handle, name) {
	console.log('Creating profile for address: ', address);
	let lenshandle = handle + Math.floor(Math.random() * 100);
	const profileCreateResult = await lensClient.profile.create({
		handle: lenshandle.toLowerCase(),
		// other request args
	});

	// profileCreateResult is a Result object
	const profileCreateResultValue = profileCreateResult.unwrap();

	if (!isRelayerResult(profileCreateResultValue)) {
		console.log(`Something went wrong`, profileCreateResultValue);
		return null;
	}

	console.log(`Transaction was successfuly broadcasted with txId ${profileCreateResultValue.txId}`);
	localStorage.setItem('lens_handle', lenshandle);
	return lenshandle;
}

// update metadata using IPFS cid
async function updateMetadata(cid) {
	const url = "https://ipfs.io/ipfs/" + cid;
	let lens_profile_id = localStorage.getItem('lens_profile_id');
	const typedDataResult = await lensClient.profile.createSetProfileMetadataTypedData({
		metadata: url,
		profileId: lens_profile_id,
	});
	console.log("Uploaded metadata: ", typedDataResult)
}

export { authenticate, fetchProfile, createProfile, updateMetadata };
