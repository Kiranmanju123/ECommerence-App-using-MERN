import React from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'

const adminDashboard=() => {
    const {user : {name,email,role}} = isAutheticated()  //isauthnticated returns the user object which is dtored in userbrowser by jwt tokens

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success text-center">CREATE CATEGORY</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/create/manage/category" className="nav-link text-success text-center">MANAGE CATEGORY</Link>
                    </li>
                    
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success text-center">CREATE PRODUCTS</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success text-center">MANAGE PRODUCTS</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success text-center">MANAGE ORDERS</Link>
                    </li>
                </ul>
            </div>
        )

    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">NAME:</span>{name}
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">EMAIL:</span>{email}
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">ROLE:</span>{role} ADMIN
                    </li>

                    <li className="list-group-item">
                        <span className="badge badge-danger text-center">ADMIN AREA!!!</span>
                    </li>



                </ul>
              
            </div>
        )
    }

        return (
       <Base className="container bg-success p-4" title="Welcome Admin!!!" description="Edit Your Stuff">

           <div className="row">
               <div className="col-3">
               {adminLeftSide()}
               </div>
               <div className="col-9">
               {adminRightSide()}
               </div>
           </div>


       
   
       </Base>
    )
}

export default adminDashboard;
