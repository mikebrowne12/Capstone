<template>
  <div class="neighborhoods-show">
    <div v-for="attraction in neighborhood.attractions">
      <h2>Neighborhood: {{ neighborhood.name }}</h2>
      <p>Attractions: {{ attraction.name }}</p> 
      <p>Would you recommend this attraction?</p> 
      <div>
        <button v-on:click="createVote(attraction, true)">YES</button>
        <button v-on:click="createVote(attraction, false)">NO</button>
      </div>
    </div>
    <div>
      <router-link to="/">Back</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios"; 

export default {
  data: function() {
    return {
      neighborhood: {}, 
      vote: {}
      // attractions: {}
    }; 
  }, 
  created: function() {
    axios.get("/api/neighborhoods/" + this.$route.params.id).then(response => {
      this.neighborhood = response.data;
      console.log("created", this.neighborhood);
    }); 
  },
  methods: {
    createVote: function(attraction, value) {
      // console.log("This worked!", attraction.name, attraction.id, value);
      // axios.post to create a vote, params value and attraction.id
      var params = { user_id: this.neighborhood.user.id, attraction_id: attraction.id, value: value};
      console.log("createVote", params);
      // Create a vote using POST "/api/votes" with params {attraction_id, value}

      axios.post("/api/votes", params).then(response => {
        this.votes = response.data;
      }); 
       
    }
  }
}; 
</script>