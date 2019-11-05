<template>
  <section class="signin">
    <div class="nav-bar" :class=" !navbar ? '' : 'nav-bar-fixed' ">
      <div class="nav-item">
        <img src="img/whorus-logo-white.png" class="item-photo"/>
      </div>
      <div class="nav-option">
        <div class="nav-item">
          <a href="#solution" v-scroll-to="'#solution'">
            <h1>Nossa Solução</h1>
          </a>
        </div>
        <div class="nav-item">
          <a href="#clients" v-scroll-to="'#clients'">
            <h1>Clientes</h1>
          </a>
        </div>
        <div class="nav-item">
          <a href="#plans" v-scroll-to="'#plans'">
            <h1>Planos</h1>
          </a>
        </div>
        <div class="nav-item">
          <h1 @click="$router.push('/signin')">Login</h1>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-item" id="solution">
        <div class="box-description">
          <h1>Nossa Solução</h1>
          <div class="box-subtitle">
            Aproveite um mês de testes gratuito, com suporte pelo WhatsApp!
          </div>
        </div>
        <div class="box-grid">
          <div class="box-group">
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
              Gerenciamento dos seus Agendamentos, tipos Avulso, Mensalista, Escolinha e "Outros", de qualquer lugar do mundo pela internet, por você e seus funcionários!
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
              Seus clientes podem fazer reservas Avulsos online! Também pode ser integrado no seu website
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
          </div>
          <div class="box-group">
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
          </div>
          <div class="box-group">
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="box-grid">
          <div class="box-group">
            <div class="box-item-description">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="circle-photo"/>
              </div>
              <div class="text-description"> Eu recomendo WebQuadras. E quem não aceita minha indicação, está perdendo tempo e dinheiro. </div>
            </div>
            <div class="box-autorization">Aurélio Mello, proprietário, Porto Alegre - RS, www.amellotenis.com.br</div>
          </div>
        </div>
      </div>
      <div class="box-item" id="clients">
        <div class="box-description">
          <h1>ALGUNS DOS NOSSOS CLIENTES</h1>
          <div class="box-subtitle">
            Venha você Também
          </div>
        </div>
        <div class="box-grid">
          <div class="box-group">
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
              Gerenciamento dos seus Agendamentos, tipos Avulso, Mensalista, Escolinha e "Outros", de qualquer lugar do mundo pela internet, por você e seus funcionários!
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
              Seus clientes podem fazer reservas Avulsos online! Também pode ser integrado no seu website
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
          </div>
          <div class="box-group">
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
            <div class="box-item">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="photo"/>
              </div>
            Disparo de e-mails de confirmação para Clientes e Professores a cada agendamento ou cancelamento.
            </div>
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="box-grid">
          <div class="box-group">
            <div class="box-item-description">
              <div class="box-photo">
                <img src="img/whorus-logo-white.png" class="circle-photo"/>
              </div>
              <div class="text-description"> .. digo mais, o WebQuadras é fundamental para o bom funcionamento de um Centro Esportivo. </div>
            </div>
            <div class="box-autorization">Fábiano Locks, proprietário, Florianópolis - www.estacaodabola.com.br</div>
          </div>
        </div>
      </div>
      <div class="box-item" id="plans">
        <div class="box-description">
          <h1>Planos e Preços</h1>
          <div class="box-subtitle">
            Venha você Também
          </div>
        </div>
        <div class="box-grid">
          <div class="box-group">
            <div class="two-itens">
              <div class="header-table">Básico</div>
              <div class="subtitle-table">Proposta sob medida</div>
              <div class="table-grid">
                <div class="table-item">
                  INCLUI
                </div>
                <div class="table-item">
                  Um mês de teste sem compromisso
                </div>
                <div class="table-item">
                  Gestão de Agendamentos (Avulso,Mensalista,Escolinha,outro)
                </div>
                <div class="table-item">
                  App para Iphone e Android
                </div>
              </div>
            </div>
            <div class="two-itens">
              <div class="header-table">AVANÇADO</div>
              <div class="subtitle-table">Proposta sob medida</div>
              <div class="table-grid">
                <div class="table-item">
                  TUDO DO BÀSICO +
                </div>
                <div class="table-item">
                  Reservas online(com ou sem pagamento antecipado)
                </div>
                <div class="table-item">
                  Confirmações(por e-mail e sms)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-item" id="plans">
        <div class="box-description">
          <h1>Fale conosco</h1>
        </div>
        <div class="box-grid">
          <div class="box-group">
            <form class="form">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="name">
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input v-model="phone">
              </div>
              <div class="form-group">
                <label>email</label>
                <input v-model="email">
              </div>
              <div class="form-group">
                <label>Breve Descrição</label>
                <textarea cols="75" rows="20" v-model="description"/>
              </div>
              <div class="footer-button">
                <div class="button-primary">
                  Confirmar
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      login: 'julio@risistemas.com.br',
      password: '123456',
      error: [],
      open: false,
      navbar: false,
      navbarSize: 60
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      if (window.pageYOffset) {
        this.navbar = true
      } else {
        this.navbar = false
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
  .nav-bar-fixed {
    position: fixed !important;
    top: 0 !important;
    width: 100% !important;
  }
  .nav-bar {
    display: flex;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid white;
    background-color: #100335;
    a {
      color: white;
    }
    a:link {
      text-decoration:none;
      color: white;
    }
    .nav-item {
      &:hover {
        background: #2e00ac;
      }
      display: flex;
      flex-grow: 1;
      width: 20%;
      height: 100%;
      align-items: center;
      justify-content: center;
      .item-photo {
        height: 50%;
      }
    }
    .nav-option {
      display: flex;
      flex-direction: row;
      width: 50%;
    }
  }

  .box {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    .box-item {
      padding: 10px;
      width: 100%;
      border-bottom: 1px solid white;
      .box-description{
        display: flex;
        padding: 20px 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .box-grid {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .box-group {
          display: flex;
          width: 70%;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 10px;
        }
        .form {
          align-items: center;
          justify-content: center;
          width: 100%;
          .footer-button {
            display: flex;
            width: 50%;
            flex-direction: row;
            justify-content: center;
            .button-primary {
              display: flex;
              padding: 10px;
              border-radius: 5px;
              align-items: center;
              justify-content: center;
              background: #100335;
              width: 100%;
              height: 40px;
            }
          }
          .form-group {
            width: 50%;
          }
        }
        .two-itens {
          display: flex;
          align-items: center;
          width: 50%;
          flex-direction: column;
          border: 1px solid #c1c1c1;
          .header-table {
            display: flex;
            align-items: center;
            justify-content: center;
            background: blue;
            text-transform: uppercase;
            height: 20px;
            width: 100%;
          }
          .subtitle-table {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgb(126, 126, 248);
            text-transform: uppercase;
            height: 50px;
            width: 100%;
          }
          .table-grid {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            width: 100%;
            .table-item {
              display: flex;
              width: 100%;
              padding: 10px;
            }
          }
        }
        .box-item {
          width: 30%;
          border-bottom: none;
        }
        .box-photo {
          display: flex;
          align-items: center;
          justify-content: center;
          .photo {
            height: 50%;
            width: 50%;
          }
          .circle-photo {
            border-radius: 50%;
            height: 60px;
            width: 60px;
          }
        }
        .box-item-description {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: center;
          align-items: center;
          .text-description {
            margin-left: 20px;
          }
        }
        .box-autorization {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
      }
    }
  }

  .divider {
    display: none;
  }
}

@media screen and (min-width: $width-desktop) {

  .signin {
    flex-direction: column;
  }

  .divider {
    display: block !important;
    height: 225px;
    border-right: 2px groove #fff;
    margin: 0 100px;
  }
}
</style>
