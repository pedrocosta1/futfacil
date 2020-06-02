<template>
  <section id="signon" class="all-page">
      <div class="box-login">
        <div class="login-header">
          <div class="back-header">
            <div class="box-svg" @click="$router.push('/signin')">
              <IconAngle class="rotate-up"/>
            </div>
          </div>
          <label>Registre-se</label>
          <div class="line">
          </div>
        </div>
        <form class="login-body">
          <div class="box-two-columns">
            <div class="half-box">
              <label>Nome</label>
              <input v-model="name" placeholder="Nome" :class="{ error : emailError || error }"/>
              <span v-if="nameError" class="error">Nome Vázio</span>
            </div>
            <div class="half-box">
              <label>Telefone</label>
              <input v-model="phone" placeholder="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" :class="{ error : emailError || error }"/>
              <span v-if="phoneError" class="error">Telefone Vázio</span>
            </div>
          </div>
          <div class="box">
            <label>Email</label>
            <input v-model="email" type="text" placeholder="E-mail" :class="{ error : emailError || error }" />
            <span v-if="emailError" class="error">E-mail informado incorretamente</span>
          </div>
          <div class="box">
            <label>Senha</label>
            <input v-model="password" type="password" placeholder="Senha" :class="{ error : passwordError }" />
            <span v-if="passwordError" class="error">Senha informada incorretamente</span>
          </div>
          <div class="box">
            <label>Permissão</label>
            <select v-model="role">
              <option value="admin">Admin</option>
              <option value="client">Cliente</option>
              <option value="player">Player</option>
            </select>
          </div>
        </form>
        <div class="login-footer">
          <button class="btn-login" @click="signOn" type="button">Confirmar</button>
        </div>
      </div>
  </section>
</template>

<script>
import logger from '../../logger'
import { setToken, loadModule } from '../../util'
import { signon } from '../api/auth'
import IconAngle from '../../Icons/IconAngle'
import { firstRegister } from '../api/register'

export default {
	components: {
    IconAngle
	},
  data () {
    return {
      email: null,
      emailError: false,
      password: null,
      passwordError: false,
      nameError: false,
      phoneError: false,
      error: null,
      role: null,
      name: null,
      phone: null
    }
  },
  props: ['login'],
  methods: {
    async signOn () {
      // Clean errors
      this.emailError = false
      this.passwordError = false
      this.error = null
      try {
        const { data } = await signon(this.email, this.password, this.role)
        // Set token on axios header
        setToken(data.token)
        this.$root.$destroy()
        if (data.user.role === 'admin') {
          // Start admin module
          loadModule('admin', data.user)
        } else if (data.user.role === 'client') {
          await firstRegister(data.user.id, this.name, this.phone, data.user.role)
          // Start user module
          loadModule('client', data.user)
        } else if (data.user.role === 'player') {
          await firstRegister(data.user.id, this.name, this.phone, data.user.role)
          loadModule('player', data.user)
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        // Validation error
        if (data.error === 'Validation error') {
          data.fields.map(x => {
            if (x === 'login') { this.emailError = true }
            if (x === 'password') { this.passwordError = true }
          })
        // User already exists
        } else if (data.error === 'User already exists') {
          this.error = 'Este usuário já está cadastrado'
        } else {
          logger.error(error)
        }
      }
    }
  },
  beforeMount () {
    this.email = this.login
    this.emailError = false
    this.passwordError = false
    this.nameError = false
    this.phoneError = false
  }
}
</script>
<style lang="scss" scoped>
  .all-page {
    height: auto;
  }
  .login-footer {
    margin: 20px 0px;
  }
</style>
