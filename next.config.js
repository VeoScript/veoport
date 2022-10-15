module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  env: {
    GRAPHQL_URL_ENDPOINT: process.env.GRAPHQL_URL_ENDPOINT,
    VEOPORTAL_MUTATIONS: process.env.VEOPORTAL_MUTATIONS,
    GMAIL_SERVICE_ID: process.env.GMAIL_SERVICE_ID,
    GMAIL_USER_ID: process.env.GMAIL_USER_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    JWT_SECRET: process.env.JWT_SECRET,
    RP_TEMPLATE_ID: process.env.RP_TEMPLATE_ID,
    RP_USER_ID: process.env.RP_USER_ID,
    RP_SERVICE_ID: process.env.RP_SERVICE_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    IMGBB_API_KEY: process.env.IMGBB_API_KEY,
    MESSENGER_PAGE_ID: process.env.MESSENGER_PAGE_ID,
    MESSENGER_APP_ID: process.env.MESSENGER_APP_ID
  }
}