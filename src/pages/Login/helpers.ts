/**
 * Reads the intended destination the user was trying to visit
 * before being redirected to the login page.
 * Falls back to "/" if no destination is stored in router state.
 */
export const getRedirectDestination = (locationState: unknown): string => {
  if (
    locationState &&
    typeof locationState === "object" &&
    "from" in locationState &&
    typeof (locationState as { from: unknown }).from === "string"
  ) {
    return (locationState as { from: string }).from;
  }
  return "/";
};
