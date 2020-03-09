<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Detalhes do Jogador
        </div>
        <div class="close" @click="$router.push('/players')">
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
                <input v-model="name">
                <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input v-model="phone" v-mask="['(##) ####-####', '(##) #####-####']">
                <span v-if="error.indexOf('phone') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>CEP</label>
                <div class="search">
                  <input type="text" v-mask="['#####-###']" v-model="postal" @blur="searchCep">
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
                <label>Bairro</label>
                <input v-model="neighborhood">
                <span v-if="error.indexOf('neighborhood') > -1">Ops! Ta faltando o Bairro</span>
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
            </div>
          </div>
        </div>
        <!-- <div class="section" @click="$router.push(`/rent`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Alugar Campos</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/rented`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Campos Alugados</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/hability`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Habilidade</span>
            <IconAngle/>
          </div>
        </div> -->
        <!-- <div class="section" v-if="cardDone">
          <div class="section-header" @click="recallSecond = !recallSecond">
            <span class="title">Card Futebol</span>
            <IconAngle :class="recallSecond ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallSecond ? 'recall' : 'recall-body'">
            <Card :id="id" />
          </div>
        </div>   -->
          <div class="button-group">
            <div class="btn-cancel" @click="cancel">
              <span>Cancelar</span>
              <IconClose />
            </div>
            <div class="btn-add" @click="save">
              <span>Salvar</span>
              <IconEdit />
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getCep } from '../api/searchCep'
import { getData as get, update } from '../api/player'

export default {
  computed: {
    ...mapState(['player']),
    ...mapState(['user'])
  },
  data () {
    return {
      playerData: [],
      error: [],
      id: null,
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
      recallSecond: true,
      cardDone: false,
      loading: true
    }
  },
  async mounted () {
    this.id = this.player.id
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
            this.id,
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
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getMounted () {
      this.playerData = await get(this.id)
      this.name = this.playerData.name
      this.city = this.playerData.city
      this.state = this.playerData.state
      this.phone = this.playerData.phone
      this.neighborhood = this.playerData.neighborhood
      this.description = this.playerData.description
      this.postal = this.playerData.postal
      this.street = this.playerData.street
      this.number = this.playerData.number
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    },
    async searchCep () {
      try {
        const dataCep = await getCep(this.postal)
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