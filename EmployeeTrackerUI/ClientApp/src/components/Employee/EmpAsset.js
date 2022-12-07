import React, { useEffect, useState } from 'react'
import { format, compareAsc } from 'date-fns'
import * as EmpAssetApi from '../../api/empAssetApi';

const EmpAsset = (props) => {

    const [empAssetResult, setEmpAssetResult] = useState();
    const [empResult, setEmpResult] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [id, setId] = useState("");
    const [empId, setEmpId] = useState();
    const [employee, setEmployee] = useState();
    const [assetType, setAssetType] = useState();
    const [assetName, setAssetName] = useState();
    const [givenDate, setGivenDate] = useState();
    const [givenBy, setGivenBy] = useState();
    const [notes, setNotes] = useState();
    const [returnDate, setReturnDate] = useState();
    const [returnedTo, setReturnedTo] = useState();
    const [returnNote, setReturnNote] = useState();
    const [status, setStatus] = useState();

    const cancelClick = () => {

        setShowModal(false);
    }

    const createClick = () => {

        setShowModal(true);
    }


    useEffect(() => {
        getEmpAsset();
        getEmployeeDetails();
    }, [])




    const getEmpAsset = async () => {


        try {


            const response = await EmpAssetApi.getEmpAsset();
            setEmpAssetResult(response?.data);

            console.log('Response recived');
            setId(response?.data?.length + 1);
            console.log(response?.data);

        } catch (error) {
            console.error(error);
            setEmpAssetResult({});


        }
    }

    const getEmployeeDetails = async () => {
        try {
            const response = await EmpAssetApi.getEmployeeDetails();
            setEmpResult(response?.data);
            console.log('Get Employee response');
            //setEmployeeId(response?.data?.id);


            setEmpId(empResult?.map((item) => {
                return item.id;
            }))


            console.log(response?.data);

        } catch (error) {
            console.error(error);
            setEmpResult({});

        }
    }

    const submitClicked = async () => {
    let request = {
        id,
        empId: employee.id,
        empName: employee.name,
        assetType,
        assetName,
        givenDate: new Date(givenDate),
        givenBy,
        notes,
        returnDate: new Date(returnDate),
        returnedTo,
        returnNote,
        status,
    }
    console.log(request);
    await EmpAssetApi.addEmpAsset(request);
    cancelClick();
    getEmpAsset();
}

    return (

        <div className="pb-5" key="scorePredictionPanel">
            <h2 style={{
                color: "#D2691E"
            }} >Employee Asset Details Junction</h2>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" onClick={createClick}>
                Add Employee Asset Details
            </button>
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}  `} style={{ 'background':'linear-gradient(45deg, black, transparent)'}} id="staticBackdrop" data-bs-backdrop="static">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Employee Asset Details</h1>
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
                                                        <label htmlFor="id">Asset Id</label>
                                                        <input type="number" readOnly disabled className="form-control" value={id} id="id" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="employee">Employee Name</label>
                                                        <select className="form-control" onChange={(e) => {


                                                            var index = empResult.findIndex((x) => x.id === +e.target.value);
                                                            setEmpId(e.target.value);
                                                            setEmployee(empResult[index])
                                                            console.log(empResult[index]);

                                                        }
                                                        } value={empId} >
                                                            <option value="">--SelectOne--</option>
                                                            {
                                                                empResult?.map((item) => {
                                                                    return (<option key={item.id} value={item.id}>{item.name}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="assettype">Asset Type</label>
                                                        <select className="form-control" onChange={(e) => setAssetType(e.target.value)} value={assetType} id="assetType">
                                                            <option value="">--SelectOne--</option>
                                                            <option value="Laptop">Laptop</option>
                                                            <option value="Accessories">Accessories</option>
                                                            <option value="Monitor">Monitor</option>
                                                            <option value="mobile">Mobile</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="assetName">Asset Name</label>
                                                        <input type="text" className="form-control" onChange={(e) => setAssetName(e.target.value)} id="assetName" value={assetName} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="givenDate">Given Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setGivenDate(e.target.value)} id="givenDate" value={givenDate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="givenBy">Given By</label>
                                                        <input type="text" className="form-control" onChange={(e) => setGivenBy(e.target.value)} id="givenBy" value={givenBy} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="retrunDate">Retrun Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setReturnDate(e.target.value)} id="retrunDate" value={returnDate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="retrunedTo">Returned To</label>
                                                        <input type="text" className="form-control" onChange={(e) => setReturnedTo(e.target.value)} id="returnedTo" value={returnedTo} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="return Note">Return Note</label>
                                                        <input type="text" className="form-control" onChange={(e) => setReturnNote(e.target.value)} id="retunNote" value={returnNote} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="status">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)} id="status" value={status} >
                                                            <option value="">--SelectOne--</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Returned">Returned</option>
                                                            <option value="Lost">Lost</option>
                                                            <option value="Broken">Broken</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 py-2">
                                                    <div className="form-group">
                                                        <label htmlFor="Notes">Notes</label>
                                                        <input type="text" className="form-control" onChange={(e) => setNotes(e.target.value)} id="notes" value={notes} />
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
                                    <th scope="col">Asset Type</th>
                                    <th scope="col">Asset Name</th>
                                    <th scope="col">Given Date</th>
                                    <th scope="col">Given By</th>
                                    <th scope="col">Return Date</th>
                                    <th scope="col">Returned To</th>
                                    <th scope="col">Return Note</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    empAssetResult?.map((item) => {

                                        return (<tr key={item.id} >
                                            <td>{item.id}</td>
                                            <td>{item.empId}</td>
                                            <td>{item.empName}</td>
                                            <td>{item.assetType}</td>
                                            <td>{item.assetName}</td>
                                            <td>{format(new Date(item.givenDate), 'MM/dd/yyyy')}</td>
                                            <td>{item.givenBy}</td>
                                            <td>{format(new Date(item.returnDate), 'MM/dd/yyyy')}</td>
                                            <td>{item.returnedTo}</td>
                                            <td>{item.returnNote}</td>
                                            <td>{item.status}</td>
                                            <td>{item.notes}</td>
                                            
                                        </tr>)
                                    })
                                }
                                {
                                    empAssetResult?.length === 0 &&
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

export default EmpAsset