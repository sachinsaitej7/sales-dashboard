import {set,remove} from '../../helpers/LocalStorageHelper';

const LOGIN_LOADING = 'auth/LOGIN_LOADING';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILED = 'auth/LOGIN_FAILED';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const initialState = {
 
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            set("accessToken",action.accessToken);
            set("user",JSON.stringify(action.user));
            return {
                ...state,
                user: action.user,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                error: action.error
            };
        case LOGOUT_SUCCESS:
            remove("accessToken");
            remove("user");
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}


export function loginUser(user,accessToken){
    return {
        type: LOGIN_SUCCESS,
        user,
        accessToken,
    };
}

export function logoutUser(){
    return {
        type: LOGOUT_SUCCESS,
        user: null,
        accessToken: null,
    };
}
