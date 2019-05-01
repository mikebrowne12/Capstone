<template>
  <div class="neighborhoods-show">
    <h2>Neighborhood: {{ neighborhood.name }}</h2>
    
    <div v-for="attraction in neighborhood.attractions">
<!--       <router-link v-bind:to="`/attractions/${attraction.id}`">{{ attraction.name }}</router-link> -->
      <p>Attractions: {{ attraction.name }}</p> 
      <p>Would you recommend this attraction?</p> 
      <div>
        <button v-on:click="createVote(attraction, true)">YES</button>
        <button v-on:click="createVote(attraction, false)">NO</button>


        <div>
          <h3>Number of Local Votes</h3>
          <h5>Number of votes: {{ countUpvotesLocal(attraction.votes) + countDownvotesLocal(attraction.votes) }}</h5>
          <h5>Upvotes: {{ countUpvotesLocal(attraction.votes) }}</h5>
          <h5>Downvotes: {{ countDownvotesLocal(attraction.votes) }}</h5>
          <h5>{{ (countUpvotesLocal(attraction.votes)/(countUpvotesLocal(attraction.votes) + countDownvotesLocal(attraction.votes))) * 100}} % of locals recommend this attraction</h5>
        </div>
        <div>
          <h3>Number of Non-Local Votes</h3>
          <h5>Number of votes: {{ countUpvotesNonLocal(attraction.votes) + countDownvotesNonLocal(attraction.votes) }}</h5>
          <h5>Upvotes: {{ countUpvotesNonLocal(attraction.votes) }}</h5>
          <h5>Downvotes: {{ countDownvotesNonLocal(attraction.votes) }}</h5>
          <h5>{{ (countUpvotesNonLocal(attraction.votes)/(countUpvotesNonLocal(attraction.votes) + countDownvotesNonLocal(attraction.votes))) * 100}} % of locals recommend this attraction</h5>
        </div>
        <h3>Votes ({{ attraction.votes.length }})</h3>
        <div v-for="vote in attraction.votes">
          {{ vote }}
        </div>
        <br>
        <br>
        <br>
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
      user: {}, 
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
      // user_id: this.neighborhood.user.id,

      var params = { attraction_id: attraction.id, value: value};
      console.log("createVote", params); 

      axios.put("/api/votes", params).then(response => {
        this.votes = response.data; 
        console.log("createVote", this.votes.length); 
      }); 
       
    },
    countUpvotesLocal: function(votes) {
      var count = 0;
      votes.forEach(vote => {
        if (vote.value && vote.is_local === true) {
          count += 1;
        }
      });
      return count;
      //return votes.reduce((count, vote) => count + (vote.value ? 1 : 0), 0);
    },
    countUpvotesNonLocal: function(votes) {
      var count = 0;
      votes.forEach(vote => {
        if (vote.value && vote.non_local === true) {
          count += 1;
        }
      });
      return count;
      //return votes.reduce((count, vote) => count + (vote.value ? 1 : 0), 0);
    },
    countDownvotesLocal: function(votes) {
      var count = 0;
      votes.forEach(vote => {
        if (!vote.value && vote.is_local === true) {
          count += 1;
        }
      });
      return count;
    }, 
    countDownvotesNonLocal: function(votes) {
      var count = 0;
      votes.forEach(vote => {
        if (!vote.value && vote.non_local === true) {
          count += 1;
        }
      });
      return count;
    }
  }
}; 
</script>