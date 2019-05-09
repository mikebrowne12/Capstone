<template>
  <div class="neighborhoods-show">
    <h1 class='titleShow'>Windy City Vibes</h1>
    <br>
    <br>
    <h2 class='neighborhoodName'>{{ neighborhood.name }}</h2>
    <input type="hidden" v-model="neighborhood">
    <hr>
<!--     <option v-for="neighborhood in orderBy(neighborhoods, 'name')" v-bind:value="neighborhood.id">{{neighborhood.name}}</option> -->
    <div v-for="attraction in neighborhood.attractions">
      <h2 class='attraction'>{{ attraction.name }}</h2> 
      <h4 class='attraction'>{{ attraction.address }}</h4>
      <br>
      <h4 class='vote'>Would you recommend this attraction?</h4> 
      <div class='vote'>
        <button class='btn-primary' v-on:click="createVote(attraction, true)">YES</button>
        <button class='btn-primary' v-on:click="createVote(attraction, false)">NO</button>

        <br>
        <br>
        <div class='vote'>
          <h3>Number of Local Votes</h3>
          <h5>Number of votes: {{ countUpvotesLocal(attraction.votes) + countDownvotesLocal(attraction.votes) }}</h5>
          <h5>Upvotes: {{ countUpvotesLocal(attraction.votes) }}</h5>
          <h5>Downvotes: {{ countDownvotesLocal(attraction.votes) }}</h5>
          <h5>{{ ((countUpvotesLocal(attraction.votes)/(countUpvotesLocal(attraction.votes) + countDownvotesLocal(attraction.votes))) * 100).toFixed(2)}} % of locals recommend this attraction</h5>
        </div>
        <div class='vote'>
          <h3>Number of Non-Local Votes</h3>
          <h5>Number of votes: {{ countUpvotesNonLocal(attraction.votes) + countDownvotesNonLocal(attraction.votes) }}</h5>
          <h5>Upvotes: {{ countUpvotesNonLocal(attraction.votes) }}</h5>
          <h5>Downvotes: {{ countDownvotesNonLocal(attraction.votes) }}</h5>
          <h5>{{ ((countUpvotesNonLocal(attraction.votes)/(countUpvotesNonLocal(attraction.votes) + countDownvotesNonLocal(attraction.votes))) * 100).toFixed(2)}} % of non-locals recommend this attraction</h5>
        </div>
        <h3 class='vote'>Total Votes: {{ attraction.votes.length }}</h3>
<!--         <div v-for="vote in attraction.votes">
          {{ vote }}
        </div> -->
        <br>
        <br>
      </div>
      <div class="map" v-bind:id="`map${attraction.id}`"></div>
      <br>
      <hr>
    </div>
    <div>
      <router-link class='homeButton' to="/">Back to Home Page</router-link>
    </div>
  </div>
</template>

<style>
.titleShow {
  text-align: center; 
  font-size: 56px; 
  color: navy;
  font-family: georgia;
}

.map {
  height: 500px; 
  width:100%; 
  margin-bottom: 1em;
}

.hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}

.neighborhoodName {
  text-align: center;
  font-family: Times New Roman;   
}

.choiceYes {
  color: black;
  text-align: center;  
  size: small;
}

.choiceNo {
  color: black;
  text-align: center;
  margin-left: 20px;  
  size: small;
}

.attraction {
  text-align: center; 
}

.vote {
  text-align: center;
  font-size: 20px;
}

.homeButton {
  font-size: 12px; 
}
</style>

<script>
/* global mapboxgl, MapboxDirections, mapboxSdk */

import axios from "axios"; 
import Vue from 'vue';


export default {
  data: function() {
    return {
      user: {}, 
      neighborhood: {}, 
      vote: {}, 
      votes: [], 
    }; 
  },
  mounted: function() {

    mapboxgl.accessToken = process.env.VUE_APP_MY_API_KEY;

    axios.get("/api/neighborhoods/" + this.$route.params.id).then(response => {
      this.neighborhood = response.data;

      Vue.nextTick(() => {
        this.neighborhood.attractions.forEach(attraction => {
          // console.log('each attraction', attraction);

          let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
          mapboxClient.geocoding.forwardGeocode({
            query: attraction.address,
            // query: 'Wellington, New Zealand',
            autocomplete: false,
            limit: 1
          })
            .send()
            .then(function(response) {
              if (response && response.body && response.body.features && response.body.features.length) {
                let feature = response.body.features[0];

                attraction.map = new mapboxgl.Map({
                  container: "map" + attraction.id, // container id
                  style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                  center: feature.center, // starting position [lng, lat]
                  zoom: 16, // starting zoom
                  pitch: 45
                });

                attraction.map.addControl(new mapboxgl.NavigationControl());

                attraction.directions = new MapboxDirections({
                  accessToken: mapboxgl.accessToken
                });

                console.log('each attraction', attraction.address); 
                // attraction.directions.setDestination(attraction.address);

                attraction.map.addControl(attraction.directions, 'top-left');

                // $('#map'+attraction.id) > $('#mapboxgl-ctrl-geocoder') > $('input').val(attraction.address); 
                // directions.setDestination(feature.center);

                let popup = new mapboxgl.Popup({ offset: 25 }); 

                let marker = new mapboxgl.Marker()
                  .setLngLat(feature.center)
                  .setPopup(popup)
                  .addTo(attraction.map);
              }
            });
        }); 
      });  

      console.log("created", this.neighborhood);
    }); 
  },
  methods: {
    createVote: function(attraction, value) {
      // user_id: this.neighborhood.user.id,

      let params = { attraction_id: attraction.id, value: value};
      console.log("createVote", params); 

      axios.patch("/api/votes", params).then(response => {
        this.votes = response.data; 
        location.reload(true);

        // this.$router.push("/neighborhoods/" + this.neighborhood.id);
        console.log("createVote", this.votes.length); 
      }); 
       
    },
    countUpvotesLocal: function(votes) {
      let count = 0;
      votes.forEach(vote => {
        if (vote.value && vote.is_local === true) {
          count += 1;
        }
      });
      return count;
      //return votes.reduce((count, vote) => count + (vote.value ? 1 : 0), 0);
    },
    countUpvotesNonLocal: function(votes) {
      let count = 0;
      votes.forEach(vote => {
        if (vote.value && vote.non_local === true) {
          count += 1;
        }
      });
      return count;
      //return votes.reduce((count, vote) => count + (vote.value ? 1 : 0), 0);
    },
    countDownvotesLocal: function(votes) {
      let count = 0;
      votes.forEach(vote => {
        if (!vote.value && vote.is_local === true) {
          count += 1;
        }
      });
      return count;
    }, 
    countDownvotesNonLocal: function(votes) {
      let count = 0;
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