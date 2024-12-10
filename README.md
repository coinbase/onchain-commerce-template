# Onchain Commerce Template

<img width="1200" alt="Thumbnail (1)" src="https://github.com/user-attachments/assets/e1f513ea-d1ac-4baf-908e-35b0456d5565">

An Onchain Commerce Template built with [OnchainKit](https://onchainkit.xyz), and ready to be deployed to Vercel.

Play with it live on https://onchain-commerce-template.vercel.app/

Have fun! ⛵️

<br />

## Setup

To ensure all components work seamlessly, set the following environment variables in your `.env` file using `.local.env.example` as a reference.

You can find the API key on the [Coinbase Developer Portal's OnchainKit page](https://portal.cdp.coinbase.com/products/onchainkit). If you don't have an account, you will need to create one. 

You can find your Coinbase Commerce API key on [Coinbase Commerce](https://beta.commerce.coinbase.com/). If you don't have an account, you will need to create one. 

```sh
# See https://portal.cdp.coinbase.com/products/onchainkit
NEXT_PUBLIC_ONCHAINKIT_API_KEY="GET_FROM_COINBASE_DEVELOPER_PLATFORM"

# See https://beta.commerce.coinbase.com/
COINBASE_COMMERCE_API_KEY="GET_FROM_COINBASE_COMMERCE"
```
<br />

## Enabling checkout

By default, the checkout functionality is disabled to prevent transactions in non-production environments. To enable the checkout flow for local development, you need to uncomment the code found in the `OnchainStoreCart.tsx` component, along with the imports at the top of the file.

You can also remove the `OnchainStoreModal` component and logic as well as the `MockCheckoutButton` as these were created for demo purposes only. 

Next, you'll want to replace `products` in the `OnchainStoreProvider` with your own product items. 


>This template showcases a multi-product checkout implementation of our `Checkout` component using the `chargeHandler` approach. You can read more about this implementation in the Advanced Usage section of our `Checkout` component docs here: https://onchainkit.xyz/checkout/checkout


<br />

## Running locally



```sh
# Install bun in case you don't have it
bun curl -fsSL <https://bun.sh/install> | bash

# Install packages
bun i

# Run Next app
bun run dev
```
<br />

## Resources

- [OnchainKit documentation](https://onchainkit.xyz)

<br />

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
