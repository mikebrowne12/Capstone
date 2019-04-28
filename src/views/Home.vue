<template>
  <div class="home">
    <h1>All Neighborhoods</h1>

    <br>
    <br>
    <br>
    <div v-for="neighborhood in orderBy(neighborhoods, 'name')">
      <h2>{{ neighborhood.name }}</h2>
      <h5>Number of attractions {{ neighborhood.attractions.length }}</h5>
      <router-link v-bind:to="`/neighborhoods/${neighborhood.id}`">Explore Neighborhood</router-link>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from 'vue2-filters';


export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      neighborhoods: [],
      jwt: null
    };
  },
  created: function() {
    axios.get("/api/neighborhoods").then(response => {
      this.neighborhoods = response.data;
      console.log(response.data);
    });
    this.jwt = localStorage.jwt;
    console.log("My jwt is", this.jwt);
  },

  methods: {}
  // computed: {
  //   orderedNeighborhoods: function() {
  //     return _.sortBy(this.neighborhoods, 'name');
  //   }
  // }
};
</script>