<template>
  <div class="home">
    <h1 class='title'>Windy City Vibes</h1>
    <br>
    <div id='map'></div>
    <div class='map-overlay-container'>
      <div class='map-overlay'>
        <h2 id='location-title'></h2>
        <p id='location-description'></p>
        <small>Text credit: <a target='_blank' href='http://www.nycgo.com/neighborhoods'>nycgo.com</a></small>
      </div>
    </div>
    <div class='weather'>
      <h4>Current Chicago Weather: {{ weather.main.temp }} F and {{ weather.weather[0].description }}</h4>
    </div>
    <br>
    <div class='randomizeNeighborhood'>
      <p>Don't know which neighborhood you want to visit, let us choose one for you!</p>
      <button v-on:click="randomNeighborhood()">Random</button>  
    </div>
    <br>
    <h1 class='neighborhoodTitle'>All Neighborhoods</h1>
    <br>
    <h4 class='h4Home'>Select a Neighborhood to visit</h4>
      <form class='neighborhoodButton' v-on:submit.prevent="selectNeighborhood()">
        <select v-model="neighborhood_id">
          <option v-for="neighborhood in orderBy(neighborhoods, 'name')" v-bind:value="neighborhood.id">{{neighborhood.name}}</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    <br>
    <div class='neighborhood' v-for="neighborhood in neighborhoods">
    <!-- <div v-for="neighborhood in neighborhoods"> -->
      <h2>{{ neighborhood.name }}</h2>
      <h4>{{ neighborhood.id }}</h4>
      <h5>Number of attractions {{ neighborhood.attractions.length }}</h5>
      <router-link v-bind:to="`/neighborhoods/${neighborhood.id}`">Explore Neighborhood</router-link>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>

<style>
  body { margin:0; padding:0;}

  .weather {
    text-align: center; 
  }

  #map { height:500px; width:100%; pointer-events: none; margin-bottom: 1em; }


  .map-overlay-container {
  position: absolute;
  width: 45%;
  top: 35px;
  left: 505px;
  padding: 50px;
  border: 50px; 
  border-color: black; 
  z-index: 1;
  }
   
  .map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  background-color: #fff;
  border-radius: 3px;
  padding: 0px;
  box-shadow:0 1px 2px rgba(0,0,0,0.20);
  }
   
  .map-overlay h2,
  .map-overlay p {
  margin: 0 0 10px;
  }

  .title {
    font-size: 56px; 
    color: navy;
    font-family: georgia; 
  }

  .randomizeNeighborhood {
    text-align: center; 
  }

  .neighborhoodTitle {
    text-align: center; 
  }

  .neighborhoodButton {
    text-align: center;
  }

  .neighborhood {
    text-align: center; 
  }

  .h4Home {
    text-align: center; 
  }

</style>

<script>
/* global mapboxgl */
import axios from "axios";
import Vue2Filters from 'vue2-filters';


export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      neighborhoods: [],
      weather: {
        weather: [{
          description: ''
        }],
        main: {
          temp: 0
        }
      }, 
      jwt: null,
      neighborhood_id: ""
    };
  },
  created: function() {
    axios.get("/api/neighborhoods").then(response => {
      this.neighborhoods = response.data;
      console.log(response.data);
    });
    this.jwt = localStorage.jwt;
    console.log("My jwt is", this.jwt);

    axios.get("/api/weather").then(response => {
      this.weather = response.data;  
    }); 
  },
  mounted: function() {


    mapboxgl.accessToken = process.env.VUE_APP_MY_API_KEY;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [-74.0315, 40.6989],
      center: [-87.8253, 41.8144],
      maxZoom: 16,
      minZoom: 9,
      zoom: 9.68
    });

    var title = document.getElementById('location-title');
    var description = document.getElementById('location-description');

    var locations = [{
      "title": "Neighborhoods of Chicago",
      "description": "New York City is made up of five boroughs: the Bronx, Brooklyn, Manhattan, Queens and Staten Island. Each one has enough attractions—and enough personality—to be a city all its own.",
      "camera": {
        center: [-87.8253, 41.8144],
        zoom: 0,
        bearing: 0,
        pitch: 0
      }
    }, {
      "id": "2",
      "title": "Loop",
      "description": "This is where hip-hop was born, where the Yankees became a dynasty and where you can find New York City's leading zoo and botanical garden.",
      "camera": {
        center: [-87.6378, 41.8790], 
        zoom: 12.21,
        pitch: 50
      }
    }, {
      "id": "3",
      "title": "Logan Square",
      "description": "No matter how hip it looks on TV, NYC's most populous borough is best experienced in person. Read on to find out about live music, Prospect Park, Nets basketball and more.",
      "camera": {
        center: [-87.7268, 41.9228],
        bearing: -8.9,
        zoom: 11.68
      }
    }, {
      "id": "1",
      "title": "Hyde Park",
      "description": "Even if you think you know Manhattan—its world-class museums, fine dining and unforgettable views—the borough always has something new and exciting in store.",
      "camera": {
        center: [-87.5948, 41.7942],
        bearing: 25.3,
        zoom: 11.5
      }
    }, {
      "id": "4",
      "title": "West Garfield Park",
      "description": "Taste food from around the globe, watch Mets baseball and US Open tennis, see cutting-edge art and more in one of the world's most diverse places.",
      "camera": {
        center: [-87.7348, 41.8780],
        bearing: 36,
        zoom: 11.37
      }
    }];

    function highlightBorough(code) {
      // Only show the polygon feature that cooresponds to `borocode` in the data
      map.setFilter('highlight', ["==", "borocode", code]);
    }

    function playback(index) {
      title.textContent = locations[index].title;
      description.textContent = locations[index].description;

      highlightBorough(locations[index].id ? locations[index].id : '');

      // Animate the map position based on camera properties
      map.flyTo(locations[index].camera);

      map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
        // Increment index
          index = (index + 1 === locations.length) ? 0 : index + 1;
          playback(index);
        }, 3000); // After callback, show the location for 3 seconds.
      });
    }

    // Display the last title/description first
    title.textContent = locations[locations.length - 1].title;
    description.textContent = locations[locations.length - 1].description;

    map.on('load', function() {

      map.addLayer({
        "id": "highlight",
        "type": "fill",
        "source": {
          "type": "vector",
          "url": "mapbox://mapbox.8ibmsn6u"
        },
        "source-layer": "original",
        "paint": {
          "fill-color": "#fd6b50",
          "fill-opacity": 0.25
        },
        "filter": ["==", "borocode", ""]
      }, 'settlement-subdivision-label'); // Place polygon under the neighborhood labels.

      // Start the playback animation for each borough
      playback(0);
    });

  },

  methods: {
    randomNeighborhood: function() {
      var neighborhoodID = Math.floor((Math.random() * 77) + 1);
      console.log(neighborhoodID); 
      var url = "http://localhost:8080/neighborhoods/" + neighborhoodID; 
      console.log(url); 
      window.location.href = url; 

      // window.location = "http://localhost:8080/neighborhoods/";
    }, 
    selectNeighborhood: function() {
      this.$router.push("/neighborhoods/" + this.neighborhood_id); 
    }

  }, 

// var url = '{{ route("admin.edit_school", ":slug") }}';

// url = url.replace(':slug', slug);

// window.location.href=url;

};  
</script>