// environment.ts — runtime configuration for the Blute site.
// The Payload CMS instance is the same in dev and prod, so no file replacement is needed.
export const environment = {
  production: false,

  // Payload CMS base URL (no trailing slash).
  payloadBaseUrl: 'https://payload-nine-ivory.vercel.app',

  // Slug of the Payload collection holding LinkedIn posts.
  // Change this one line if the collection is named something other than `posts`.
  payloadPostsCollection: 'posts',
};
