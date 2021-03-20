import { Fab } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import {useIndexedDB} from 'react-indexed-db'
import NavigationIcon from '@material-ui/icons/Navigation'
function AddData(props){
    const {add,getByIndex} = useIndexedDB('pokemon')
    const [poke, setpoke] = useState()
    useEffect(()=>{
        if(poke!=null){
            getByIndex('name',props.detail.name).then(a=>{
                setpoke(a);
            })
        }
    })
    const handleClick=()=>{
        
        if(poke){
            console.log('data ada')
            alert('Pokemon sudah ditangkap')
            return;
        }
        let pick = Math.random*0.5;
        if(pick){
            add({name:props.detail.name,url:process.env.REACT_APP_POKE_API_URL
                +'pokemon/'+props.detail.id})
            .then(e=>{
                alert('Selamat pokemon sudah berhasil ditangkap')
            },err=>{
                console.error(err)
            })
        }else{
            alert("Pokemon gagal ditangkap")
        }
        
    }
    return <Fab variant="extended" onClick={handleClick}>
    <NavigationIcon/>Tangkap
</Fab>
}

export default AddData