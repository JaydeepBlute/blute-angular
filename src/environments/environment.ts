// environment.ts — runtime configuration for the Blute site.
// The Payload CMS instance is the same in dev and prod, so no file replacement is needed.
export const environment = {
  production: false,

  // Payload CMS base URL (no trailing slash).
  payloadBaseUrl: 'https://payload-nine-ivory.vercel.app',

  // Slug of the Payload collection holding LinkedIn posts.
  payloadPostsCollection: 'linkedin-posts',

  // Only documents with this status are shown on the site.
  // The collection's status options are: draft | scheduled | posted.
  payloadPublishedStatus: 'posted',
};
