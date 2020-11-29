import React from "react";

const CheckAuthRoute = (props) => {
    if(props.user)
        props.push('/dashboard');
    else{
        const C = props.component;
        return C ? <C {...props} /> : null;
    }
    return null;
}
export default CheckAuthRoute;
