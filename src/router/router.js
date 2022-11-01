// Importamos lo que haga falta del vue-router
import { createRouter, createWebHashHistory } from 'vue-router'

// Importamos los comonentes para las rutas
// import ListPage from '@/modules/pokemon/pages/ListPage.vue'
// import PokemonPage from '@/modules/pokemon/pages/PokemonPage.vue'
// import NoPageFound from '@/modules/shared/pages/NoPageFound.vue'

// Creamos un array de rutas los cuales consisten en paths y los components
const routes = [
    { 
        path: '/', 
        component: () => import(/*webpackChuckName:"ListPage"*/'@/modules/pokemon/pages/ListPage')
    },
    { 
        path: '/about', 
        component: () => import(/*webpackChuckName:"AboutPage"*/'@/modules/pokemon/pages/AboutPage')
    },
    { 
        path: '/id',
        //LazyLoad
        component: () => import('../modules/pokemon/pages/PokemonPage') 
        // component: PokemonPage
    },

    // Cualquier ruta que no haga match con mis rutas establecidas
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/*webpackChuckName:"NotFoundPage"*/'@/modules/shared/pages/NoPageFound')
    }
]

// Creamos el router enviandole las rutas que creamos antes y la configuracion de history
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  // exportamos
  export default router