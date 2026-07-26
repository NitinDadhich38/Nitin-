/**
 * STATIC BRANCH — runtime configuration hooks.
 *
 * The static export has no server, so anything that previously lived in an API
 * route is pointed at an external service through a global set on the page
 * (see public/config.js in the built site).
 */
export {};

declare global {
  interface Window {
    /**
     * Endpoint the contact form POSTs to (Formspree / Netlify Forms /
     * Web3Forms / any JSON-accepting URL). When unset the form fails softly
     * and shows its existing "email us directly" message.
     */
    PRAN_CONTACT_ENDPOINT?: string;
  }
}
