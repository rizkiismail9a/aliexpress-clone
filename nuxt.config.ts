// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  modules: [
    "nuxt-lodash",
    "nuxt-icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/supabase"
  ],
  runtimeConfig: {
    public: {
      stripePK: process.env.STRIPE_PK_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABESE_KEY,
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://js.stripe.com/v3/",
          defer: true,
        },
      ],
    },
  },
});
