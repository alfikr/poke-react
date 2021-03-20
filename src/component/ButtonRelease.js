import {useIndexedDB,} from 'react-indexed-db'
import {useState,useEffect} from 'react'
import {Button} from '@material-ui/core'
export default function ReleaseButton(props){
    const {getByID,deleteRecord} = useIndexedDB('pokemon')
    const [poke, setpoke] = useState()
    useEffect(()=>{
        getByID(props.detail.id).then(a=>{
            setpoke(a)
        })
    },[])
    const releasePoke=()=>{
        if(poke){
            deleteRecord(poke.id).then(e=>{
                alert('Pokemon dilepaskan')
                window.location.reload()
            },err=>{
                alert('Pokemon gagal dilepaskan')
            })
        }
    };
    return <Button key={props.detail.id} onClick={releasePoke}>Lepaskan</Button>
}