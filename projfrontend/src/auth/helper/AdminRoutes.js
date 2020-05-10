import React from 'react'
import {Route , Redirect} from 'react-router-dom';
import {isAutheticated} from './index';

const AdminRoute = ({ component: Component, ...rest}) => {
 return (
     <Route
     {...rest}
     render={props=>
        isAutheticated() && isAutheticated().user.role ===1 ? (  //in user browswe jwt are set from that we can acess all info like name email role etc
        <Component {...props} />

     ) : (
         <Redirect
         to={{
             pathname: "/signin",
             state: {from : props.location}
           }}
     
         />
          )
        }
      />
  );
}
        
export default AdminRoute;