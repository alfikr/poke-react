import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
export default class NotFound extends Component{
    
    goHome(){
        this.props.history.push('/')
    }
    render(){
        return(
        <div>
            <h4>Tidak ada page</h4>
            <br />
            <button onClick={goHome}>Kembali</button>
        </div>)
    }
}