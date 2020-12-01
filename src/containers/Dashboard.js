import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Aux from '../hoc/Aux/Aux';
import WorldWideSalesChart from './WorldSalesChart';
import CountryWiseChart from './CountryWiseChart';
import YearlyChart from './YearlyChart';

import {getData,getAllData,setData} from '../redux/modules/firestore';

export default connect(
  store => ({
      companyData: store.firestore.companyData,
      allData: store.firestore.allData,
  }),
  dispatch => bindActionCreators({
    getData,
    setData,
    getAllData,
  }, dispatch))(class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        }
    }

    componentDidMount () {
        this.props.getAllData();
    }

    changeTab = (value) => {
        this.setState({
            activeTab: value
        })
    }

    titleNode = (title,subtitle) => {
        return (
            <div style={{textAlign:"left"}}>
                <div style={{color:"black",fontWeight:"400"}}>
                    {title}
                </div>
                <div style={{color:"rgba(0,0,0,0.57)"}}>
                    {subtitle}
                </div>
            </div>
        )
    }


    render () {
        return (
            <Aux className="chart-tabs-container">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.activeTab}
                    onSelect={(value) => this.changeTab(value)}
                    >
                    <Tab eventKey={0} title={this.titleNode("Competitors total Sales Comparsion","Yearly data")}>
                        <WorldWideSalesChart allData={this.props.allData || []}></WorldWideSalesChart>
                    </Tab>
                    <Tab eventKey={1} title={this.titleNode("Country Total Sales","Company wise share in percentages")}>
                        <CountryWiseChart allData={this.props.allData || []}></CountryWiseChart>
                    </Tab>
                    <Tab eventKey={2} title={this.titleNode("Yearly Total Sales","Country wise share in percentages")}>
                        <YearlyChart allData={this.props.allData || []}></YearlyChart>
                    </Tab>
                </Tabs>
            </Aux>
        );
    }
})
