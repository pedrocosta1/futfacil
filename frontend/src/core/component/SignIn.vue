<template>
  <section class="all-page">
    <div class="box-login">
      <div class="login-header">
        <div class="back-header">
          <div class="box-svg" @click="$router.push('/')">
            <IconAngle class="rotate-up"/>
          </div>
        </div>
        <label>Faça o Login</label>
        <div class="line">
        </div>
      </div>
      <div class="login-body">
        <div class="box">
          <label>Login</label>
          <input v-model="login" type="text" placeholder="Informe o login" :class="{ 'input-error' : error.indexOf('login') > -1 || error.indexOf('disabled') > -1 || error.indexOf('invalid') > -1 }"/>
          <span v-if="error.indexOf('login') > -1">Ops! Ta faltando o login.</span>
          <span v-if="error.indexOf('disabled') > -1">Usuário desativado! Por favor entrar em contato.</span>
          <span v-if="error.indexOf('invalid') > -1"></span>
        </div>
        <div class="box"  >
          <label>Senha</label>
          <input v-model="password" type="password" placeholder="Informe a sua senha" :class="{'input-error' : error.indexOf('password') > -1 || error.indexOf('invalid') > -1 }"/>
          <span v-if="error.indexOf('password') > -1">Ops! Ta faltando a senha.</span>
          <span v-if="error.indexOf('invalid') > -1"> Login ou senha invalido!</span>
        </div>
      </div>
      <div class="login-footer">
          <button @click="signInOn" type="button" class="btn-login">Entrar</button>
          <span> Ou </span>
          <button @click="$router.push('/signon')" type="button" class="btn-login">Registre-se</button>
      </div>
    </div>
  </section>
</template>

<script>
import logger from '../../logger'
import { setToken, loadModule } from '../../util'
import { signin } from '../api/auth'
import IconAngle from '../../Icons/IconAngle'

export default {
  components: {
    IconAngle
	},
  data () {
    return {
      login: 'gau@dev.com.br',
      password: '123456',
      error: [],
      open: false
    }
  },
  methods: {
    async signInOn () {
      try {
        // Clean errors
        this.error = []
        // Sign in on frontend
        const { data } = await signin(this.login, this.password)
        // Set token on axios header
        setToken(data.token)
        this.$root.$destroy()
        if (data.user.role === 'admin') {
          // Start admin module
          loadModule('admin', data.user)
        } else if (data.user.role === 'client') {
          loadModule('client', data.user)
        } else {
          loadModule('player', data.user)
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        // Validation Error
        if (data.error === 'Validation error') {
          this.error = data.fields
        // Invalid login or password
        } else if (data.error === 'Invalid login or password') {
          this.error = ['invalid']
        // User disabled
        } else if (data.error === 'User disabled') {
          this.error = ['disabled']
        } else {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../_asset/scss/_variables.scss";

</style>
