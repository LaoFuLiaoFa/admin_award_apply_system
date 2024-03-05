import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  // 配置映射关系
  routes: [
    {
      path: '/',
      redirect: '/LogIn'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    },
    {
      path: '/LogIn',
      component: () => import('@/views/login/LogIn.vue')
    },
    {
      path: '/MainPage',
      component: () => import('@/views/mains/MainPage.vue'),
      redirect: '/DoubleStar',
      children: [
        {
          path: '/DoubleStar',
          component: () => import('@/views/mains/doublestar/DoubleStar.vue')
        },
        {
          path: '/LearningProgress',
          component: () => import('@/views/mains/learning-progress/LearningProgress.vue')
        },
        {
          path: '/MatchStar',
          component: () => import('@/views/mains/matchstar/MatchStar.vue')
        },
        {
          path: '/ResearchStar',
          component: () => import('@/views/mains/researchstar/ResearchStar.vue')
        }
      ]
    }
  ]
});

export default router;
