import { createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface CartItem {
    id:number;
    name:string;
    price:number;
    category:string;
    imageUrl: string;
    quantity:number;

}

interface CartState{
    items:CartItem[];
}

const initialState:CartState = {
    items:[],
     
}
 
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addItem:(state, action:PayloadAction<Omit<CartItem, "quantity">>) =>{
            const existingItem = state.items.find((item)=>item.id===action.payload.id)
            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.items.push({...action.payload, quantity:1})
            }

        },

        removeItem:(state, action:PayloadAction<{ id: number }>) =>{
            const existingItem = state.items.find((item)=>item.id===action.payload.id);
            if(existingItem){
                if(existingItem.quantity > 1 ){
                    existingItem.quantity -= 1;
                }else{
                    state.items =state.items.filter((item)=> item.id != action.payload.id)
                }
            }
        },
        clearCart: (state) =>{
            state.items = [];
        }

    }
})

export const {addItem, removeItem, clearCart}  = cartSlice.actions
export default cartSlice.reducer;