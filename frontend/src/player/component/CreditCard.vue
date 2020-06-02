<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title" >
          {{'Cadastro de Cartao de Crédito'}}
        </div>
        <div class="close" @click="$router.push(`/`)">
          <IconClose/>
        </div>
      </div>
      <div class="content">
        <div class="credit-body">
          <div class="credit-two-box">
            <div class="credit-box-card">
              <div class="header">
                <div class="title">
                    Cartão de Crédito
                </div>
                <div class="close" @click="$router.push('/players')">
                  <IconClose/>
                </div>
              </div>
              <div class="body">
                <div class="number">
                  <label>{{name}}</label>
                </div>
                <div class="number">
                  <label>Numero:</label>
                  <label>{{number}}</label>
                </div>
                <hr>
                <div class="footer">
                  <div class="badge">
                    Padrão
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="credit-two-box">
            <div class="form">
              <div class="title">
                Adicionar
              </div>
              <div class="body">
                <div class="group">
                  <label>Identificação</label>
                  <input class="input" placeholder="Visa, MasterCard">
                </div>
                <div class="group">
                  <label>Numero do Cartão</label>
                  <input class="input" v-mask="['#### #### #### ####']" placeholder="____ ____ ____ ____">
                </div>
                <div class="group-two">
                  <div class="group-input">
                    <label>Vencimento do Cartão</label>
                    <input v-mask="['##/##']" placeholder="__/__">
                  </div>
                  <div class="group-input">
                    <label>CCV</label>
                    <input v-mask="['###']" placeholder="___">
                  </div>
                </div>
                <div class="group">
                  <label>Nome Impresso do Cartão</label>
                  <input class="input">
                </div>
                <div class="group-check">
                  <input type="checkbox" class="input" name="padrao">
                   <label for="padrao">Definir como Padrão</label>
                </div>
                <div class="button-group">
                  <div class="btn-save" @click="save">
                    {{edit ? 'Editar' : 'Salvar'}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { getAll, get, create, update, remove } from '../api/creditCard'


export default {
  computed: {
    ...mapState(['player'])
  },
  data () {
    return {
      error: [],
      creditCard: [],
      id: null,
      edit: false,
      accept: false,
      name: null,
      number: null,
      ccv: null,
      flag: null,
      validation: null,
      loading: true
    }
  },
  async mounted () {
    await this.getMounted()
  },
  methods: {
    async save () {
      try {
        this.loading = true
        if(this.id !== null) {
          await update(
            this.id,
            flag,
            numberCard,
            validation,
            ccv,
            name
          )
        } else {
          await create (
            flag,
            numberCard,
            validation,
            ccv,
            name,
            player
          )
        }
        this.loading = false
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
        this.loading = false
      }
    },
    async getMounted () {
      this.creditCard = await getAll(this.player.id)
      this.loading = false
      // this.fields = await getFields()
    },
  }
}
</script>

<style lang="scss" scoped>
  .credit-body {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .credit-two-box {
      width: 50%;
      .form {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 10px;
        background: #252439;
        border: 1px solid #f1f1f1;
        .title {
          margin-bottom: 20px;
          margin-left: 10px;
          text-align: center;
        }
        .body {
          display: flex;
          flex-direction: column;
          .group-two {
            display: flex;
            flex-direction: row;
            .group-input {
              display: flex;
              flex-direction: column;
              width: 50%;     
              margin: 10px;         
              input {
                margin-top: 4px;
                border-radius: 25px;
                outline: none;
                width: 100%;
              }
            }
          }
          .group-check {
            display: flex;
            flex-direction: row;
            margin: 10px;
            input {
              width: 10%;
            }
          }
          .group { 
            margin: 10px;
            .input {
              margin-top: 4px;
              border-radius: 25px;
              outline: none;
              width: 100%;
            }
          }
          .button-group {
            display: flex;
            margin: 10px;
            .btn-save {
              width: 100%;
              border-radius: 25px;
              padding: 10px;
              text-align: center;
              background: #2F2C85;
              cursor: pointer;
              opacity: .8;
              &:hover {
                opacity: 1;
              }
            }
          }
        }
      }
      .credit-box-card {
        display: flex;
        background: #252439;
        border: 1px solid #f1f1f1;
        border-radius: 15px;
        margin-bottom: 20px;
        margin-right: 10px;
        flex-direction: column;
        height: 200px;
        .header {
          margin: 10px;
          display: flex;
          align-items: center;
          .title { 
            padding-left: 15px;
            flex-grow: 1;
            text-transform: uppercase;
          }
          .close {
            flex-shrink: 0;
            width: 22px;
            height: 22px;
            color: white;
            cursor: pointer;
            opacity: .7;
            &:hover {
              opacity: 1;
            }
            svg {
              color: white;
              width: 20px;
              height: 20px;
            }
          }
        }
        .body {
          display: flex;
          margin: 10px;
          flex-grow: 1;
          flex-direction: column;
          .number {
            display: flex;
            padding: 15px;
            flex-direction: row;
          }
          .footer {
            display: flex;
            flex-grow: 1;
            padding-top: 10px;
            justify-content: flex-end;
            align-items: center;
            .badge {
              background: #c1c1c1;
              padding: 5px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
</style>
