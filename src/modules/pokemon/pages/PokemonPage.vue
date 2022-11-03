<template>
    <h1>Pokemon: <span>{{ id }}</span></h1>
    <div v-if="pokemon">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pokemon: null
        }
    },
    created() {
        // const { id } = this.$route.params
       this.getPokemons()
    },
    methods: {
        async getPokemons() {
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${ this.id }`).then(r=> r.json())
                this.pokemon = pokemon
                console.log(pokemon)
            } catch (error) {
                this.$router.push('/')
                console.log(error)
                console.log('No hay nada que hacer aqui')
            }
        }
    },
    // Watcher u observadores
    watch: {
        // Cuando id cambie haz esto
        id() {
            this.getPokemons()
        }
    }
}
</script>