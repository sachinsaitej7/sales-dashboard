import React from "react";
import { Redirect } from 'react-router-dom';

const authenticatedRoute = (props) => {
        const C = props.component;
        if(props.user)
            return C ? <C {...props} /> : null;
        else if(props.user !== undefined)
            return <Redirect to={{
                pathname: '/login',
                search: props.location.search
            }} />
        return null;
};

export default authenticatedRoute;
