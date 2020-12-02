import React, {Component} from "react";
import {Line} from 'react-chartjs-2';
import './SalesChart.css';
import Aux from '../hoc/Aux';
import Button from 'react-bootstrap/Button';
import Chip from '@material-ui/core/Chip';
import {MONTHS, LABELS} from '../constants';
import { toast } from 'react-toastify';

const options = {
    title:{
      display:true,
      text:'Total sales of a company worldwide (in $)',
      fontSize:20
    },
    maintainAspectRatio: true,
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
};

const legend = {
    display: true,
    position: 'right'
};

const colors = ["#3b74fc","#f9a80a","#FF0D0D","#00A6B4","#2FDE00"];

const ga = window.ga;

class CompareChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compareCompanies: [],
            currentCompany: "",
            colorsLeft: colors,
        }
    }

    combineMonthSales(data){
        return MONTHS.map(month => {
            let totalMonthSales = 0;
            data.forEach(item =>{
                if(month in item)
                    totalMonthSales += item[month];
            })
            return totalMonthSales;
        })
    }

    addCompanyToCompare = () => {
        ga('send', 'event', 'compare_company_btn','compare_company_clicked',this.state.currentCompany);
        if(this.state.compareCompanies.length >= 5)
            return toast.info("You can add upto 5 companies");
        let worldwideSales = this.props.allData.filter(item => item["Company"] === this.state.currentCompany);
        let values = this.combineMonthSales(worldwideSales)
        let graph = {
            label: this.state.currentCompany,
            fill: false,
            lineTension: 0.5,
            backgroundColor: "black",
            borderColor: this.state.colorsLeft.length > 0 ? this.state.colorsLeft[0]: "black",
            borderWidth: 2,
            data: values,
        };
        this.setState(prevState => {
            return {
                compareCompanies: [...prevState.compareCompanies,graph],
                currentCompany: "",
                colorsLeft: prevState.colorsLeft.slice(1,prevState.colorsLeft.length),
            }
        })
    }

    handleDelete = (chipToDelete) => () => {
        this.setState(prevState => {
            return {
                compareCompanies: prevState.compareCompanies.filter((chip) => chip.label !== chipToDelete.label),
                colorsLeft: [...prevState.colorsLeft,chipToDelete.borderColor]
            }
        });
    };

    comparisionHolder = (companies) => {
        // const classes = useStyles();
        return (
            <div style={{display:"flex",flexDirection:"row",padding:"20px 20px 0px",justifyContent:"space-evenly"}}>
                <select className="select-dropdown" name="" ref='companies' value={this.state.currentCompany} onChange = {(e) => this.setState({currentCompany: e.target.value})}>
                    <option value="">Select a company</option>
                    {
                        Array.isArray(companies) && companies.map((data, index)=>{
                            return <option key={index} value={data}>{data}</option>
                        })
                    }
                </select>
                <Button disabled={!this.state.currentCompany} variant="outline-primary" onClick={this.addCompanyToCompare}>Add Company to compare</Button>
                {
                    this.state.compareCompanies.map(data => {
                        return (
                            <li key={data.label} style={{listStyle:"none"}}>
                                <Chip
                                label={data.label}
                                variant="outlined"
                                onDelete={this.handleDelete(data)}
                                color="secondary"
                                />
                            </li>
                        )

                    })
                }
            </div>
        )
    }

    getListFromData = (key) => {
        let newList = [];
        let selectedCities = new Set(this.state.compareCompanies.map(item => item["label"]));
        console.log(selectedCities);
        if(this.props.allData)
            newList = this.props.allData.filter(item => (!selectedCities.has(item[key]))).map(item => item[key] ? item[key]: "");
        return [...new Set(newList)];
    }

    
    render() {
        const companies = this.getListFromData("Company");
        const chartData = {
            labels: LABELS,
            datasets: this.state.compareCompanies
        }
        return(
            <Aux>
                {this.comparisionHolder(companies)}
                <div className="competitors-chart-container">
                    <Line data={chartData} legend={legend} options={options}/>
                </div>
            </Aux>
        )
    }
}

export default CompareChart;