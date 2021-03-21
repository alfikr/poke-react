import {  Fab } from '@material-ui/core'
import React,{useState,useCallback} from 'react'
import {useIndexedDB} from 'react-indexed-db'
import {connect} from 'react-redux'
import NavigationIcon from '@material-ui/icons/Navigation'
function AddData(props){
    const {add,getByIndex} = useIndexedDB('pokemon')
    const [poke, setpoke] = useState()
    const [dialog, setDialog] = useState()
    useCallback(()=>{

    })
    const showDialogNickName=(id)=>{

    }
    const handleClick=()=>{
        
        // if(poke){
        //     console.log('data ada')
            
        // }
        // getByIndex('name',props.detail.name).then(a=>{
        //     setpoke(a);
        //     console.log(a)
        // },err=>{
        //     console.log(err)
        // })
        let pick = Math.random() > 0.5;
        console.log(pick)
        if(pick){
            
            add({name:props.detail.name,url:process.env.REACT_APP_POKE_API_URL
                +'pokemon/'+props.detail.id})
            .then(e=>{
                console.log('id',e)
                showDialogNickName(e)
            },err=>{
                console.error(err)
                alert('pokemon sudah ditangkap')
            })
        }else{
            alert("Pokemon gagal ditangkap")
        }
        
    }
    return <div>
        <Fab variant="extended" onClick={handleClick}>
    <NavigationIcon/>Tangkap
</Fab>
    </div>
}

export default connect()(AddData)