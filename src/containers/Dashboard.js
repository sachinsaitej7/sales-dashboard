import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
// import {Line} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';


import Aux from '../hoc/Aux/Aux';





export default connect(
  store => ({
  }),
  dispatch => bindActionCreators({
    
  }, dispatch))(class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount () {
    }


    render () {
        let chartData = {
            labels: ['January', 'February', 'March',
                     'April', 'May'],
            datasets: [
              {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
              }
            ]
          }
        let legend = {
            display:true,
            position:'right'
          }
        return (
          <Aux>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width: '100%'}}>
                  <div style={{width:"48%"}}>
                        <Line data={chartData} legend={legend} 
                        options={{ maintainAspectRatio: true,
                                scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        drawBorder: true,
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: true,
                                        drawBorder: true,
                                    }   
                                }]
                                }
                        }} height={window.innerWidth < 768 ? 220 : 100}/>
                  </div>
                  <div style={{width:"48%"}}>
                        <Line data={chartData} legend={legend} 
                        options={{ maintainAspectRatio: true,
                                scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false,
                                        drawBorder: true,
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: true,
                                        drawBorder: true,
                                    }   
                                }]
                                }
                        }} height={window.innerWidth < 768 ? 220 : 100}/>
                  </div>
              </div>
          </Aux>
        );
    }
})
