import React, { useEffect, useState } from 'react'
import * as EmployeeApi from '../../api/employeeApi';

const Employee = (props) => {

    const [scoreResult, setScoreResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [requestData, setRequestData] = useState({
        id: "",
        name: "",
        contactNumber: "",
        email: "",
        dateOfBirth: "",
        designation: "",
        status: "",
        manager: "",
        aadharNumber: "",
        emergencyContactNumber: ""
    });

    const [id, setId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("@gmail.com");
    const [designation, setDesignation] = useState("");
    const [status, setStatus] = useState("Active");
    const [manager, setManager] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

    const [showModal, setShowModal] = useState(false);

    const cancelClick = () => {

        setShowModal(false);
    }

    const createClick = () => {

        setShowModal(true);
    }


    useEffect(() => {
        getEmployee();
        
    }, [])


    

    const getEmployee = async () => {

        setLoading(true);
        try {


            const response = await EmployeeApi.getEmployee();
            setScoreResult(response?.data);
            setLoading(false);
            console.log('response');
            console.log(response?.data);
            setId(response?.data?.length + 1);
            console.log(response?.data?.length + 1);

        } catch (error) {
            console.error(error);
            setScoreResult({});
            setLoading(false);

        }
    }

    const submitClicked = async () => {
        let request = {
            id: +id,
            dateOfBirth: new Date(dateOfBirth),
            name,
            contactNumber,
            email,
            designation,
            status,
            manager,
            aadharNumber,
            emergencyContactNumber
        }
        console.log(request);
        await EmployeeApi.addEmployee(request);
        cancelClick();
        getEmployee();
    }

    return (

        <div className="pb-5" key="scorePredictionPanel">
            <h2 style={{
                color: "#D2691E"
            }} >Employee Junction</h2>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={createClick}>
                Add Employee
            </button>
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'} `} id="staticBackdrop" data-bs-backdrop="static">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Employee</h1>
                            <button type="button" className="btn-close" onClick={cancelClick} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="container">
                                <div className="row">

                                    <div className="col-md-12">
                                        <form>
                                            <div className="row py-2">
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="id">Employee Number</label>
                                                        <input type="number" readOnly disabled className="form-control" value={id} id="id" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Employee Name</label>
                                                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} id="name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} id="email" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="designation">Designation</label>
                                                        <input className="form-control" onChange={(e) => setDesignation(e.target.value)} id="designation" value={designation} rows="3" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="contactNumber">Contact Number</label>
                                                        <input className="form-control" onChange={(e) => setContactNumber(e.target.value)} id="contactNumber" value={contactNumber} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="dateOfbBirth">DOB</label>
                                                        <input className="form-control" onChange={(e) => setDateOfBirth(e.target.value)} id="dateOfBirth" value={dateOfBirth} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)} id="status" value={status} >
                                                            <option value="Active">Active</option>
                                                            <option value="Resigned">Resigned</option>
                                                            <option value="Terminated">Terminated</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="manager">Manager</label>
                                                        <input className="form-control" onChange={(e) => setManager(e.target.value)} id="manager" value={manager} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="aadharNumber">Aadhar Number</label>
                                                        <input className="form-control" onChange={(e) => setAadharNumber(e.target.value)} id="aadharNumber" value={aadharNumber} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="emergencyContactNumber">Emergency Contact Number</label>
                                                        <input className="form-control" onChange={(e) => setEmergencyContactNumber(e.target.value)} id="emergeneyContactNumber" value={emergencyContactNumber} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={submitClicked}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={cancelClick}>Close</button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3" style={{ border: '1px solid lightgray', padding: '20px', boxShadow: '6px 0px 15px 3px grey' }} >

                <div className="row pt-3">
                    <div className="col-md-12">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Contact.No</th>
                                    <th scope="col">Aadhar Number</th>
                                    <th scope="col">Manager</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Emergency Contact.No</th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    scoreResult?.map((item) => {

                                        return (<tr key={item.id} >
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.designation}</td>
                                            <td>{item.dateOfBirth}</td>
                                            <td>{item.contactNumber}</td>
                                            <td>{item.aadharNumber}</td>
                                            <td>{item.manager}</td>
                                            <td>{item.status}</td>
                                            <td>{item.email}</td>
                                            <td>{item.emergencyContactNumber}</td>
                                        </tr>)
                                    })
                                }
                                {
                                    scoreResult?.length === 0 &&
                                    <tr><td colSpan="10"> No data Available
                                    </td>
                                    </tr>

                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>

        </div>  

    );
}

export default Employee