import React from "react";
import { Redirect } from 'react-router-dom';
import Loader from "../../components/Loader";

const checkAuthRoute = (props) => {
    if(props.user){
        return (
            <Redirect to={{
                pathname: '/dashboard',
                search: props.location.search
            }} />
        )
    }
    else{
        const C = props.component;
        return C ? <C {...props} /> : <Loader></Loader>;
    }
}

export default checkAuthRoute;
