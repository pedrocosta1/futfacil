<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="header">
        <div class="title">
          Imagem do Campo: {{name}}
        </div>
        <div class="close" @click="$router.push(`/rent/${fieldId}`)">
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
            <div class="box-body" v-if="fieldImages.length > 0">
              <div class="box-image" v-for="fieldImage in fieldImages" :key="fieldImage.id" >
                <IconEdit class="icon"/>
                <Loading v-if="loadingImage" />
                <img :src="fieldImage.photo" v-if="!loadingImage">
              </div>
            </div>
          </div>
        </div>
        <div class="button-group">
          <div class="btn-add" @click="$router.push(`/rent/${fieldId}`)">
            <span>Voltar</span>
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
import { get as getImages } from '../api/fieldImages'

export default {
  props: ['fieldId'],
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
     ...mapState(['player']),
  },
  async mounted () {
    if (this.id !== 'new') {
      await this.getMounted()
    } 
    this.loadingImage = false
    this.loading = false    
  },
  methods: {
    async getMounted () {
      this.loading = true
      this.fieldImages = await getImages(this.fieldId)
      this.fieldImages.map(x => x.photo = "img/fields/" + x.photo)
      const fieldDetails = await get(this.fieldId)
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
  .button-group {
    margin-top: 60px;
  }

</style>