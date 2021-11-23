import React , { useState , useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import {
  Row, Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from 'reactstrap';

const FetchKYCRequests = () => {

  const [KYCRequests , setKYCRequests] = useState([]);

  // const authToken = Cookies.get("jwttoken");
  // console.log(authToken);

  const fetchData = async () => {
    const apiUrl = 'http://localhost:7777/admin/getKYCRequests/ALL/10/1';
    const response = await axios.get(apiUrl , {
        headers:{
          "Authorization" : `Bearer token`
        }
    });
    console.log(response.data.fetchedData);
    setKYCRequests(response.data.fetchedData);
}

    const handleInputRejected = async (KYCRequestId) => {
        const apiUrlRejected = `http://localhost:7777/admin/KYCStatus/${KYCRequestId}/REJECTED`;
        await axios.put(apiUrlRejected , {
            headers:{
                "Authorization": "Bearer token"
            }
        });
    }

    const handleInputApproved = async (KYCRequestId) => {
        const apiUrlApproved = `http://localhost:7777/admin/KYCStatus/${KYCRequestId}/APPROVED`;
        await axios.put(apiUrlApproved , {
            headers:{
                "Authorization": "Bearer token"
            }
        })
    }

useEffect(()=>{
  fetchData();
},[])

  return (
      <div>
        {/* <Sidebar title="Jobs Uploaded by You"/>  */}
        <div className="KYCRequests">
       <Card className="main-card mb-3">
       <div className="card-header">Active Users
           <div className="btn-actions-pane-right">
               <div role="group" className="btn-group-sm btn-group">
                   <button className="active btn btn-info">Last Week</button>
                   <button className="btn btn-info">All Month</button>
               </div>
           </div>
       </div>
       <div className="table-responsive">
           <table className="align-middle mb-0 table table-borderless table-striped table-hover">
               <thead>
               <tr>
                   <th className="text-center">#</th>
                   <th>Name</th>
                   <th className="text-center">City</th>
                   <th className="text-center">Status</th>
                   <th className="text-center">Actions</th>
               </tr>
               </thead>
               <tbody>
               {KYCRequests.map((KYCRequest)=> (
               <tr>
                   <td className="text-center text-muted"></td>
                   <td>
                       <div className="widget-content p-0">
                           <div className="widget-content-wrapper">
                               <div className="widget-content-left mr-3">
                                   <div className="widget-content-left">
                                       <img width={40} className="rounded-circle" alt="Avatar" />
                                   </div>
                               </div>
                               <div className="widget-content-left flex2">
                                   <div className="widget-heading">{KYCRequest._id}</div>
                                   <div className="widget-subheading opacity-7">Web Developer</div>
                               </div>
                           </div>
                       </div>
                   </td>
                   <td className="text-center">Madrid</td>
                   <td className="text-center">
                       <div className="badge badge-warning">{KYCRequest.status}</div>
                   </td>
                   <td className="text-center">
                       <div className="mt-3">
                            <input role="button" className="btn btn-success" onCLick={handleInputApproved(KYCRequest._id)}>Approve</input>
                       </div>
                       <div className="mt-3">
                            <input role="button" className="btn btn-danger" onClick={() =>
                                handleInputRejected(KYCRequest._id)
                            }>Rejected</input>
                       </div>
                       <div className="mt-3">
                            <input role="button" className="btn btn-primary">Details</input>
                       </div>
                   </td>
               </tr>
               ))}
               </tbody>
           </table>
       </div>
       <div className="d-block text-center card-footer">
           <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i className="pe-7s-trash btn-icon-wrapper"> </i></button>
           <button className="btn-wide btn btn-success">Save</button>
       </div>
   </Card>
  </div> 
      </div>
  )
}

export default FetchKYCRequests
