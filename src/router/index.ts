import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LearningMap from '../views/LearningMap.vue'
import Lesson from '../views/Lesson.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map',
    name: 'LearningMap',
    component: LearningMap
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: Lesson,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
