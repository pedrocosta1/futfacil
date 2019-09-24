<template>
  <section class="signin">
    <div class="logo">
      <img src="img/whorus-logo-white.png" />
    </div>
    <div class="divider"></div>
    <div class="login-box">
      <form @submit.prevent class="form">
        <div class="form-group" :class="{ 'error' : error.indexOf('login') > -1 || error.indexOf('disabled') > -1 || error.indexOf('invalid') > -1 }">
          <label>Login</label>
          <input v-model="login" type="text" placeholder="Informe o login" />
          <span v-if="error.indexOf('login') > -1">Ops! Ta faltando o login.</span>
          <span v-if="error.indexOf('disabled') > -1">Usuário desativado! Por favor entrar em contato.</span>
          <span v-if="error.indexOf('invalid') > -1"></span>
        </div>
        <div class="form-group" :class="{'error' : error.indexOf('password') > -1 || error.indexOf('invalid') > -1 }" >
          <label>Senha</label>
          <input v-model="password" type="password" placeholder="Informe a sua senha" />
          <span v-if="error.indexOf('password') > -1">Ops! Ta faltando a senha.</span>
          <span v-if="error.indexOf('invalid') > -1"> Login ou senha invalido!</span>
        </div>
        <div class="button-group button-group-right">
          <button @click="$router.push('/')" type="button" class="btn" style="margin-right: 5px">Voltar</button>
          <button @click="signInOn" type="button" class="btn">Entrar</button>
        </div>
        <Register v-if="open" :closeModal="closeModal"/>
      </form>
    </div>
  </section>
</template>

<script>
import logger from '../../logger'
import { setToken, loadModule } from '../../util'
import { signin } from '../api/auth'

export default {
  data () {
    return {
      login: 'julio@risistemas.com.br',
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
        const data = await signin(this.login, this.password)
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

.signin {
  background-color: $color-primary;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    max-width: 200px;
    margin: 50px 0;
    img {
      width: 100%;
      height: auto;
    }
  }

  .login-box {
    min-width: 280px;
    max-width: 300px;
    padding: 15px;
    margin: 0 20px;
  }

  .divider {
    display: none;
  }
}

@media screen and (min-width: $width-desktop) {

  .signin {
    flex-direction: row;
    justify-content: center;
  }

  .divider {
    display: block !important;
    height: 225px;
    border-right: 2px groove #fff;
    margin: 0 100px;
  }
}
</style>
