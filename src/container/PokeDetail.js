import {Component} from 'react'
import {Container,Button,AppBar,Card, Grid,DialogTitle,CardContent, List,ListItem, ListItemText, Collapse, Dialog, CircularProgress, Toolbar} from '@material-ui/core'
import PokeService from '../service/PokeService'
import {withRouter} from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import {capitalCase} from 'text-case'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import PutarRoda from '../service/PutarRoda'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from '../utils/history'
class PokeDetail extends Component{
    
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            isAbilityOpen:false,
            isStatOpen:false,
            isTipeOpen:false,
            dialogTangkap:false,
        }
        this.handleDetail=this.handleDetail.bind(this)
        this.abilityOpen=this.abilityOpen.bind(this)
        this.statOpen=this.statOpen.bind(this)
        this.tipeOpen=this.tipeOpen.bind(this)
        
        // pokeArr.push({
        //     name:that.state.name,
        //     url:process.env.REACT_APP_POKE_API_URL
        //     +'pokemon/'+that.state.id
        // })
        // localStorage.setItem('myPoke',JSON.stringify(pokeArr)) = this.tangkap.bind(this)
    }
    componentDidMount(){
        const id = new URLSearchParams(this.props.location.search).get("id")
        PokeService.getPokeDetail(id).then(res=>{
            console.log(res)
            this.setState({
                image:res.sprites,
                imageDefault:res.sprites.other["official-artwork"]["front_default"],
                types:res.types,
                abilities:res.abilities,
                forms:res.forms,
                held_items:res.held_items,
                game_indices:res.game_indices,
                id:res.id,
                isDefault:res.default,
                location_area_encounters:res.location_area_encounters,
                name:res.name,
                past_types:res.past_types,
                species:res.species,
                stats:res.stats,
                weight:res.weight,
                isLoading:false,
            })
            console.log(this.state.imageDefault)
        })
    }
    kembaliHome(){
        history.push('/')
    }
    handleDetail(c,a){
        switch(c){
            case 1:
                this.setState({
                    isStatOpen:a
                })
                break;
            case 2:
                this.setState(
                    {
                        isTipeOpen:a
                    }
                )
                break;
            default:
                this.setState({isAbilityOpen:a})
        }
    }
    getCollapseItem(i){
        switch(i){
            case 1:
                return(<Collapse in={this.state.isStatOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.state.stats.map(e=>{
                            return(<ListItem key={e.stat.name}>
                                <ListItemText>
                                    {e.stat.name}
                                </ListItemText>
                                {e.base_stat}
                            </ListItem>)
                        })}
                    </List>
                </Collapse>)
                case 2:
                    return(<Collapse in={this.state.isTipeOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.types.map(e=>{
                                return(<ListItem key={e.slot}>
                                    <ListItemText>
                                        {e.type.name}
                                    </ListItemText>
                                </ListItem>)
                            })}
                        </List>
                    </Collapse>)
            default:
                return(<Collapse in={this.state.isAbilityOpen} 
                    timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.abilities.map(e=>{
                                return(<ListItem key={e.ability.name}>
                                    <ListItemText primary={e.ability.name}></ListItemText>
                                </ListItem>)
                            })}
                        </List>
                    </Collapse>)
        }
    }
    abilityOpen(){
        this.handleDetail(0,!this.state.isAbilityOpen)
    }
    statOpen(){
        this.handleDetail(1,!this.state.isStatOpen)
    }
    tipeOpen(){
        this.handleDetail(2,!this.state.isTipeOpen)
    }
    
    render(){
        
        return(<Container>
            <h2>Detail Pokemon</h2>
            <Card>
                <AppBar>
                    <Toolbar>
                        <Button onClick={this.kembaliHome}>
                            <ArrowBackIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <CardContent>
                    {this.state.isLoading?
                    <div>
                        <Skeleton varian="rect" 
                        width={400} height={400}/>
                    </div>:
                    <div>
                        <Grid container direction="row" 
                        spacing={3}>
                            <Grid item xs={12} md={4}>
                            <LazyLoadImage width={400} height={400} 
                        effect="blur"
                        src={this.state.imageDefault}></LazyLoadImage>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <h4>Details</h4>
                                <List component="nav">
                                    <ListItem button onClick={this.abilityOpen}>
                                    <ListItemText primary="Ability"/>
                                    {this.state.isAbilityOpen?<ExpandLess />:<ExpandMore />}
                                    </ListItem>
                                    {this.getCollapseItem(0)}
                                    <ListItem button onClick={this.statOpen}>
                                        <ListItemText primary="Stat"/>
                                        {this.state.isStatOpen?<ExpandLess />:<ExpandMore />}
                                    </ListItem>
                                    {this.getCollapseItem(1)}
                                    <ListItem button onClick={this.tipeOpen}>
                                        <ListItemText primary="Tipe"/>
                                        {this.state.isTipeOpen?<ExpandLess />:<ExpandMore />}
                                    </ListItem>
                                    {this.getCollapseItem(2)}
                                </List>
                            </Grid>
                        </Grid>
                        <h2>{capitalCase(this.state.name)}</h2>
                    </div>}
                </CardContent>
                
            </Card>
            <footer className="fab">
                <PutarRoda detail={
                    this.state
                } />
            {/* <Fab variant="extended" onClick={this.tangkap}>
                <NavigationIcon/>Tangkap
            </Fab> */}
            </footer>
            <Dialog open={this.state.dialogTangkap}>
            <DialogTitle id="fdafjkaljf">Proses tangkap</DialogTitle>
            <Container>
                <CircularProgress />
            </Container>
            </Dialog>
        </Container>)
    }
}

export default withRouter(PokeDetail)