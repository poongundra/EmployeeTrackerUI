import React, { useEffect, useState } from 'react'
import { format, compareAsc } from 'date-fns'
import * as OnboardingApi from '../../api/onboardingApi';

const Onboarding = (props) => {

    const [scoreResult, setScoreResult] = useState([]);
    const [empResult, setEmpResult] = useState([]);

    const [id, setId] = useState("");
    const [employeeId, setEmployeeId] = useState();
    const [jobName, setJobName] = useState("");
    const [jobStatus, setJobStatus] = useState("");
    const [jobDueDate, setJobDueDate] = useState("");
    const [jobOwner, setJobOwner] = useState("");
    const [jobCompletedDate, setJobCompletedDate] = useState("");

   
    const [employee, setEmployee] = useState({});
    const [employeeName, setEmployeeName] = useState();


    const [showModal, setShowModal] = useState(false);

    const cancelClick = () => {

        setShowModal(false);
    }

    const createClick = () => {

        setShowModal(true);
    }


    useEffect(() => {
        getOnboarding();
        getEmployeeDetails();
    }, [])



    const getOnboarding = async () => {
        try {
            const response = await OnboardingApi.getOnboarding();
            setScoreResult(response?.data);
            console.log('response');
            console.log(response?.data);
            setId(response?.data?.length + 1);
            console.log(response?.data?.length + 1);

        } catch (error) {
            console.error(error);
            setScoreResult({});
            

        }
    }
    const getEmployeeDetails = async () => {
        try {
            const response = await OnboardingApi.getEmployeeDetails();
            setEmpResult(response?.data);
            console.log('Get Employee response');
            //setEmployeeId(response?.data?.id);

            
            setEmployeeId(empResult?.map((item) => {
                return item.id;
            }))
            

            //console.log(response?.data);

        } catch (error) {
            console.error(error);
            setEmpResult({});


        }
    }

    const submitClicked = async () => {
        let request = {
            id,
            employeeId : employee.id,
            employeeName : employee.name,
            jobName,
            jobStatus,
            jobDueDate : new Date(jobDueDate),
            jobOwner,
            jobCompletedDate: new Date(jobCompletedDate),
        }
        console.log(request);
        await OnboardingApi.addOnboarding(request);
        cancelClick();
        getOnboarding();
    }

    return (

        <div className="pb-5" key="scorePredictionPanel">
            <h2 style={{
                color: "#D2691E"
            }} >Onboarding Junction</h2>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={createClick}>
                Add Onboarding
            </button>
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'} `} style={{ 'background': 'linear-gradient(45deg, black, transparent)' }} id="staticBackdrop" data-bs-backdrop="static">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Onboarding Details</h1>
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
                                                        <label htmlFor="id">Onboading Id</label>
                                                        <input type="number" readOnly disabled className="form-control" value={id} id="id" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Employee</label>
                                                        <select className="form-control" onChange={(e) => {


                                                            var index = empResult.findIndex((x) => x.id === +e.target.value);
                                                            setEmployeeId(e.target.value);
                                                            setEmployee(empResult[index])
                                                            console.log(empResult[index]);

                                                        }
                                                        } value={employeeId} >
                                                            <option value="">--SelectOne--</option>
                                                            {
                                                                empResult?.map((item) => {
                                                                    return (<option key={item.id}  value={item.id}>{item.name}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>

                                                
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Job Name</label>
                                                        <input type="text" className="form-control" onChange={(e) => setJobName(e.target.value)} value={jobName} id="jobName" required />
                                                        <div className="valid-feedback">
                                                            Looks good!
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="designation">Job Status</label>
                                                        <select className="form-control" onChange={(e) => setJobStatus(e.target.value)} id="status" value={jobStatus} >
                                                            <option value="">--SelectOne--</option>
                                                                <option value="Assigned">Assgined</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="On Hold">On Hold</option>
                                                                <option value="Completed">Completed</option>
                                                            </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="contactNumber">Job Owner</label>
                                                        <input className="form-control" onChange={(e) => setJobOwner(e.target.value)} id="jobOwner" value={jobOwner} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="dateOfbBirth">Job Due Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setJobDueDate(e.target.value)} id="jobDueDate" value={jobDueDate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="dateOfbBirth">Job Completed Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setJobCompletedDate(e.target.value)} id="jobCompletedDate" value={jobCompletedDate} />
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
                                    <th scope="col">Employee ID</th>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Job Name</th>
                                    <th scope="col">Job Status</th>
                                    <th scope="col">Job Due Date</th>
                                    <th scope="col">Job Owner</th>
                                    <th scope="col">Job Completed Date</th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    scoreResult?.map((item) => {

                                        return (<tr key={item.id} >
                                            <td>{item.id}</td>
                                            <td>{item.employeeId}</td>
                                            <td>{item.employeeName}</td>
                                            <td>{item.jobName}</td>
                                            <td>{item.jobStatus}</td>
                                            <td> {format(new Date(item.jobDueDate), 'MM/dd/yyyy')}</td> 
                                            
                                            <td>{item.jobOwner}</td>
                                            <td>{format(new Date(item.jobCompletedDate), 'MM/dd/yyyy')}</td>
                                            
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

export default Onboarding