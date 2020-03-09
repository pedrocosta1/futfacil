<template>
  <section class="router-view">
    <Loading v-if="loading" />
    <div v-if="!loading" class="main-content">
      <div class="header">
        <div class="title">
          Client
        </div>
        <div class="close" @click="$router.push('/clients')">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="section first-section">
          <div class="section-header" @click="recallFirst = !recallFirst">
            <span class="title">Detalhes</span>
            <IconAngle :class="recallFirst ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallFirst ? 'recall' : 'recall-body'">
            <div class="form">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="name" >
                <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input v-model="phone" v-mask="['(##) #####-####', '(##) ####-####']" >
                <span v-if="error.indexOf('phone') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>CEP</label>
                <div class="search" v-mask="['#####-###']">
                  <input type="text" v-model="postal"  @blur="searchCep">
                  <IconSearch class="svg-search"/>
                </div>
                <span v-if="error.indexOf('postal') > -1">Ops! Ta faltando o CEP</span>
                <span v-if="error.indexOf('cepInvalid') > -1">Ops! CEP Inválido</span>
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input v-model="state" >
                <span v-if="error.indexOf('state') > -1">Ops! Ta faltando o Estado</span>
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input v-model="city" >
                <span v-if="error.indexOf('city') > -1">Ops! Ta faltando o Cidade</span>
              </div>
              <div class="form-group">
                <label>Bairro</label>
                <input v-model="neighborhood" >
                <span v-if="error.indexOf('neighborhood') > -1">Ops! Ta faltando o Bairro</span>
              </div>
              <div class="form-group">
                <label>Rua</label>
                <input v-model="street" >
                <span v-if="error.indexOf('street') > -1">Ops! Ta faltando o Rua</span>
              </div>
              <div class="form-group">
                <label>Numero</label>
                <input v-model="number" >
                <span v-if="error.indexOf('number') > -1">Ops! Ta faltando o Numero</span>
              </div>
              <div class="form-group">
                <label>Complemento</label>
                <input v-model="description" >
                <span v-if="error.indexOf('description') > -1">Ops! Ta faltando o Complemento</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section" @click="$router.push(`/fields`)">
          <div class="section-header">
            <span class="title">Campos</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/renteds`)">
          <div class="section-header">
            <span class="title">Campos Alugados</span>
            <IconAngle/>
          </div>
        </div>
          <div class="button-group">
            <div class="btn-cancel" v-if="!edit" @click="cancel">
              <span>Cancelar</span>
              <IconClose />
            </div>
            <div class="btn-add" v-if="edit" @click="save">
              <span>Editar</span>
              <IconEdit />
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get, create, update } from '../api/client'
import { getCep } from '../api/searchCep'

export default {
  data () {
    return {
      clientData: [],
      error: [],
      name: null,
      city: null,
      neighborhood: null,
      state: null,
      phone: null,
      street: null,
      number: null,
      description: null,
      postal: null,
      recallFirst: false,
      loading: true
    }
  },
  computed: {
    ...mapState(['client']),
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
    this.loading = false
  },
  methods: {
    async save () {
      try {
        this.loading = true
        await update(
          this.client.id,
          this.name,
          this.phone,
          this.city,
          this.state,
          this.postal,
          this.street,
          this.number,
          this.neighborhood,
          this.description
        )
        await this.getMounted()
        this.loading = false
      } catch (error) {
        this.loading = false
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getMounted () {
      this.clientData = await get(this.client.id)
      this.name = this.clientData.name
      this.city = this.clientData.city
      this.state = this.clientData.state
      this.phone = this.clientData.phone
      this.description = this.clientData.description
      this.neighborhood = this.clientData.neighborhood
      this.postal = this.clientData.postal
      this.street = this.clientData.street
      this.number = this.clientData.number
      this.edit = true
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    },
    async searchCep () {
      try {
        this.error = []
        const cep = this.postal.replace('-','')
        const dataCep = await getCep(cep)
        this.city = dataCep.localidade
        this.street = dataCep.logradouro
        this.state = dataCep.uf
        this.neighborhood = dataCep.bairro
      } catch (error) {
        this.loading = false
        const data = error.response ? error.response.data : {}
        if (data.error === 'Cep Inválido') {
          this.error = 'cepInvalid'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .svg-search {
    width: 50px;
  }

  .search {
    input {
      &:focus {
        border: none;
      }
      padding: 5px 10px;
      &:disabled {
        background: none
      }
    }
  }
  .disabled {
    background: #ebebe4;
  }
</style>