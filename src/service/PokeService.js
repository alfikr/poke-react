import Axios from 'axios'
export default{
    getPokemon:(limit,size)=>{
        return Axios.get(process.env.REACT_APP_POKE_API_URL
            +'pokemon?limit='+limit+'&offset='+size).then(res=>{
                return Promise.resolve(res.data)
            })
    },
    getNextPoke(uri){
        return Axios.get(uri).then(res=>{
            return Promise.resolve(res.data)
        })
    },
    getPokeDetail:(id)=>{
        return Axios.get(process.env.REACT_APP_POKE_API_URL
            +'pokemon/'+id).then(res=>{
                return Promise.resolve(res.data)
            })
    },
    storePokemon:async(value)=>{
        //TODO check exist data
        
        
        return Promise.resolve('helo')
    },
    getAllMyPokemon:()=>{
        return null;
    }
}

