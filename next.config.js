module.exports = {
  future: {
    webpack5: true,
  },
  env: {
    GRAPHQL_URL_ENDPOINT: process.env.GRAPHQL_URL_ENDPOINT,
    VEOPORTAL_MUTATIONS: process.env.VEOPORTAL_MUTATIONS,
    GMAIL_SERVICE_ID: process.env.GMAIL_SERVICE_ID,
    GMAIL_USER_ID: process.env.GMAIL_USER_ID,
    TEMPLATE_ID: process.env.TEMPLATE_ID
  }
}