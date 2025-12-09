import { NextRouter } from 'next/router';

/**
 * Reloads the current page by navigating to the current route.
 * This forces a full page reload which refreshes all data and resets React state.
 *
 * @param router - Next.js router instance
 */
export const reloadPage = (router: NextRouter): void => {
  const currentPath =
    router.asPath.trim() !== '' ? router.asPath : window.location.pathname;
  window.location.href = currentPath;
};
