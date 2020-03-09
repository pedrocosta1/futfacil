<template>
  <section class="router-view">
    <Loading v-if="loading"/> 
    <div class="main-content" v-if="!loading">
      <div class="fut-player-card">
        <div class="player-card-top">
          <div class="player-master-info">
            <div class="player-rating">
              <span>{{overall}}</span>
            </div>
            <div class="player-position">
              <span>{{position}}</span>
            </div>
            <div class="player-nation">
              <img :src="nationality" alt="Argentina" draggable="false">
            </div>
            <div class="player-club">
              <img :src="club" alt="Barcelona" draggable="false">
            </div>
          </div>
          <div class="player-picture">
            <img :src="picture" alt="Messi" draggable="false">
          </div>
        </div>
        <div class="player-card-bottom">
            <div class="player-info">
                <div class="player-name">
                  <span>MESSI</span>
                </div>
                <div class="player-features">
                    <div class="player-features-col">
                      <span class="player-feature-value">97</span>
                      <span class="player-feature-title">PAC</span>
                      <span class="player-feature-value">95</span>
                      <span class="player-feature-title">SHO</span>
                      <span class="player-feature-value">94</span>
                      <span class="player-feature-title">PAS</span>
                    </div>
                    <div class="player-features-col">
                      <span class="player-feature-value">99</span>
                      <span class="player-feature-title">DRI</span>
                      <span class="player-feature-value">35</span>
                      <span class="player-feature-title">DEF</span>
                      <span class="player-feature-value">68</span>
                      <span class="player-feature-title">PHY</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    // Utilizar a sigla que vem do banco para mudar na variavel Nationality // 
    return {
      Loading: false,
      nationality: `https://www.countryflags.io/ar/flat/64.png`,
      club: 'https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg',
      picture: 'https://selimdoyranli.com/cdn/fut-player-card/img/messi.png',
      overall: 97,
      position: 'MC'
    }
  }
}
</script>
