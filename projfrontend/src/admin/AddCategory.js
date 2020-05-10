import React, {useState} from 'react'
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';




 const AddCategory=() => {

    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    const {user,token} = isAutheticated();

    const goBack= () => {
        return(
            <div className="mt-5">
                <Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">Back</Link>
            </div>
        )
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
        setError("");


    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("")
        setSuccess(false)

        //backend request fired

        createCategory(user._id , token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            } else {
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        




    }

    const successMessage = () =>{
        if(success) {
            return <h3 className="text-success text-center">CATEGORY CREATED SUCCESSFULLY</h3>
        }
        
    }

    
    const errorMessage = () =>{
        if(error) {
            return <h3 className="text-success text-center">Failed to create category</h3>
        }
    }






    const myCategoryForm= () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead text-center ">Enter the Category</p>
                    <input type="text" className="form-control my-3" onChange={handleChange} value={name} autoFocus required placeholder="Enter Category"/>
                    <button className="btn btn-outline-success text-center" onClick={onSubmit} >Create Category</button>
                </div>

            </form>
        )

    }


    
    


    return (
        <Base title="Create Category" description="Add a new New Category!!!" className="container bg-success p-4" >
            <div className="row bg-white rounded">
                <div className="col-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {myCategoryForm()}
                {goBack()}
                </div>
            </div> 
        </Base>
    )
}

export default AddCategory;
