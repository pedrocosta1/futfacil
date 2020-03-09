<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Imagem do Campo: {{name}}
        </div>
        <div class="close" @click="$router.push(`/fields`)">
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
            <div class="box-header">
              <form class="form" enctype="multipart/form-data">
                <div class="form-group">
                  <label>Selecione as Fotos</label>
                  <input type="file" name="file" multiple @change="onFileChangeMultiple">
                  <span v-if="error.indexOf('file') > -1">Ops! Ta faltando o Celular</span>
                </div>
                <span class="text-warn">Limite de 4 Imagens por Campo</span>
              </form>
            </div>
            <Loading v-if="loadingImage" />
            <div class="box-body" v-if="!loadingImage">
              <div class="box-image" v-for="fieldImage in fieldImages" :key="fieldImage.id" >
                <IconEdit class="icon"/>
                <img :src="fieldImage.photo">
                <div class="box-option">
                  <input type="file" name="file" class="input-image" @change="onFileChangeSingle">
                  <button class="btn" @click="updatePhoto(fieldImage.id)">Editar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-add" @click="save">
            <span>Salvar</span>
            <IconEdit />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { get } from '../api/field'
import { get as getImages, create, update } from '../api/fieldImages'

export default {
  props: ['id'],
  data () {
    return {
      field: [],
      error: [],
      fieldImages: [],
      photo: null,
      loading: true,
      recallFirst: false,
      editable: false,
      loadingImage: true
    }
  },
  computed: {
     ...mapState(['client']),
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    } 
    this.loadingImage = false
    this.loading = false    
  },
  methods: {
    async save () {
      try {
        if (this.editable) {
        } else {
          await create(
            this.id,
            this.photo
          )
          this.$router.push(`/fields`)
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') {
          this.error = data.fields
        }
      }
    },
    async updatePhoto (id) {
      this.loadingImage = false
      await update(
        id,
        this.photo
      )
    },
    async onFileChangeMultiple (event) {
      this.photo = event.target.files
    },
    async onFileChangeSingle (event) {
      this.photo = event.target.files[0]
    },
    async getMounted () {
      this.loading = true
      this.fieldImages = await getImages(this.id)
      this.fieldImages.map(x => x.photo = "img/fields/" + x.photo)
      const fieldDetails = await get(this.id)
      this.name = fieldDetails.name
      this.edit = true
      this.loadingImage = false
      this.loading = false
    },
    async cancel () {
      await this.getMounted()
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-body {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    .box-image {
      display: flex;
      flex-direction: column;
      position: relative;
      border: 1px solid #fff;
      height: auto;
      width: 50%;
      .icon {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 0;
        bottom: 0;
        opacity: 0;
      }
      img {
        padding: 10px;
        width: 100%;
        height: 100%;
      }
    }
    .box-option {
      display: flex;
      flex-direction: column;
      padding: 10px;
      .btn {
        margin-top: 10px;
      }
    }
  }
</style>