import { minusCartItem } from "../actions/cart";

const initialState={
    items: {},
    totalPrice: 0,
    totalCount:0,
}

const getTotalPrice = arr => arr.reduce((sum,obj)=> obj.price + sum,0);

const _get = (obj,path) =>{
    const [firstKey, ...keys] = path.split('.')
    return keys.reduce((val,key)=>{
        return val[key];
    },obj[firstKey])
}

const getTotalSum = (obj,path) =>{
 
    return Object.values(obj).reduce((sum,obj)=>
    {
        const value = _get(obj,path)
        return sum + value
    }
    ,0)
}

const cart = (state = initialState,action)=>{
    switch(action.type){
        case 'ADD_PIZZA_CART':
            const currentPizzaItems = !state.items[action.payload.id]
            ?[action.payload]:[...state.items[action.payload.id].items,
            action.payload]
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice:getTotalPrice(currentPizzaItems)
                }
            }

            // const totalCount = Object.keys(newItems).reduce((sum,key)=>newItems[key].items.length + sum,0)

            const totalCount = getTotalSum(newItems,'items.length')
            const totalPrice = getTotalSum(newItems,'totalPrice')

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };

        case 'CLEAR_CART':
                return {
                    totalPrice:0,
                    totalCount:0,
                    items:{}
                };
        case 'REMOVE_CART_ITEM':
            const newItemsAfterDelete= {
                ...state.items
            }
            const currentTotalPrice = newItemsAfterDelete[action.payload].totalPrice
            const currentTotalCount = newItemsAfterDelete[action.payload].items.length
            delete newItemsAfterDelete[action.payload]
            return {
                ...state,
                items: newItemsAfterDelete,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount     
            }     
        case 'PLUS_CART_ITEM':
        {   
             const newPlusItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items:newPlusItems ,
                    totalPrice:getTotalPrice(newPlusItems)
                }
            }

            
            const totalCount = getTotalSum(newItems,'items.length')
            const totalPrice = getTotalSum(newItems,'totalPrice')


            return {
                ...state,
                items:newItems,
                totalCount,
                totalPrice
        }}
            case 'MINUS_CART_ITEM':
                {
                const oldItems = state.items[action.payload].items
                const newMinusItems = oldItems.length>1? state.items
                [action.payload].items.slice(1):oldItems
                const newItems = {
                    ...state.items,
                    [action.payload]: {
                        items:newMinusItems ,
                        totalPrice:getTotalPrice(newMinusItems)
                    }
                }

                const totalCount = getTotalSum(newItems,'items.length')
                const totalPrice = getTotalSum(newItems,'totalPrice')
            
                
                return {
                    ...state,
                    items:newItems,
                    totalCount,
                    totalPrice
                }  
              }     
        default:
            return state;
        }   
    
}

export default cart;