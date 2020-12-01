import React, {Component} from "react";
import {Doughnut} from 'react-chartjs-2';
import Aux from '../hoc/Aux';
import './SalesChart.css';
import {MONTHS} from '../constants';

const colors = ["#3b74fc","#FF0D0D", "#fdcb0e","#00A6B4","#2FDE00"];

const legend = {
    display: true,
    position: 'right'
};

const options = {
    title:{
      display:true,
      text:'Company shares in a country (in $)',
      fontSize:20
    },
    maintainAspectRatio: true,
}

class CountrySharesChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry: "",
            sales: []
        }
    }

    companyWiseSales(data){
        let companies = [];
        let sales = [];
        data.forEach(company => {
            let totalSales = 0;
            MONTHS.forEach(month =>{
                if(month in company)
                    totalSales += company[month];
            })
            companies.push(company["Company"]);
            sales.push(totalSales);
        })
        return [companies,sales];
    }

    addCountryToCompare = (value) => {
        let countryData = this.props.allData.filter(item => item["Country"] === value);
        let [companies,sales] = this.companyWiseSales(countryData);
        this.setState({
            companies: companies,
            sales: sales,
            currentCountry: value
        })
    }


    comparisionHolder = (countries) => {
        return (
            <div style={{padding:"20px 20px 0px",display:"flex",justifyContent:"start"}}>
                <select style={{padding:"10px 20px"}} name="" ref='countries' value={this.state.currentCountry} onChange = {e => this.addCountryToCompare(e.target.value)}>
                    <option value="">Select a country</option>
                    {
                        Array.isArray(countries) && countries.map((data, index)=>{
                            return <option key={index} value={data}>{data}</option>
                        })
                    }
                </select>
            </div>
        )
    }

    getListFromData = (key) => {
        let newList = [];
        if(this.props.allData)
            newList = this.props.allData.map(item => item[key] ? item[key]: "");
        return [...new Set(newList)];
    }

    
    render() {
        const countries = this.getListFromData('Country');
        const datasets = [
            {
                label: "Share",
                backgroundColor: colors,
                hoverBackgroundColor: ['#501800'],
                data: this.state.sales
            }
        ];
        
        const chartData = {
            labels: this.state.companies,
            datasets
        }
        return(
            <Aux>
                {this.comparisionHolder(countries)}
                <div className="competitors-chart-container">
                    <Doughnut data={chartData} legend={legend} options={options}/>
                </div>
            </Aux>
        )
    }
}

export default CountrySharesChart;
