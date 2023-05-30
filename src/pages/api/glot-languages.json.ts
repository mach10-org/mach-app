import GlotAPI from 'glot-api';
const token = 'f2c16827-22c0-4cdf-8bec-5b3ee5c4eb37'; // If you are logged in you will find your token here:  https://glot.io/account/token
const glot = new GlotAPI(token);
import type { APIRoute } from 'astro';

/*
export async function getLangvuages({ params, request }) {
  const response = await glot.languages({ limit: 200 }); // handle pagination automatically

  return {
    body: JSON.stringify(response)
  };
}
*/

export const get: APIRoute = async function get() {
  try {
    const response = await glot.languages({ limit: 200 }); // handle pagination automatically

    return {
      body: JSON.stringify(response)
    };
  } catch (error: unknown) {
    throw new Error(`Something went wrong in pdf-resource.pdf route!: ${error as string}`);
  }
};
