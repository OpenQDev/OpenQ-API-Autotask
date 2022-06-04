const axios = require('axios');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const { id } = sentinel;

		const headers = {
			'Authorization': event.secrets.GITHUB_BOT_SECRET
		};

		let baseUrl = null;
		switch (id) {
			case '095908a2-61d2-4692-9225-8cb8585683f7':
				baseUrl = 'https://development.openq.dev';
				break;
			default:
				return reject(new Error('Incorrect Environment'));
		}

		let result = null;
		switch (eventType) {
			case 'BountyCreated': {
				const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = matchReasons[0].params;

				result = await axios.post(`${baseUrl}/api/graphql`, {
					query: `mutation CreateBounty($id: String!) {
						createBounty(tvl: $tvl, contractAddress: $id) {
							tvl
						}
					}`,
					variables: {
						id: bountyId,
					}
				}, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': event.secrets.GITHUB_BOT_SECRET
					}
				});

				return resolve({ bountyId, organization, issuerAddress, bountyAddress, bountyMintTime });
			}
			default: {
				reject(new Error('Unknown Event'));
			}
		}
	});
};

module.exports = main;