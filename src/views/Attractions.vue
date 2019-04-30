<template>
  <div class="attractions">
    <h1>All Attractions</h1>
    <div>
      <router-link to="./">Home</router-link>
    </div>
    <div v-for="attraction in attractions">
      <router-link v-bind:to="`/attractions/${attraction.id}`">{{ attraction.name }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      attractions: []
    };
  },
  created: function() {
    axios.get("/api/attractions").then(response => {
      this.attractions = response.data;
    });
  },
  methods: {}
};
</script>