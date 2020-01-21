<template>
  <section class="router-view">
    <Loading v-if="loading" />
    <div v-if="!loading" class="main-content">
      <div class="header">
        <div class="title">
          Log do Sistema
        </div>
        <div class="close" @click="$router.push('/logs')">
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
                <IconClose v-if="level === 'error'" class="level-svg"/>
                <IconInfo v-if="level === 'info'" class="level-svg"/>
                <IconWarning v-if="level === 'warn'" class="level-svg"/>
              </div>
              <div class="form-group">
                <label>De onde</label>
                <input v-model="from" disabled>
              </div>
              <div class="form-group">
                <label>Menssagem</label>
                <textarea class="log-message" v-model="message" disabled />
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-cancel" @click="$router.push('/logs')">
            <span>Cancelar</span>
            <IconClose />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconClose from '../../Icons/IconClose.vue'
import IconWarning from '../../Icons/IconWarning.vue'
import IconInfo from '../../Icons/IconInfo.vue'
import { get } from '../api/log'
import Loading from '../../Loading/LoadingScreen'

export default {
  components: {
    IconClose,
    IconWarning,
    IconInfo,
    Loading
  },
  props: ['id'],
  data () {
    return {
      log: [],
      error: [],
      from: null,
      level: null,
      message: null,
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
    async getMounted () {
      this.log = await get(this.id)
      this.from = this.log.from
      this.level = this.log.level
      this.message = this.log.message
      this.edit = true
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .level-svg {
    width: 50px;
    height: 50px;
  }
  .log-message {
    width: 100%;
    height: 200px;
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