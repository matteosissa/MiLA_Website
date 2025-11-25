// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: 'Centro MiLA | Against women violence',
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      description: 'Centro MiLA is a centre devoted to women and children victims of abuse and violence. ' +
      'It offers all the facilities and services to support women and children in stepping out of difficult situations towards a better and brighter future',
      keywords: 'anti-women violence Milan, domestic violence support Milan, Milan women\'s shelter, violence prevention Milan, help for abuse victims Milan, support for women and children Milan, centro anti-violenza Milano, servizi per donne vittime di violenza Milano, assistenza per vittime di violenza Milano, risorse per donne Milano, sicurezza donne Milano, sostegno donne e bambini Milano, prevenzione violenza Milano, aiuto donne Milano, protezione donne Milano',
      robots: 'index, follow',
    }
  },
  css: ['~/assets/styles/general.css'],

  runtimeConfig: {
    public: {
      openaiApiKey: process.env.OPENAI_API_KEY,
      baseBackendURL: process.env.BASE_BACKEND_URL,
    }
  },

  buildModules: [
    '@nuxtjs/dotenv',
  ],

  modules: ['nuxt-icon'],
  // modules: ['@nuxtjs/supabase']

  plugins: ['~/plugins/openai'],

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'backward-button-wrapper'
    }
  }
}

