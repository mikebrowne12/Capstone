<template>
  <div class="attractions-show">
    <div v-bind:to="`/attractions/${attraction.id}`">
      <h1> {{ attraction.name }}</h1>
      <p>Would you recommend this attraction?</p> 
      <div>
        <button v-on:click="createVote(attraction, true)">YES</button>
        <button v-on:click="createVote(attraction, false)">NO</button>
      </div>
      {{ attraction.vote }}
      <div v-for="vote in attraction.vote">
        <h5>Number of votes: {{ vote.length }}</h5>
        <h5>Upvotes: {{ countUpvotes(attraction) }}</h5>
        <h5>Downvotes: {{ countDownvotes(attraction) }}</h5>
      </div>
            
    </div>

    <h2>Does this work?</h2>
    <router-link v-bind:to="`/attractions`">Back</router-link>
  </div>
</template>

<script>
import axios from "axios"; 

export default {
  data: function() {
    return {
      attraction: {},  
    }; 
  },
  created: function() {
    axios.get("/api/attractions/" + this.$route.params.id).then(response => {
      this.attraction = response.data;
      console.log("created", this.attraction);
    }); 
  },
  methods: {
    createVote: function(attraction, value) {
      // user_id: this.neighborhood.user.id,

      var params = { attraction_id: attraction.id, value: value};
      console.log("createVote", params); 

      axios.put("/api/votes", params).then(response => {
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