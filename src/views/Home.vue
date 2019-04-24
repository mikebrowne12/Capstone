<template>
  <div class="home">
    <h1>All Neighborhoods</h1>
    <router-link to="/Signup">Signup</router-link> |
    <router-link to="/Login">Log In</router-link>
    <div>
      <router-link to="/Attractions">Attractions</router-link>
    </div>
    <div v-for="neighborhood in neighborhoods">
      <h3>{{ neighborhood.name }}</h3>
      <h5>view attractions {{ neighborhood.attractions.length }}</h5>
      <router-link v-bind:to="`/neighborhoods/${neighborhood.id}`">Explore Neighborhood</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      neighborhoods: []
    };
  },
  created: function() {
    axios.get("/api/neighborhoods").then(response => {
      this.neighborhoods = response.data;
    });
  },
  methods: {}
};
</script>