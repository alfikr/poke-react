import {Component,useState} from 'react'
import {Container,List,ListItem,Avatar,Card,
CardContent,ListItemText, Button} from '@material-ui/core'
import PokeService from '../service/PokeService'
export default class MyPoke extends Component{
    constructor(props){
        super(props)
        this.state={
            pokemon:[]
        }
    }
    handleLepas(e){
        console.log(e)
    }
    getListData(){
        PokeService.GetAllMyPokemon().then(data=>{
            this.setState({
                pokemon:data,
            })
            // console.log(data)
        },err=>{
            console.log(err)
        })
        return(
            <List dense>
            {this.state.pokemon.length>=1?this.state.pokemon.map(e=>{
            return <ListItem key={e.id}>
                <Card>
                    <CardContent>
                        <Container>
                            <Avatar src={e.image}>
                            </Avatar>
                            {e.name}
                           <Button onClick={this.handleLepas(e)}>Lepaskan</Button>
                        </Container>
                    </CardContent>
                </Card>
            </ListItem>
        }):<ListItem>
            <ListItemText>Belum ada data tersedia
                </ListItemText></ListItem>}
        </List>
        )
    }
    render(){
        return(<Container>
            <h2>My Pokemon List</h2>
            {this.getListData()}
        </Container>)
    }
}