import Vue from 'vue';
import Router from 'vue-router';

import Rank from 'components/rank/rank';
import Recommend from 'components/recommend/recommend';
import Search from 'components/search/search';
import Singer from 'components/singer/singer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Rank',
      component: Rank
    },
    {
      path: '/Recommend',
      component: Recommend
    },
    {
      path: '/Search',
      component: Search
    },
    {
      path: '/Singer',
      component: Singer
    }
  ]
});
