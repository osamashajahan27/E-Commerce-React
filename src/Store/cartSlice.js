import {createSlice} from "@reduxjs/toolkit"

let gettingProducts=JSON.parse( localStorage.getItem("cart"))

const cartSlice =createSlice({
    name: "cart",
    initialState:gettingProducts,
    reducers: {
        addItem(state , action){
          state.push(action.payload)
          localStorage.setItem("cart",JSON.stringify([...state]))
            
        },
        removeItem( state , action){
          let newProduct= state.filter((prod) => prod.id !== action.payload);
          localStorage.setItem("cart",JSON.stringify([...newProduct]))
            return newProduct
        }
    }
})

export default cartSlice.reducer

export let {addItem , removeItem} = cartSlice.actions