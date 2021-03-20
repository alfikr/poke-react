import {useIndexedDB,} from 'react-indexed-db'
import {useState,useEffect} from 'react'
import {List,ListItemText, ListItem,Card,CardContent,Container, Avatar, Button} from '@material-ui/core'
import ButtonRelease from '../component/ButtonRelease'
function ShowAll(){
    const {getAll} = useIndexedDB('pokemon')
    const [pokemon, setpokemon] = useState(null)
    useEffect(() => {
        getAll().then(data=>{
            setpokemon(data)
        })
        
    }, []);
    
    return (
    <List dense>
        {pokemon!==null?pokemon.map(e=>{
            return <ListItem key={e.id}>
                <Card>
                    <CardContent>
                        <Container>
                            <Avatar>

                            </Avatar>
                            {e.name}
                            <ButtonRelease detail={e} />
                        </Container>
                    </CardContent>
                </Card>
            </ListItem>
        }):<ListItem>
            <ListItemText>Belum ada data tersedia</ListItemText></ListItem>}
    </List>)
}

export default ShowAll