<template>
  <section id="signon">
    <h4>Registrar</h4>
    <input v-model="email" type="text" placeholder="E-mail" :class="{ error : emailError || error }" />
    <span v-if="emailError" class="error">E-mail informado incorretamente</span>
    <span v-if="error" class="error">{{ error }}</span>
    <input v-model="password" type="password" placeholder="Senha" :class="{ error : passwordError }" />
    <span v-if="passwordError" class="error">Senha informada incorretamente</span>
    <select v-model="role">
      <option value="admin">Admin</option>
      <option value="user">Usuario</option>
    </select>
    <button @click="signOn" type="button">Confirmar</button>
  </section>
</template>

<script>
import logger from '../../logger'
import { setToken, loadModule } from '../../util'
import { signon } from '../api/auth'

export default {
  data () {
    return {
      email: null,
      emailError: false,
      password: null,
      passwordError: false,
      error: null,
      role: null
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
        } else {
          // Start user module
          loadModule('user', data.user)
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
  }
}
</script>

<style scoped>
  .error {
    border: 1px solid red;
    color: red;
  }
</style>
