
import React from 'react'
import {Card,CardContent,Avatar,ButtonBase, Button} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import axios from 'axios'
import history from '../utils/history'
export default class PokeCard extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
        }
    }
    componentDidMount(){
        axios.get(this.props.poke.url).then(res=>{
            this.setState(
                {
                    image:res.data.sprites,
                    imageDefault:res.data.sprites.other["dream_world"]["front_default"],
                    types:res.data.types,
                    abilities:res.data.abilities,
                    forms:res.data.forms,
                    held_items:res.data.held_items,
                    game_indices:res.data.game_indices,
                    id:res.data.id,
                    isDefault:res.data.default,
                    location_area_encounters:res.data.location_area_encounters,
                    name:res.data.name,
                    past_types:res.data.past_types,
                    species:res.data.species,
                    stats:res.data.stats,
                    weight:res.data.weight,
                    isLoading:false,
                }
            )
            
            // console.log(res.data.sprites.other["dream_world"]["front_default"])
        })
    }
    handleClick(e){
        console.log(e)
        history.push('/detail?id='+this.state.id)
    }
    render(){
        return(
            <Card onClick={(event)=>{
                this.handleClick(this.props.poke)
            }}>
                <ButtonBase >
                <CardContent>
                    {this.state.isLoading?<div>
                        <Skeleton><Avatar /></Skeleton>
                        <Skeleton animation="wave" 
                    varian="rect" width={210} />
                    </div>:<div className="row">
                        <div className="col-6">
                        <Avatar src={this.state.imageDefault}/>
                        {this.props.poke.name}
                        </div>
                        <div className="col-6">
                            {this.props.release==null?<></>:<Button>Release</Button>}
                        </div>
                    </div>}
                </CardContent>
                </ButtonBase>
            </Card>
        )
    }
}