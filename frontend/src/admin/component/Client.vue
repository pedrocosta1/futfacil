<template>
  <section id="main">
    <div class="menu-container">
      <div class="menu">
        <div class="menu-item" @onclick="$router.push('/clients')">
          Clientes
        </div>
      </div>
      <div class="router-view">
        <div class="header">
          <div class="title">
            Client
          </div>
          <div class="close">
            <IconClose/>
          </div>
        </div>
        <div class="form">
          <div class="form-group">
            <label>Nome</label>
            <input v-model="name">
            <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
          </div>
          <div class="form-group">
            <label>Telefone</label>
            <input v-model="phone">
            <span v-if="error.indexOf('phone') > -1">Ops! Ta faltando o Celular</span>
          </div>
          <div class="form-group">
            <label>CEP</label>
            <div class="search">
              <input type="text" v-model="postal">
              <IconSearch class="svg-search"/>
            </div>
            <span v-if="error.indexOf('postal') > -1">Ops! Ta faltando o CEP</span>
          </div>
          <div class="form-group">
            <label>Estado</label>
            <input v-model="state">
            <span v-if="error.indexOf('state') > -1">Ops! Ta faltando o Estado</span>
          </div>
          <div class="form-group">
            <label>Cidade</label>
            <input v-model="city">
            <span v-if="error.indexOf('city') > -1">Ops! Ta faltando o Cidade</span>
          </div>
          <div class="form-group">
            <label>Rua</label>
            <input v-model="street">
            <span v-if="error.indexOf('street') > -1">Ops! Ta faltando o Rua</span>
          </div>
          <div class="form-group">
            <label>Numero</label>
            <input v-model="number">
            <span v-if="error.indexOf('number') > -1">Ops! Ta faltando o Numero</span>
          </div>
          <div class="form-group">
            <label>Complemento</label>
            <input v-model="description">
            <span v-if="error.indexOf('description') > -1">Ops! Ta faltando o Complemento</span>
          </div>
          <div class="button-group">
            <div class="btn-add" @click="save">
              <span>Adicionar</span>
              <IconAdd />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken, loadModule } from '../../util'
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import { get, create, update } from '../api/client'

export default {
  components: {
    IconClose,
    IconAdd,
    IconSearch
  },
  props: ['id'],
  data () {
    return {
      client: [],
      error: [],
      name: null,
      city: null,
      state: null,
      phone: null,
      street: null,
      number: null,
      description: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    console.log(this.id)
  },
  methods: {
    async save () {
      // if (this.id !== 'new'){

      // } else {
      try {
        await create (
          this.name,
          this.phone,
          this.city,
          this.state,
          this.postal,
          this.street,
          this.number
        ) 
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
      // }
    }
  }
}
</script>
