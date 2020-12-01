import firebase from '../../firebase';

const db = firebase.firestore();

const GET_DATA_LOADING = 'firestore/GET_DATA_LOADING';
const GET_DATA_SUCCESS = 'firestore/GET_DATA_SUCCESS';
const GET_DATA_FAILED = 'firestore/GET_DATA_FAILED';

const GET_ALL_DATA_LOADING = 'firestore/GET_ALL_DATA_LOADING';
const GET_ALL_DATA_SUCCESS = 'firestore/GET_ALL_DATA_SUCCESS';
const GET_ALL_DATA_FAILED = 'firestore/GET_ALL_DATA_FAILED';

const SET_DATA_LOADING = 'firestore/SET_DATA_LOADING';
const SET_DATA_SUCCESS = 'firestore/SET_DATA_SUCCESS';
const SET_DATA_FAILED = 'firestore/SET_DATA_FAILED';


const initialState = {
 
};

function parseData(querySnapshot){
    let data = [];
    querySnapshot.forEach((doc) => data.push(doc.data()))
    return data;
}

export default function firestore(state = initialState, action = {}) {
    switch (action.type) {
        case GET_DATA_LOADING:
            return{
                loading: true,
            };
        case GET_DATA_SUCCESS:
            return{
                companyData: parseData(action.result)
            };
        case GET_DATA_FAILED:
            return{
                error: action.error
            };
        
        case GET_ALL_DATA_LOADING:
            return{
                loading: true,
            };
        case GET_ALL_DATA_SUCCESS:
            return{
                allData: parseData(action.result)
            };
        case GET_ALL_DATA_FAILED:
            return{
                error: action.error
            };
        case SET_DATA_LOADING:
            return{
                loading: true,
            };
        case SET_DATA_SUCCESS:
            return{
                added: true
            };
        case SET_DATA_FAILED:
            return{
                error: action.error
            };
        default:
            return state;
    }
}

export function getData(key,queryOperator,value,collection="sales"){
    const docRef = db.collection(collection);
    return {
        types: [GET_DATA_LOADING,GET_DATA_SUCCESS,GET_DATA_FAILED],
        promise: () => docRef.where(key,queryOperator,value).get(),
    }
}

export function getAllData(collection="sales"){
    const docRef = db.collection(collection);
    return {
        types: [GET_ALL_DATA_LOADING,GET_ALL_DATA_SUCCESS,GET_ALL_DATA_FAILED],
        promise: () => docRef.get(),
    }
}

export function setData(payload,index,collection="sales"){
    const docRef = db.collection(collection);
    return {
        types: [SET_DATA_LOADING,SET_DATA_SUCCESS,SET_DATA_FAILED],
        promise: () => docRef.doc(index.toString()).set(
            payload
        ),
    }
}



