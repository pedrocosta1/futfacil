<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          player
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
                <input v-model="name" :disabled="edit">
                <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input v-model="phone" v-mask="['(##) ####-####', '(##) #####-####']" :disabled="edit">
                <span v-if="error.indexOf('phone') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>CEP</label>
                <div class="search" :class="edit ? 'disabled' : ''">
                  <input type="text" v-mask="['#####-###']" v-model="postal" @blur="searchCep">
                  <IconSearch class="svg-search"/>
                </div>
                <span v-if="error.indexOf('postal') > -1">Ops! Ta faltando o CEP</span>
              </div>
              <div class="form-group">
                <label>Estado</label>
                <input v-model="state" :disabled="edit">
                <span v-if="error.indexOf('state') > -1">Ops! Ta faltando o Estado</span>
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <input v-model="city" :disabled="edit">
                <span v-if="error.indexOf('city') > -1">Ops! Ta faltando o Cidade</span>
              </div>
              <div class="form-group">
                <label>Bairro</label>
                <input v-model="neighborhood" :disabled="edit">
                <span v-if="error.indexOf('neighborhood') > -1">Ops! Ta faltando o Bairro</span>
              </div>
              <div class="form-group">
                <label>Rua</label>
                <input v-model="street" :disabled="edit">
                <span v-if="error.indexOf('street') > -1">Ops! Ta faltando o Rua</span>
              </div>
              <div class="form-group">
                <label>Numero</label>
                <input v-model="number" :disabled="edit">
                <span v-if="error.indexOf('number') > -1">Ops! Ta faltando o Numero</span>
              </div>
              <div class="form-group">
                <label>Complemento</label>
                <input v-model="description" :disabled="edit">
                <span v-if="error.indexOf('description') > -1">Ops! Ta faltando o Complemento</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section" @click="$router.push(`/players/${id}/rent`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Alugar Campos</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/players/${id}/rented`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Campos Alugados</span>
            <IconAngle/>
          </div>
        </div>
        <div class="section" @click="$router.push(`/players/${id}/hability`)" v-if="id !== 'new'">
          <div class="section-header">
            <span class="title">Habilidade</span>
            <IconAngle/>
          </div>
        </div>
          <div class="button-group">
            <div class="btn-cancel" v-if="!edit" @click="cancel">
              <span>Cancelar</span>
              <IconClose />
            </div>
            <div class="btn-add" v-if="!edit" @click="save" :disabled="edit">
              <span>Adicionar</span>
              <IconAdd />
            </div>
            <div class="btn-add" v-if="edit" @click="edit = false">
              <span>Editar</span>
              <IconEdit />
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconEdit from '../../Icons/IconEdit.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import { get, create, update } from '../api/player'
import { getCep } from '../api/searchCep'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit,
    IconSearch,
    IconAngle,
    Loading
  },
  props: ['id'],
  data () {
    return {
      player: [],
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
      edit: false,
      recallFirst: false,
      loading: true
    }
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
        if (this.id !== 'new') {
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
        } else {
          await create(
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
          this.$router.push('/players')
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getMounted () {
      this.player = await get(this.id)
      this.name = this.player.name
      this.city = this.player.city
      this.state = this.player.state
      this.phone = this.player.phone
      this.neighborhood = this.player.neighborhood
      this.description = this.player.description
      this.postal = this.player.postal
      this.street = this.player.street
      this.number = this.player.number
      this.edit = true
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