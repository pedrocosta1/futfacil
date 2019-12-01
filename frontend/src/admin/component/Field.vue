<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Campo
        </div>
        <div class="close" @click="$router.push(`/clients/${client}/fields`)">
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
            </div>
          </div>
        </div>
        <div class="section" v-if="id !== 'new'">
          <div class="section-header" @click="recallSecond = !recallSecond">
            <span class="title">Cadastro de Horarios</span>
            <IconAngle :class="recallSecond ? 'rotate-down' : 'rotate-up'"/>
          </div>
          <div class="section-body" :class="recallSecond ? 'recall' : 'recall-body'">
            <div class="switch">
              <label class="text-active">{{manual ? 'Manual' : 'Automatico'}}</label>
              <input type="checkbox" v-model="manual">
              <span class="slider" @click="manual = !manual"></span>
            </div>
            <form class="form">
              <div v-if="manual">
                <div class="form-group">
                  <label>Dia</label>
                  <input v-model="date" :disabled="edit">
                </div>
                <div class="form-group">
                  <label>Hora Inicial</label>
                  <input v-model="hourIni" :disabled="edit">
                </div>
                <div class="form-group">
                  <label>Hora Final</label>
                  <input v-model="hourFinal" :disabled="edit">
                </div>
              </div>
              <div v-else>
                <div class="form-group">
                  <label>Dia</label>
                  <select v-model="day">
                    <option v-for="day in days" :key="day" :value="day">{{day}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Intervalo</label>
                  <select v-model="interval">
                    <option value="oneHour">1:00</option>
                    <option value="halfHour">1:30</option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="btn" @click="setInterval">
                    <span>Gerar</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="filter-display">
                  <div class="filter-btn" v-for="day in days" :key="day" @click="getFiltered(day)">
                    <span>{{day}}</span>
                  </div>
                </div>
              </div>
            </form>
            <div class="table">
              <table>
                <tr v-for="field in fieldList" :key="field.id">
                  <td>{{field.day}}</td>
                  <td>{{field.hourIni}}</td>
                  <td>{{field.hourEnd}}</td>
                  <td>{{field.active ? 'Horario Alugado' : 'Horario Vago'}}</td>
                </tr>
              </table>
            </div>
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
import IconAngle from '../../Icons/IconAngle.vue'
import { get, create, update } from '../api/field'
import { getAll as getList, create as createList, update as updateList } from '../api/fieldList'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconAdd,
    IconEdit,
    IconAngle,
    Loading
  },
  props: ['client', 'id'],
  data () {
    return {
      field: [],
      error: [],
      name: null,
      type: null,
      size: null,
      maxPerson: null,
      price: 0,
      hourPrice: null,
      edit: false,
      recallFirst: false,
      recallSecond: false,
      manual: false,
      date: null,
      hourIni: null,
      hourFinal: null,
      interval: null,
      fieldList: [],
      allFieldList: [],
      day: null,
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
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
          this.$router.push(`/clients/${this.client}/fields`)
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async setInterval () {
      var hourIni = 5
      var hourFinal = hourIni + 1
      if (this.interval === 'oneHour') {
        for (var x = 0; x < 11; x++) {
          if (hourIni === 10) {
            hourIni = 14
            hourFinal = hourIni + 1
          }
          const hourIniDate = new Date(2019, 10, 31, hourIni, 0)
          const hourFinalDate = new Date(2019, 10, 31, hourFinal, 0)
          await createList(
            this.id,
            hourIniDate,
            hourFinalDate,
            this.day
          )
          hourIni++
          hourFinal++
        }
      } else {
        for (var x = 0; x < 9; x++) {
          if (hourIni === 11) {
            hourIni = 12
            hourFinal = hourIni + 1
          }
          if (hourIni < 22) {
            const hourIniDate = new Date(2019, 10, 31, hourIni, 0)
            const hourFinalDate = new Date(2019, 10, 31, hourFinal, 30)
            await createList(
              this.id,
              hourIniDate,
              hourFinalDate,
              this.day
            )
            hourIni += 2
            hourFinal = hourIni + 1
          }
        }
      }
      this.allFieldList = await getList(this.id, true)
      this.fieldList = this.allFieldList.map(x => {
        x.hourIni = x.hourIni.split('T')[1].split(':')[0] + ':' + x.hourIni.split('T')[1].split(':')[1]
        x.hourEnd = x.hourEnd.split('T')[1].split(':')[0] + ':' + x.hourEnd.split('T')[1].split(':')[1]
        return x
      })
    },
    async getFiltered(day) {
      this.fieldList = this.allFieldList.filter(x => x.day === day)
    },
    async getMounted () {
      this.allFieldList = await getList(this.id, true)
      this.fieldList = this.allFieldList.map(x => {
        x.hourIni = x.hourIni.split('T')[1].split(':')[0] + ':' + x.hourIni.split('T')[1].split(':')[1]
        x.hourEnd = x.hourEnd.split('T')[1].split(':')[0] + ':' + x.hourEnd.split('T')[1].split(':')[1]
        return x
      })
      this.field = await get(this.id)
      this.name = this.field.name
      this.type = this.field.type
      this.size = this.field.size
      this.maxPerson = this.field.maxPerson
      this.price = this.field.price
      this.priceHour = this.field.priceHour
      this.edit = true
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>
