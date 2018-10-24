<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs9>
      <v-expansion-panel popout  class="  mt-3">
        <v-expansion-panel-content  v-if="  novafaktura"  v-for="faktura in fakture" :key="faktura.id">
          <div slot="header">{{faktura.name}} {{faktura.date}}
            <p left>{{faktura.total}}</p>
          </div>
          <v-card>
            <v-card-text>{{faktura.total}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex xs2>

    </v-flex>
    <v-flex xs1 class="text-xs-center">
      <v-btn class="elevation-11 mt-2" medium @click="novafaktura=!novafaktura" v-if="novafaktura">Kreiraj novu Fakturu</v-btn>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2 class="text-xs-center">
      <div class="" v-if="!novafaktura">
        <h2  >Nova Faktura</h2>

        <form class="forma mt-3 elevation-6 pa-3">

          <v-text-field
            v-model="imeFirme"
            :error-messages="nameErrors"
            :counter="10"
            label="Ime Firme"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

          <v-text-field
            v-model="punNaziv"
            :error-messages="nameErrors"
            :counter="10"
            label="Pun naziv sa resenja"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

          <v-text-field
            v-model="pib"
            :error-messages="nameErrors"
            :counter="10"
            label="Pib"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

          <v-text-field
            v-model="matBroj"
            :error-messages="nameErrors"
            :counter="10"
            label="Maticni broj"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

          <v-text-field
            v-model="racun"
            :error-messages="nameErrors"
            :counter="10"
            label="Broj Ziro racuna"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

          <v-text-field
            v-model="adresa"
            :error-messages="nameErrors"
            :counter="10"
            label="Adresa"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field

      <v-text-field
        v-model="grad"
        :error-messages="nameErrors"
        :counter="10"
        label="Grad"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Proverili ste tacnost podataka?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn @click="submit" class="primary">Kreiraj Fakturu</v-btn>
      <v-btn @click="clear">Ocisti</v-btn>
    </form>







        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  validationMixin
} from 'vuelidate'
import {
  required,
  maxLength,
  email
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: {
      required,
      maxLength: maxLength(10)
    },
    email: {
      required,
      email
    },
    select: {
      required
    },
    checkbox: {
      required
    }
  },

  components: {

  },
  data() {
    return {
      imeFirme:'',
      punNaziv:'',
      pib:'',
      matBroj:'',
      racun:'',
      adresa:'',
      grad:'',
      novafaktura: true,
      fakture: [{
          id: '1',
          name: 'Enon Solutions',
          date: '28.10.2018',
          total: '1149.24'
        },
        {
          id: '2',
          name: 'Zlatna Kasika',
          date: '15.12.2017',
          total: '2379.00'
        },
        {
          id: '3',
          name: 'Grill Stefan',
          date: '25.05.2017',
          total: '514,35'
        },

      ],
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false

    }
  },
  computed: {
     checkboxErrors () {
       const errors = []
       if (!this.$v.checkbox.$dirty) return errors
       !this.$v.checkbox.required && errors.push('You must agree to continue!')
       return errors
     },
     selectErrors () {
       const errors = []
       if (!this.$v.select.$dirty) return errors
       !this.$v.select.required && errors.push('Item is required')
       return errors
     },
     nameErrors () {
       const errors = []
       if (!this.$v.name.$dirty) return errors
       !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
       !this.$v.name.required && errors.push('Name is required.')
       return errors
     },
     emailErrors () {
       const errors = []
       if (!this.$v.email.$dirty) return errors
       !this.$v.email.email && errors.push('Must be valid e-mail')
       !this.$v.email.required && errors.push('E-mail is required')
       return errors
     }
   },

   methods: {
     submit () {
       this.$v.$touch()
     },
     clear () {
       this.$v.$reset()
       this.name = ''
       this.email = ''
       this.select = null
       this.checkbox = false
     }
   }

}
</script>

<style scoped>
.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}
</style>
