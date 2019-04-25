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
      <div v-for="attraction in neighborhood.attractions">
        <div v-for="vote in attraction.votes">
          <h5>Votes: {{ vote.value === true }}</h5>
        </div>
        <!-- <h5>Votes: {{ attraction.votes }}</h5> -->
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

      var params = { user_id: this.neighborhood.user.id, attraction_id: attraction.id, value: value};
      console.log("createVote", params);

      axios.post("/api/votes", params).then(response => {
        this.votes = response.data;
      }); 
       
    }
  }
}; 
</script>