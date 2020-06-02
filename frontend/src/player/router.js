import Vue from 'vue'
import Router from 'vue-router'

import Main from './component/Main.vue'
import Player from './component/Player.vue'
import Hability from './component/Hability.vue'
import RentField from './component/RentField.vue'
import FieldImages from './component/FieldImages.vue'
import RentFields from './component/RentFields.vue'
import RentedFields from './component/RentedFields.vue'
import RentedField from './component/RentedField.vue'
import Teams from './component/Teams.vue'
import Team from './component/Team.vue'
import TeamPlayers from './component/TeamPlayers.vue'
import TeamPlayer from './component/TeamPlayer.vue'
import TeamAccepts from './component/TeamAccepts.vue'
import TeamAccept from './component/TeamAccept.vue'
import Challenge from './component/Challenge.vue'
import Challenges from './component/Challenges.vue'
import Challenged from './component/Challenged.vue'
import RandomTeam from './component/RandomTeam.vue'
import CreditCard from './component/CreditCard.vue'


Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/hability',
      name: 'hability',
      component: Hability
    },
    {
      path: '/rent',
      name: 'rents',
      component: RentFields
    },
    {
      path: '/rent/:fieldId',
      name: 'rent',
      component: RentField,
      props: true
    },
    {
      path: '/rent/:fieldId/images',
      name: 'fieldImages',
      component: FieldImages,
      props: true
    },
    {
      path: '/rented',
      name: 'renteds',
      component: RentedFields
    },
    {
      path: '/rented/:id',
      name: 'rentedField',
      component: RentedField,
      props: true
    },
    {
      path: '/team',
      name: 'teams',
      component: Teams
    },
    {
      path: '/team/:id',
      name: 'team',
      component: Team,
      props: true
    },
    {
      path: '/team/:id/challenge/:idC',
      name: 'Challenge',
      component: Challenge,
      props: true
    },
    {
      path: '/team/:id/challenges',
      name: 'Challenges',
      component: Challenges,
      props: true
    },
    {
      path: '/team/:id/challenged',
      name: 'Challenged',
      component: Challenged,
      props: true
    },
    {
      path: '/team/:id/players',
      name: 'TeamPlayers',
      component: TeamPlayers,
      props: true
    },
    {
      path: '/team/:id/players/:playerId',
      name: 'TeamPlayer',
      component: TeamPlayer,
      props: true
    },
    {
      path: '/team/:id/accept',
      name: 'TeamAccepts',
      component: TeamAccepts,
      props: true
    },
    {
      path: '/team/:id/accept/:acceptId',
      name: 'TeamAccept',
      component: TeamAccept,
      props: true
    },
    {
      path: '/random',
      name: 'RandomTeam',
      component: RandomTeam,
    },
    {
      path: '/credit-card',
      name: 'CreditCard',
      component: CreditCard,
    }
  ]
})
