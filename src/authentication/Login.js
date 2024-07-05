import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { socketContext } from '../context/socketContext'

const Login = (props) => {

    const navigate = useNavigate();
    const socket = useContext(socketContext);

    const handleClick = ()=> {
        navigate('/signup');
    }

    const [userinfo, setUserinfo] = useState({email:"",password:""});


    const handleLogin = async (e)=>{

        e.preventDefault();

        const backendUrlLogin = process.env.REACT_APP_BACKEND_URL_BASE + "/api/user/login";

        // console.log("url : ",backendUrlLogin);
        // console.log("userinfo : ",userinfo);

        // api call for signup
        try {

            var headers = new Headers();
        
            headers.append('Content-Type', 'application/json');
            // headers.append('Accept', 'application/json');
        
        
            const config = {
                method : "POST",
                headers : headers,
                body : JSON.stringify({
                    email : userinfo.email,
                    password : userinfo.password
                })
            }

            const response = await fetch(backendUrlLogin,config);
            const json = await response.json();
            
            // console.log("response : ",response);
            
            if(response.status === 200){
                localStorage.setItem('name',json.name);
                localStorage.setItem('email',json.email);
                localStorage.setItem('id',json._id);
                localStorage.setItem('token',json.token);

                // console.log(localStorage.getItem('name'));
                // console.log(localStorage.getItem('email'));
                // console.log(localStorage.getItem('id'));
                // console.log(localStorage.getItem('token'));

                toast.success("User logged in succesfully.");
                props.socket.emit('i-am-online',{userId : json._id,name : json.name});
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
              Log In
          </h1>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
           
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input onChange={handleFieldChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onChange={handleFieldChange} type="password" name="password" id="password"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              
              <button type="submit" className="w-full rounded-lg bg-cyan-400 hover:bg-cyan-600 text-white py-2 px-4 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-200 ease-in-out">
                   Login
             </button>

              <p className="text-white ">
                  Don't have an account? <a onClick={handleClick} className="font-medium text-primary-600 hover:underline text-blue-200 ">Sign Up here</a>
              </p>
          </form>
      </div>
  </div>
</div>
</section>
  )
}

export default Login