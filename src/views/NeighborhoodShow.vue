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
        <h5>Number of votes: {{ attraction.votes.length }}</h5>
        <h5>Upvotes: {{ countUpvotes(attraction.votes) }}</h5>
        <h5>Downvotes: {{ countDownvotes(attraction.votes) }}</h5>
        <div v-for="vote in attraction.votes">
          <h5>Votes: {{ vote.value }}</h5>
          <h5>Counter: {{ vote.count }}</h5>
        </div>
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
      vote: {}, 
      votes: []
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
        console.log("createVote", this.votes.length); 
      }); 
       
    },
    countUpvotes: function(votes) {
      // var count = 0;
      // votes.forEach(vote => {
      //   if (vote.value) {
      //     count += 1;
      //   }
      // });
      // return count;
      return votes.reduce((count, vote) => count + (vote.value ? 1 : 0), 0);
    },
    countDownvotes: function(votes) {
      var count = 0;
      votes.forEach(vote => {
        if (!vote.value) {
          count += 1;
        }
      });
      return count;
    }
  }
}; 
</script>