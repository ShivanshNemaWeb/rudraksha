import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
//  import '../index.css';
// import EmployeeService from './Services';
//import "./RMS/List.css"


var divStyle = {
    margin: '0 4%',
};

var rlstyle={
    backgroundColor:"black",
    color:"white",
    padding:"20"
 };

const PrintDiv=(e)=> {
    var divContents = document.getElementById("InterviewUserName").innerHTML;
    var printWindow = window.open('', '', 'height=200,width=400');
    printWindow.document.write('<html><head><title>DIV Contents</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    console.log("Tarun pgl")
}

class Listint extends Component {

    constructor(props) {
        super(props);
        //  this.employeeService = new EmployeeService();
        this.state = {
            employees: []
        }
        //  this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount = () => {
        this.getEmployeeList();
    }

    // To get all the employees
    getEmployeeList() {
        axios.get('http://localhost:5000/record-interview')
            .then((response) => {
                console.log(response);
                this.setState({
                    employees: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    

    //  // To delete any employee
    //  deleteEmployee(empid) {
    //  this.employeeService.deleteEmployee(empid);
    //  this.getEmployeeList();
    //  }

    render() {
        const { employees } = this.state;
        return (
            <>
                <div className='RmsReportMainHeading'>
                    <img src={require('../../Images/RWFLOGO.png')} />
                    <h2>Rudrakshaa Welfare</h2>
                    <h3>A Section 8 Company (Non Profit Organization)</h3>
                    <h3>Under Companies Act 2013, Ministry of Corporate Affairs, Govt. of INDIA</h3>
                </div>
                <hr/>

                <div className='RmsReportHeading'>
                    <h3> Interview Report</h3>

                </div>

                <div style={divStyle}>
                    <Table  responsive>
                        <thead style={rlstyle} className='RmsReportTableHead'>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email id</th>
                                <th>Gender</th>
                                <th>Contact No.</th>
                                <th>Date of interview</th>
                                <th>Interviewer Name</th>
                                <th>Place</th>
                                <th>Salary Offered</th>
                                <th>Selection Status</th>
                                <th>View More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees && employees.map((result, i) => {
                                    return (
                                        <tr >
                                            <td>{i + 1}</td>
                                            <td>{result.InterviewUserName}</td>
                                            <td>{result.InterviewUserEmail}</td>
                                            <td>{result.InterviewUserGender}</td>
                                            <td>{result.InterviewUserContact}</td>
                                            <td>{result.InterviewIdate}</td>
                                            <td>{result.InterviewIName}</td>
                                            <td>{result.InterviewIplace}</td>
                                            <td>{result.InterviewIsalary}</td>
                                            <td></td>
                                            <td>
                        <Link
                          className="btn btn-primary" ><Button onClick={PrintDiv}>Print</Button> 
                        </Link>
                      </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}

export default Listint;
