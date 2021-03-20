import {Component,useState} from 'react'
import {Container} from '@material-ui/core'
import ListPoke from '../service/ListPoke'
export default class MyPoke extends Component{
    
    render(){
        return(<Container>
            <h2>My Pokemon List</h2>
            <ListPoke />
        </Container>)
    }
}