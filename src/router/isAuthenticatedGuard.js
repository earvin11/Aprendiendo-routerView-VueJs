
const isAuthencatedGuard = async( to, from, next ) => {
    // console.log({ to, from, next })

    return new Promise( () => {

        const random = Math.random() * 100

        if( random > 50 ) {
            console.log('esta autenticado')
            next()
        }else{
            console.log('bloqueado por el isAuthenticatedGuard', random)
            next({ nmae: 'pokemon-home' })
        }

    })

}


export default isAuthencatedGuard