import React from "react";
import { Redirect } from 'react-router-dom';
import Loader from "../components/Loader";

const authenticatedRoute = (props) => {
        const C = props.component;
        if(props.user)
            return C ? <C {...props} /> : <Loader></Loader>;
        else
            return <Redirect to={{
                pathname: '/login',
                search: props.location.search
            }} />
};

export default authenticatedRoute;
