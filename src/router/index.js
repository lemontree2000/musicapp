import Vue from 'vue';
import Router from 'vue-router';

// import Rank from 'components/rank/rank';
// import Recommend from 'components/recommend/recommend';
// import Search from 'components/search/search';
// import Singer from 'components/singer/singer';
// import SingerDetail from 'components/singer-detail/singer-detail';
// import Disc from 'components/disc/disc';
// import TopList from 'components/top-list/top-list';
// import UserCenter from 'components/user-center/user-center';

Vue.use(Router);

// 路由懒加载
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((recommend) => {
    resolve(recommend);
  });
};

const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module);
  });
};

const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module);
  });
};

const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module);
  });
};

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module);
  });
};

const Disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module);
  });
};

const TopList = (resolve) => {
  import('components/top-list/top-list').then((module) => {
    resolve(module);
  });
};
const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module);
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
});
