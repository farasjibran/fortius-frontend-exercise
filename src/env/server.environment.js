// eslint-disable-next-line @typescript-eslint/no-var-requires
const { serverSchema } = require('./schema.environment');

const serverEnvironment = serverSchema.parse({
	API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

module.exports = {
	serverEnv: serverEnvironment,
};
