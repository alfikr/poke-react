import {Component} from 'react'
import {Container,Button,Fab,AppBar,Card, Grid,
    DialogTitle,CardContent, DialogActions,
    List,ListItem, ListItemText, Collapse, 
    TextField,
    Dialog, CircularProgress, Toolbar, DialogContent} from '@material-ui/core'
import PokeService from '../service/PokeService'
import {withRouter} from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import {capitalCase} from 'text-case'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NavigationIcon from '@material-ui/icons/Navigation'
import history from '../utils/history'
import { connect } from 'react-redux'
class PokeDetail extends Component{
    
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            isAbilityOpen:false,
            isStatOpen:false,
            isTipeOpen:false,
            prosesTangkap:false,
            dialogNickName:false,
            nickName:''
        }
        this.handleDetail=this.handleDetail.bind(this)
        this.abilityOpen=this.abilityOpen.bind(this)
        this.statOpen=this.statOpen.bind(this)
        this.handleNickClose=this.handleNickClose.bind(this)
        this.tangkap=this.tangkap.bind(this)
        this.handleSimpan=this.handleSimpan.bind(this)
        this.handleNickName=this.handleNickName.bind(this)
        this.handleNickClose=this.handleNickClose.bind(this)
        this.tipeOpen=this.tipeOpen.bind(this)
        }
    componentDidMount(){
        const id = new URLSearchParams(this.props.location.search).get("id")
        PokeService.getPokeDetail(id).then(res=>{
            // console.log(res)
            if(res){
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
            }else{
                this.props.pesanError('Request data gagal',()=>{
                    window.location.reload()
                })
            }
        },err=>{
            this.props.pesanError('Data tidak dapat ditemukan')
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
    tangkap(){
        this.setState({
            prosesTangkap:true,
        })
        let pick = Math.random() > 0.5;
        
        if(pick){
            //Input Nickname
            this.setState({
                dialogNickName:true
            })

        }else{
            this.props.pesanError('Gagal ditangkap');
        }
        this.setState({
            prosesTangkap:false,
        })
    }
    handleNickClose(){
        this.setState({
            dialogNickName:false
        })
    }
    handleNickName(event){
        this.setState({
            nickName:event.target.value
        })
    }
    handleSimpan(){
        PokeService.StorePokemon({
            id_poke:this.state.id,
            nick:this.state.nickName,
            name:this.state.name,
            url:this.state.url,
            image:this.state.imageDefault,
        }).then(res=>{},err=>{
            console.log(err)
            if(err.srcElement.error.name=="ConstraintError"){
                this.props.pesanError('Pokemon sudah ditangkap')
            }else{
                this.props.pesanError('Gagal simpan data')
            }
        })
        this.setState({
            dialogNickName:false,
        })
    }
    render(){
        return(<Container>
            <Dialog open={this.state.dialogNickName} 
            onClose={this.handleNickClose}>
                <DialogTitle>Masukkan Nick Name Pokemon</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense"
                    id="nickName" label="Nick Name"
                    onChange={this.handleNickName}
                    type="text" value={this.state.nickName}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSimpan}>Simpan</Button>
                    <Button onClick={this.handleNickClose}>Batal</Button>
                </DialogActions>
            </Dialog>
            <h2>Detail Pokemon</h2>
            <Card>
                <AppBar color="primary">
                    <Toolbar>
                        <Button onClick={this.kembaliHome}>
                            <ArrowBackIcon color="secondary" />
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
            <Fab variant="extended" onClick={this.tangkap}>
                {this.state.prosesTangkap?<CircularProgress/>:<NavigationIcon/>}
                Tangkap
            </Fab>
            </footer>
        </Container>)
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        pesanError:(event,aksi)=>dispatch({
            type:'ERROR',
            dialog:true,
            message:event,
            action:aksi
    })
    }
}
const mapStateToProps=(state)=>{
    return{

    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PokeDetail))