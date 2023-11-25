// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  modules: ["nuxt-lodash", "nuxt-icon", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      exclude: ["/", "/item/*"],
    },
  },
});
