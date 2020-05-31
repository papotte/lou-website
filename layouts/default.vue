<template>
  <v-app dark>
    <v-app-bar fixed color="white" elevate-on-scroll app class="px-10">
      <nuxt-link
        :to="{ name: 'index' }"
        aria-label="Página de inicio"
        class="d-none d-sm-flex align-center text--primary"
        style="text-decoration: none;"
        title="Página de inicio"
      >
        <v-img
          src="/logo.svg"
          alt="Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="40"
        />
        <v-sheet class="h1 mr-0 mr-md-4" color="transparent">
          <h1>{{ title }}</h1>
        </v-sheet>
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-for="(link, index) in links"
          :key="index"
          nuxt
          active-class="primary--text"
          min-width="48"
          text
          :ripple="false"
          :to="link.to"
        >
          <h3 class="text-capitalize ">{{ link.title }}</h3>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      links: [
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Lou De La Hoz'
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
}
</style>
