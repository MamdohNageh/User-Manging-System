export function users(state = {}, action){
    switch(action.type)
    {
        case "USERS_LIST":
            return { ...state, usersList: action.payload };
        case "USER_DETAILS":
            return { ...state, userDetails: action.payload };
        case "CLEAR_DATA":
            return { ...state, userDetails: action.payload };
        case "Register_Status":
            return { ...state, list: action.payload };
        case "Delete_Status":
            return { ...state, list: action.payload };
        case "Edit_Status":
            return { ...state, list: action.payload };
        default:
            return state;
    }
}