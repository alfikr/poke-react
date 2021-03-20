import React,{Component} from 'react'
import PokeService from '../service/PokeService' 
import PokeCard from '../component/PokeCard' 
import {Container, Card,AppBar,Toolbar,ListItemText,List,ListItem, CardContent} from '@material-ui/core'
let ticking=false;
let lastScrollY =0;
export default class ListPoke extends Component{
    
    constructor(props){
        super(props);
        this.state={
            items:[],
            total:0,
            prev:'',
            next:'',
            offset:0,
            limit:10,
        }
        this.list=React.createRef();
        this.handleScroll=this.handleScroll.bind(this)
    }
    componentDidMount(){
        PokeService.getPokemon(this.state.limit,this.state.offset)
        .then(val=>{
            console.log('poke service',val)
            this.setState({
                total:val.count,
                next:val.next,
                prev:val.previous,
                items:val.results
            })
            console.log(val.next)
        })
        window.addEventListener('scroll',this.handleScroll)
    }
    handleScroll(){
        const that = this;
        lastScrollY = window.scrollY;
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if(windowBottom>=docHeight){
            let a = this.state.items;
            console.log('bottom',that.state)
            PokeService.getNextPoke(this.state.next).then(r=>{
                r.results.map(e=>{
                    a.push(e)
                })
                console.log(a.length)
                this.setState({
                    items:a,
                    next:r.next,
                    prev:r.previous
                })
            })
        }
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll)
    }
    
    getListData(){
        return this.state.items.map(e=>{
            return(
                <ListItem key={e.name} >
                    <ListItemText>
                        <PokeCard poke={e}/>
                    </ListItemText>
                </ListItem>
            );
        });
    }
    render(){
        return(<Container ref={this.list}>
            <Card>
            <AppBar position="static">
                <Toolbar>
                <h2>List Pokemon</h2>
                </Toolbar>
            </AppBar>
            <CardContent>
            <List dense >
                {this.getListData()}
            </List>
            </CardContent>
            </Card>
        </Container>)
    }
}