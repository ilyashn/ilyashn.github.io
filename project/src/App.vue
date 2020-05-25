<template>
    <v-app>
    <v-content>
      <CalendarVue/>
    </v-content>
  </v-app>
</template>

<script>
import CalendarVue from './components/Calendar';

export default {
  name: 'App',

  components: {
    CalendarVue,
  },

  data: () => ({
    //
  }),
};
</script>
