export const initialState = null; 
//initial value for user is null

export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    if (action.type == "CLEAR") {
        return null;
    }
    if (action.type == "UPDATE") {
        return {
            ...state, //expand what we currently have in state
            following: action.payload.following,//append to the state
            followers: action.payload.followers//append to the state
        }
    }
    if(action.type=="UPDATEPIC"){
        return {
            ...state,
            pic:action.payload
        }
    }
    return state;
}