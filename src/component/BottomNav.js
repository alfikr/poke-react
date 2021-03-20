import React from 'react'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import {ReactSVG} from 'react-svg'

export default class BottomNav extends React.Component{
   
   
   componentDidMount(){
    this.setState({
        value:'list'
    })
   }
    render(){
        return(
            <BottomNavigation
            value={this.state==null?'list':this.state.value}
            onChange={this.props.handleChange}
            showLabels>
                <BottomNavigationAction value="0" label="Pokemon List" icon={<ReactSVG src="../assets/images/PokemonSymbol.svg"/>}/>
                <BottomNavigationAction value="1" label="My Pokemon" icon={<ReactSVG src="../assets/images/pokecam.svg"/>} />
            </BottomNavigation>
        );
    }
}