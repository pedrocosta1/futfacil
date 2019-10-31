<template>
  <section class="router-view">
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
                <input v-model="phone" :disabled="edit">
                <span v-if="error.indexOf('phone') > -1">Ops! Ta faltando o Celular</span>
              </div>
              <div class="form-group">
                <label>CEP</label>
                <div class="search">
                  <input type="text" v-model="postal" :disabled="edit">
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
        <div class="section" @click="$router.push(`/players/${id}/rent`)">
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
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconAdd from '../../Icons/IconAdd.vue'
import IconEdit from '../../Icons/IconEdit.vue'
import IconSearch from '../../Icons/IconSearch.vue'
import IconAngle from '../../Icons/IconAngle.vue'
import { get, create, update } from '../api/player'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit,
    IconSearch,
    IconAngle
  },
  props: ['id'],
  data () {
    return {
      player: [],
      error: [],
      name: null,
      city: null,
      state: null,
      phone: null,
      street: null,
      number: null,
      description: null,
      postal: null,
      edit: false,
      recallFirst: false
    }
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    }
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
      // }
    },
    async getMounted () {
      this.player = await get(this.id)
      this.name = this.player.name
      this.city = this.player.city
      this.state = this.player.state
      this.phone = this.player.phone
      this.description = this.player.description
      this.postal = this.player.postal
      this.street = this.player.street
      this.number = this.player.number
      this.edit = true
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>
