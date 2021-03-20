import {Component} from 'react'
import BottomNav from '../component/BottomNav' 
import ListPoke from '../container/ListPoke'
import MyPoke from '../container/MyPoke'
export default class Home extends Component{
    constructor(){
        super();
        this.state={
            navSelected:0,
        }
        this.handleChange=this.handleChange.bind(this);
    }
    
    async handleChange(event,val){
        // console.log('val',val)
        await this.setState({
            navSelected:val
        })
        this.forceUpdate()
    }
    render(){
        return(<div>
            {this.state.navSelected==1?<MyPoke />:
            <ListPoke />
            }
            <div className="footer">
                <BottomNav handleChange={this.handleChange}/>
            </div>
        </div>)
    }
}