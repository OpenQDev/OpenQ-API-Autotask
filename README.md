# OpenQ-OZ-Claim-Autotask

Add your admin API_KEY and API_SECRET to your .env file

DEVELOPMENT
```bash
defender-autotask update-code <AUTOTASK_ID_DEVELOPMENT> .
```

STAGING
```bash
defender-autotask update-code <AUTOTASK_ID_STAGING> .
```

PRODUCTION
```bash
defender-autotask update-code <AUTOTASK_ID_PRODUCTION> .
```

Running Locally

Due to body size limits on OZ tasks, the following dev deps are only needed for local development, but cannot be included in the `node_modules/` folder at the time of pushing code.

Remove them before push to remote.

```json
	"devDependencies": {
		"axios-mock-adapter": "^1.20.0",
		"dotenv": "^14.3.2",
		"ethers": "5.4.1",
		"express": "^4.17.2",
		"nodemon": "^2.0.15",
		"defender-relay-client": "1.11.1",
		"jest": "^27.4.7",
		"eslint": "^8.13.0",
		"eslint-plugin-unused-imports": "^2.0.0"
	}
```