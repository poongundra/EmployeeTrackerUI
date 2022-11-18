import React, { useEffect, useState } from 'react'
import * as OnboardingApi from '../../api/onboardingApi';

const Onboarding = (props) => {

    const [scoreResult, setScoreResult] = useState([]);

    const [id, setId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [jobName, setJobName] = useState("");
    const [jobStatus, setJobStatus] = useState("");
    const [jobDueDate, setJobDueDate] = useState("");
    const [jobOwner, setJobOwner] = useState("");
    const [jobCompletedDate, setJobCompletedDate] = useState("");


    const [showModal, setShowModal] = useState(false);

    const cancelClick = () => {

        setShowModal(false);
    }

    const createClick = () => {

        setShowModal(true);
    }


    useEffect(() => {
        getOnboarding();
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

    const submitClicked = async () => {
        let request = {
            id,
            employeeId,
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
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'} `} id="staticBackdrop" data-bs-backdrop="static">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Onboarding Details</h1>
                            <button type="button" className="btn-close" onClick={cancelClick} aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

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
                                                        <label htmlFor="id">Employee Id</label>
                                                        <input type="number" className="form-control" onChange={(e) => setEmployeeId(e.target.value)} value={employeeId} id="employeeId" />
                                                    </div>
                                                </div>

                                                
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Job Name</label>
                                                        <input type="text" className="form-control" onChange={(e) => setJobName(e.target.value)} value={jobName} id="jobName" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="designation">Job Status</label>
                                                        <input className="form-control" onChange={(e) => setJobStatus(e.target.value)} id="jobStatus" value={jobStatus} rows="3" />
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
                                                        <input className="form-control" onChange={(e) => setJobDueDate(e.target.value)} id="jobDueDate" value={jobDueDate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="dateOfbBirth">Job Completed Date</label>
                                                        <input className="form-control" onChange={(e) => setJobCompletedDate(e.target.value)} id="jobCompletedDate" value={jobCompletedDate} />
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
                                            <td>{item.jobName}</td>
                                            <td>{item.jobStatus}</td>
                                            <td>{item.jobDueDate}</td>
                                            <td>{item.jobOwner}</td>
                                            <td>{item.jobCompletedDate}</td>
                                            
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