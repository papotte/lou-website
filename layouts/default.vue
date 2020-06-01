<template>
  <v-app dark>
    <v-app-bar fixed color="white" elevate-on-scroll app class="px-md-10">
      <nuxt-link
        :to="{ name: 'index' }"
        aria-label="Página de inicio"
        class="d-flex align-center text--primary"
        style="text-decoration: none;"
        title="Página de inicio"
      >
        <v-img
          src="/logo.svg"
          alt="Logo"
          class="mr-2"
          contain
          transition="scale-transition"
          width="40"
        />
        <v-sheet class="mr-0 mr-md-4" color="transparent">
          <h1 class="primary--text">{{ title }}</h1>
        </v-sheet>
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(link, index) in nav"
          :key="index"
          nuxt
          min-width="48"
          text
          :ripple="false"
          :to="link.to"
        >
          <h6 class="text-capitalize">{{ link.title }}</h6>
        </v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon
        :ripple="false"
        class="hidden-md-and-up"
        @click="leftDrawer = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="leftDrawer" :right="true" temporary fixed>
      <v-list>
        <v-list-item v-for="(link, index) in nav" :key="index">
          <v-list-item-title>
            <v-btn nuxt text :ripple="false" :to="link.to">
              <h6 class="text-capitalize">{{ link.title }}</h6>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer color="white">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h1 class="primary--text text-center">
              {{ title }}
            </h1>
            <h2 class="secondary--text mt-n4 text-center">
              {{ subtitle }}
            </h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-center" cols="12" md="6">
            <v-btn
              v-for="link in social"
              :key="link.title"
              class="mx-1"
              target="_blank"
              icon
              :href="link.url"
            >
              <v-icon size="24px" color="primary">{{ link.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="py-2 text-center">
            {{ new Date().getFullYear() }} —
            <a href="https://rossana.lcdll.org" target="_blank">
              Rossana Bermudez
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          title: 'Inicio',
          to: '/'
        },
        {
          title: 'Sobre mí',
          to: '/about'
        },
        {
          title: 'Productos',
          to: '/products'
        },
        {
          title: 'Contacto',
          to: '/contact'
        }
      ],
      leftDrawer: false,
      title: 'Lou De La Hoz',
      subtitle: 'Handmade with love',
      social: [
        {
          title: 'facebook',
          url: 'https://www.facebook.com/ldelahre',
          icon: 'fab fa-facebook-f'
        },
        {
          title: 'whatsapp',
          url: 'https://wa.me/573123066489',
          icon: 'fab fa-whatsapp'
        },
        {
          title: 'email',
          url: 'mailto:ldelahre@gmail.com',
          icon: 'fas fa-envelope'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.v-btn {
  &:before {
    background-color: transparent;
  }

  &:hover {
    opacity: 0.8;
    color: var(--v-primary-base) !important;
  }

  &.v-btn--active {
    color: var(--v-primary-base) !important;
  }
}

.v-img {
  height: 100%;
}
</style>
