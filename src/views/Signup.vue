<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Username (no spaces please):</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <div class="form-group">
          <label>Neighborhood of Residence:</label>
          <select v-model="neighborhood_name">
            <option v-for="neighborhood in orderBy(neighborhoods, 'name')" v-bind:value="neighborhood.name">{{neighborhood.name}}</option>
          </select>
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters"; 

export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      neighborhood_name: "",
      neighborhoods: [],  
      errors: []
    };
  },
  created: function() {
    axios.get("/api/neighborhoods").then(response => {
      this.neighborhoods = response.data;
      console.log(response.data);
    });
  }, 
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation, 
        neighborhood: this.neighborhood_name
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>