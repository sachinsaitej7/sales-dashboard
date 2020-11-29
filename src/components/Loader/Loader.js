import React, {Component} from 'react';
import moment from 'moment';
import {toast} from 'react-toastify';
import loaderImage from '../../images/loader.gif';
export default class Loader extends Component{
    render(){
        //this component will stretch to height and width of parent with position relative
        return(
                <div id="loader" style={{
                    display:"block",
                    backgroundImage:`url(${loaderImage})`,
                    backgroundPosition:"center",
                    backgroundRepeat:"no-repeat",
                    minHeight:this.props.minHeight ||"200px",
                    textAlign:"center",
                    position:"absolute",
                    width:"100%",
                    height:"100%",
                    verticalAlign:"center"}}>
                </div>
        )
    }
}