<template>
  <v-app >
    <div class="main ">


    <v-navigation-drawer  class="opacity" temporary
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout" class="secondary" >
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar v-if="logged" class="opacity elevation-15" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon
       class="hidden-md-and-up" @click="drawer = !drawer">
     </v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/home" tag="span" style="cursor:pointer;">Pausalac</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item,i) in items" :key="i" :to="item.to"><v-icon left>{{item.icon}}</v-icon>{{item.title}}</v-btn>
<v-btn @click="logout" color="secondary">logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

        <nuxt />
    
    </v-content>

    <v-footer class="opacity" :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span><v-flex xs4 offset-xs4>

    <span >Copyright@ FLM Systems</span>  </v-flex>
    </v-footer>
      </div>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        logged:this.$store.state.logged,
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'description', title: 'Fakture', to: '/Fakture' },
          { icon: 'folder_special', title: 'Porez', to: '/Porez' },
            { icon: 'account_box', title: 'Komitenti', to: '/Komitenti' },
                    { icon: 'local_hospital', title: 'Zdravstvene knjizice', to: '/ZKnjizice' },
                            { icon: 'business', title: 'Moja Firma', to: '/MojaFirma' },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },


    computed: {
     log1 () {
       return this.$store.state.logged;

     }
   },
   watch: {
     log1 (newCount, oldCount) {
this.logged= newCount;
       console.log(newCount);
     }

  },

    mounted(){
      if(  window.localStorage.getItem("sessionid")!=null){
      this.$store.commit('change');
      console.log(this.$store.state.logged);
      this.logged=this.$store.state.logged;
      }
    },
    methods:{
      logout(){
        axios.get("http://837s121.mars-e1.mars-hosting.com/logout",{
                      params:{ sid: localStorage.getItem('sessionid')  }
                     }).then(response => {

                     });
        localStorage.removeItem('sessionid');
        this.logged=false;
        this.$router.push('/');
              this.$store.commit('changeFalse');
      }
    }
  }
</script>

<style >
html{
  font-family: 'Patua One', cursive;
}
.opacity{
  opacity:0.85;
}

.main{
  background-image: url('../assets/officeBg1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  width:100%;
  min-height: 100vh;

}
.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}

</style>
