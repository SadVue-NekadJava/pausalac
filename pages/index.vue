<template>
<v-stepper  class="forma"  v-model="e1">
  <v-stepper-header>
    <v-stepper-step :complete="e1 > 1" step="1">Korisnik</v-stepper-step>

    <v-divider></v-divider>

    <v-stepper-step :complete="e1 > 2" step="2">Korisnicki podaci</v-stepper-step>

    <v-divider></v-divider>

    <v-stepper-step step="3">Podaci o firmi</v-stepper-step>
  </v-stepper-header>

  <v-stepper-items >
    <v-stepper-content step="1">
      <h1>Korisnicki podaci</h1>
      <v-card class="mb-5" color="grey lighten-5"></v-card>
      <v-layout row wrap>
        <v-flex xs8 offset-xs2>
          <v-form>
            <!-- <v-flex xs5>
              <v-text-field name="name" label="Korisnicko ime"></v-text-field>
            </v-flex> -->
            <v-flex xs8>
              <v-text-field name="" label="Email"></v-text-field>
            </v-flex>
            <v-layout row wrap class="mt-3 mb-3">

            <v-flex xs5>
              <v-text-field v-model="password" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Korisnicka sifra" hint="At least 8 characters"
                counter @click:append="show1 = !show1"></v-text-field>
                  </v-flex>
                  <v-flex xs1>
                  </v-flex>
                  <v-flex xs5>
              <v-text-field v-model="password" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Potvrdi korisnicku sifru" hint="At least 8 characters"
                counter @click:append="show2 = !show2"></v-text-field>

    </v-flex>
      </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
      <v-btn color="primary" @click="e1 = 2">
        Continue
      </v-btn>

      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-content step="2">
      <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>
      <v-btn color="primary" @click="e1 = 3">
        Continue

      </v-btn>

      <v-btn @click="e1--" flat>Back</v-btn>

    </v-stepper-content>

    <v-stepper-content step="3">
      <v-card class="mb-5" color="grey lighten-1" height="200px"></v-card>

      <v-btn color="primary" @click="register">
        Submit
      </v-btn>

      <v-btn @click="e1--" flat>Back</v-btn>
    </v-stepper-content>
  </v-stepper-items>
</v-stepper>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      e1: 0
    }
  },
  methods: {
    register() {

    }
  }
}
</script>

<style >
.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}
</style>
