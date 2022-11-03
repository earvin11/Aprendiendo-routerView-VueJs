// Importamos lo que haga falta del vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthencatedGuard from './isAuthenticatedGuard'

// Importamos los comonentes para las rutas
// import ListPage from '@/modules/pokemon/pages/ListPage.vue'
// import PokemonPage from '@/modules/pokemon/pages/PokemonPage.vue'
// import NoPageFound from '@/modules/shared/pages/NoPageFound.vue'

// Creamos un array de rutas los cuales consisten en paths y los components
const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import('@/modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home',
                name: 'pokemon-home', // para llamarlos por name en router link
                component: () => import(/*webpackChunkName:"ListPage"*/'@/modules/pokemon/pages/ListPage')
            },
            { 
                path: 'about',
                name: 'pokemon-about', 
                component: () => import(/*webpackChunkName:"AboutPage"*/'@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: 'pokemonid/:id',
                name: 'pokemon-id',
                //LazyLoad
                component: () => import('../modules/pokemon/pages/PokemonPage'), 
                // component: PokemonPage
        
                // Para enviarle props al compoente desde la ruta
                // se recibe una ruta, se destructura y valida la prop a enviar al componente
                props: ( route ) => {
                    // Parsea el valor que venga en los params como id
                    const id = Number( route.params.id )
                    // Si es not a number regresa 1 sino el id
                    return isNaN( id ) ? { id: 1 } : { id }
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },

    //DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthencatedGuard ],
        component: () => import('@/modules/dbz/layouts/DragonBallLayout.vue'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import('@/modules/dbz/pages/Characters.vue')
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import('@/modules/dbz/pages/About.vue')
            },
            {
                path: '',
                redirect: { name: 'dbz-about' }
            }
        ]
    },

    // Cualquier ruta que no haga match con mis rutas establecidas
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/*webpackChunkName:"NotFoundPage"*/'@/modules/shared/pages/NoPageFound')
    }
]

// Creamos el router enviandole las rutas que creamos antes y la configuracion de history
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })


  //Guard global - sincrono
// router.beforeEach( (to, from, next) => {
//     // console.log({ to, from, next })

//     const random = Math.random() * 100
//     // Si el valor de random es mayor a 50, ejecuta el next y dejalo avanzar
//     if( random > 50 ) {
//         console.log('autenticado')
//         next()
//     }else{
//         // Sino, ejecuta el next enviando al usario a la ruta con el name 'pokemon-home'
//         console.log(random, 'unauthorized')
//         next({ name: 'pokemon-home' })
//     }
// })

 // Guard global - asincrono

// const canAccess = () => {
//     return new Promise( resolve => {
//         const random = Math.random() * 100

//         if( random > 50 ) {
//             console.log('Athorized - canAccess')
//             resolve(true)
//         }else{
//             console.log(random, 'Unathorized - canAccess')
//             resolve(false)
//         }
//     })
// }

// router.beforeEach( async( to, from, next ) => {
//     const authorized = await canAccess()

//     authorized 
//         ? next() 
//         : next({ name: 'pokemon-home' })
// })

  // exportamos
  export default router