<template>
  <section class="router-view">
      <div class="header">
        <div class="title">
          Campo
        </div>
        <div class="close" @click="$router.push('/fields')">
          <IconClose/>
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <label>Nome</label>
          <input v-model="name" :disabled="edit">
          <span v-if="error.indexOf('name') > -1">Ops! Ta faltando o nome</span>
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <input v-model="type" :disabled="edit">
          <span v-if="error.indexOf('type') > -1">Ops! Ta faltando o Tipo</span>
        </div>
        <div class="form-group">
          <label>Tamanho Total</label>
          <input v-model="size" :disabled="edit">
          <span v-if="error.indexOf('size') > -1">Ops! Ta faltando o Tamanho</span>
        </div>
        <div class="form-group">
          <label>Maximo de Pessoas</label>
          <input v-model="maxPerson" :disabled="edit">
          <span v-if="error.indexOf('maxPerson') > -1">Ops! Ta faltando o Maximo de Pessoas</span>
        </div>
        <div class="form-group">
          <label>Preço</label>
          <money v-model="price" :disabled="edit"></money>
          <span v-if="error.indexOf('price') > -1">Ops! Ta faltando o Preço</span>
        </div>
        <div class="form-group">
          <label>Preço por Hora</label>
          <input v-model="hourPrice" :disabled="edit">
          <span v-if="error.indexOf('hourPrice') > -1">Ops! Ta faltando o Preço por Hora</span>
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
import { get, create, update } from '../api/field'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit
  },
  props: ['id'],
  data () {
    return {
      field: [],
      error: [],
      client: 1,
      name: null,
      type: null,
      size: null,
      maxPerson: null,
      price: null,
      hourPrice: null,
      edit: false
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
            this.client,
            this.type,
            this.size,
            this.maxPerson,
            this.price,
            this.hourPrice
          )
          await this.getMounted()
        } else {
          await create(
            this.name,
            this.client,
            this.type,
            this.size,
            this.maxPerson,
            this.price,
            this.hourPrice
          )
          this.$router.push('/fields')
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async getMounted () {
      this.field = await get(this.id)
      this.name = this.field.name
      this.type = this.field.type
      this.size = this.field.size
      this.maxPerson = this.field.maxPerson
      this.price = this.field.price
      this.priceHour = this.field.priceHour
      this.edit = true
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>
