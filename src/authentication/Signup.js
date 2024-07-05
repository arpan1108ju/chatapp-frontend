import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Signup = (props) => {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/login');
    }


    const [userinfo, setUserinfo] = useState({name:"",email:"",password:"",cpassword:""});


    const handleSignUp = async (e)=>{

        e.preventDefault();

        const backendUrlSignUp = process.env.REACT_APP_BACKEND_URL_BASE + "/api/user/signup";

        // console.log("url : ",backendUrlSignUp);
        // console.log("userinfo : ",userinfo);

        if(userinfo.password !== userinfo.cpassword){
            toast.error("Passwords do not match !!");
            return;
        }
        // api call for signup
        try {

            var headers = new Headers();
        
            headers.append('Content-Type', 'application/json');
            // headers.append('Accept', 'application/json');
        
        
            const config = {
                method : "POST",
                headers : headers,
                body : JSON.stringify({
                    name : userinfo.name,
                    email : userinfo.email,
                    password : userinfo.password
                })
            }

            const response = await fetch(backendUrlSignUp,config);
            const json = await response.json();
            
            console.log("response : ",response);
            
            if(response.status === 200){

                localStorage.setItem('name',json.name);
                localStorage.setItem('email',json.email);
                localStorage.setItem('token',json.token);
                localStorage.setItem('id',json._id);

                console.log(localStorage.getItem('name'));
                console.log(localStorage.getItem('email'));
                console.log(localStorage.getItem('token'));
                console.log(localStorage.getItem('id'));

                toast.success("User created succesfully.");
                props.socket.emit('i_am_online',{userId : json._id});
                navigate('/home');
            }
            else{
                toast.error(json.message);
            }
        } catch (error) {
            console.log("error : ",error);
            toast.error(error.message);
        }

    }

    const handleFieldChange = (e)=>{
        setUserinfo({...userinfo,[e.target.name] : e.target.value})

    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 transition transform duration-300 hover:scale-105 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create An Account
              </h1>
              <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6" action="/" method="post">
                <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input onChange={handleFieldChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={handleFieldChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={handleFieldChange} type="password" name="password" id="password"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div>
                      <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input onChange={handleFieldChange} type="password" name="cpassword" id="cpassword"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                 
                  <button type="submit" className="w-full rounded-lg bg-cyan-400 hover:bg-cyan-600 text-white py-2 px-4 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ease-in-out">
                         Sign Up
                 </button>

                  <p className="text-white ">
                      Already have an account? <a onClick={handleNavigate} className="font-medium text-primary-600 hover:underline text-blue-200 ">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}

export default Signup;