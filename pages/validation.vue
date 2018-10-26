<template>
<div>
  <div class="navChat">
    <div class="text-center pt-2"><img src="../assets/logoHOme.png" height="70" style="line-height:80px;" alt=""></div>
  </div>
  <div class="container">
    <div class="omot">
    <h1 class="text-center naslov">{{msg}}</h1>
    <router-link to="/mainPage" ><div class="text-center"><button type="button" class="btn btn-outline-primary" name="button">Login</button></div></router-link>
    <footer-meeting></footer-meeting>
  </div>
  </div>
</div>

</template>

<script>

import Navbar from '../components/navbar.vue'

export default {
  components:{
    'nav-bar': Navbar
  },
  data() {
    return {
      hash: '',
      msg: ''

    }
  },
  mounted() {
    this.hash = decodeURIComponent(location.href);
    this.hash = this.hash.split('=');
    this.hash = this.hash[1];
    axios.get("http://837s121.mars-e1.mars-hosting.com/validateEmail", {
      params: {
        hash: this.hash
      },
    }).then(response => {
      console.log(response);
      this.msg = response.data.msg;

    });
  }
}
</script>

<style scoped>
.navChat {

  width: 100vw;
  height: 80px;


}
.naslov {
  text-transform: uppercase;
margin-top:30vh;
}
.btn-outline-primary {
margin-top: 20px;
border: 1px solid #6ab4d1;
color: black;
font-weight: 600;
width: 100px;
position: relative;
overflow: hidden;
border-radius: 20px;
transition: 2s padding ease;
  text-decoration: none;

}
.btn-outline-primary:focus {
  outline-style: none;
  box-shadow: none;
}

.btn-outline-primary::before {
  position: absolute;
  background: #6ab4d1;
  top: 50%;
  content: '';
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  transition: 1s all ease;
  z-index: -1;
  width: 100%;
  height: 0;
}

.btn-outline-primary:hover::before {
  height: 1500%;
  background: #6ab4d1;
  color: #fff;


}

.btn-outline-primary:hover {
  border-radius: 50px;
  transition: 0.5s all ease;
  text-decoration: none;
  color:#fff;
}
</style>
