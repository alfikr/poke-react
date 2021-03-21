const createStore=require('redux')
const initialState ={
    dialog:{
        visible:false,
        message:''
    }
}
//Reducer
const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ERROR':
            return{
                ...state,
                dialog:action.dialog,
                message:action.message
            }
    }
}
//Store
const store = createStore(rootReducer)
console.log(store.getState())

// Dispatch
store.dispatch({type:'ADD_POKEMON'})
store.dispatch({type:'DEL_POKEMON'})


// subscribtion
store.subscribe(()=>{
    console.log('store',store.getState())
})

// export default store;