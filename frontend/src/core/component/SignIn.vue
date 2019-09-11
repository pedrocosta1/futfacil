<template>
  <section id="login">
    <h4>Entrar</h4>
    <input v-show="!showPass" v-model="login" ref="login" type="text" placeholder="E-mail"/>
    <input v-show="showPass" v-model="password" ref="password" type="password" placeholder="Senha"/>
    <span v-if="error" class="error">{{ error }}</span>
    <button @click="signInOn" type="button">{{ showPass ? 'Entrar' : 'Continuar' }}</button>
  </section>
</template>

<script>
import logger from '../../logger'
import { setToken, loadModule } from '../../util'
import { exist, signin } from '../api/auth'

export default {
  data () {
    return {
      login: 'matheus@risistemas.com.br',
      password: 'Teste123',
      showPass: false,
      error: null
    }
  },
  methods: {
    async signInOn () {
      try {
        // Clean errors
        this.error = null
        this.$refs.login.classList.remove('error')
        this.$refs.password.classList.remove('error')
        if (!this.showPass) {
          // Check if user already exists
          const { data } = await exist(this.login)
          if (data.exists) {
            // User found
            this.showPass = true
          } else {
            // Redirect to signon
            this.$router.push({ path: '/signon', query: { login: this.login } })
          }
        } else {
          // Sign in on frontend
          const { data } = await signin(this.login, this.password)
          // Set token on axios header
          setToken(data.token)
          this.$root.$destroy()
          if (data.user.role === 'admin') {
            // Start admin module
            loadModule('admin', data.user)
          } else {
            // Start user module
            loadModule('user', data.user)
          }
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        // Validation error
        if (data.error === 'Validation error') {
          data.fields.map(x => {
            if (x === 'login') {
              this.showPass = false
              this.$refs.login.classList.add('error')
              this.error = 'Login inválido'
            } else if (x === 'password') {
              this.showPass = true
              this.$refs.password.classList.add('error')
              this.error = 'Senha inválida'
            }
          })
        // Invalid login or password
        } else if (data.error === 'Invalid login or password') {
          this.error = 'E-mail ou senha incorretos'
        // User disabled
        } else if (data.error === 'User disabled') {
          this.showPass = false
          this.$refs.login.classList.add('error')
          this.error = 'Este usuário está desativado'
        } else {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
  .error {
    border: 1px solid red;
    color: red;
  }
</style>
