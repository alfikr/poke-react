import Axios from 'axios'
import {useIndexedDB} from 'react-indexed-db'
export default{
    getPokemon:(limit,size)=>{
        return Axios.get(process.env.REACT_APP_POKE_API_URL
            +'pokemon?limit='+limit+'&offset='+size).then(res=>{
                return Promise.resolve(res.data)
            },err=>{
                return Promise.reject(err)
            })
    },
    getNextPoke(uri){
        return Axios.get(uri).then(res=>{
            return Promise.resolve(res.data)
        },err=>{
            return Promise.reject(err)
        })
    },
    getPokeDetail:(id)=>{
        return Axios.get(process.env.REACT_APP_POKE_API_URL
            +'pokemon/'+id).then(res=>{
                return Promise.resolve(res.data)
            },err=>{
                Promise.reject(err)
            })
    },
    StorePokemon:(value)=>{
        
        const {add}=useIndexedDB('pokemon')
        const tambah=()=>{
            console.log(value)
            return add({
                name:value.name,
                url:value.url,
                nick:value.nick,
                id_poke:value.id_poke,
                image:value.image,
            }).then(event=>{
                return Promise.resolve(event)
            },err=>{
                return Promise.reject(err)
            })
        }
        return tambah();
    },
    GetAllMyPokemon:()=>{
        const {getAll} = useIndexedDB('pokemon')
        const semua=()=>{
            return getAll().then(poke=>{
                return Promise.resolve(poke)
            },err=>{
                return Promise.reject(err)
            })
        }
        return semua();
    },
    HapusPokemon:(id)=>{
        const {deleteRecord}= useIndexedDB('pokemon')
        const hapus=()=>{
            return deleteRecord(id).then(res=>{
                return Promise.resolve(res)
            },err=>{
                return Promise.reject(err)
            })
        }
        return hapus();
    }
}

