/**
 * Global feature/config flags.
 *
 * USE_MOCK_DATA gates all mock fixtures (MOCK_USERS, MOCK_CONNECTIONS,
 * MOCK_CONVERSATIONS, MOCK_GROUPS, CURRENT_USER, simulated chat replies).
 * It is ON in development so the app can be tested without a populated
 * backend, and OFF in production so real users never see fake profiles,
 * connections, groups, or auto-replies.
 *
 * NOTE: `__DEV__` is false in release, preview, and TestFlight/internal
 * builds — it is only true in Expo Go / the dev client. To exercise mock
 * data in a preview build, temporarily set this to a literal `true`.
 */
export const USE_MOCK_DATA = __DEV__;
