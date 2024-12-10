// Add your API key from Coinbase Commerce
export const COINBASE_COMMERCE_API_KEY =
  process.env.COINBASE_COMMERCE_API_KEY || '';
// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://onchain-commerce-template.vercel.app';
// Add your API KEY from the Coinbase Developer Portal
export const NEXT_PUBLIC_ONCHAINKIT_API_KEY =
  process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '';
