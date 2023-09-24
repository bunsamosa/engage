import { Web3Storage } from 'web3.storage';

const ipfs_api_token = import.meta.env.VITE_IPFS_API_TOKEN;
const client = new Web3Storage({ token: ipfs_api_token });

// upload JSON data to ipfs
async function uploadData(data) {
    // convert JSON data to file
    const content = JSON.stringify(data);
    const blob = new Blob([content], { type: 'application/json' });
    const files = [
        new File([blob], 'data.json', { type: 'application/json' })
    ];
    const cid = await client.put(files);
    console.log('stored files with cid:', cid);
    return cid;
}

// read JSON data from ipfs
async function getData(cid) {
    const res = await client.get(cid);
    const files = await res.files();
    const json = await files[0].text();
    return JSON.parse(json);
}

export {uploadData, getData};
