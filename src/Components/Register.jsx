import React from "react";
import {useForm} from "react-hook-form"
import {DevTool} from "@hookform/devtools"
import axios from "axios";

const Register = () => {
  const inputstyle = "p-3 bg-red-50 rounded-m w-full";

  const form=useForm()
  const {register,control,handleSubmit,formState,getValues}=form
  const{errors}=formState
  
  const onSubmit = (data)=>{
    console.log(data)
    axios.post("http://localhost:3001/loginapi/register",data)
    .then(()=>{
      console.log("Done")
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="flex justify-center items-center bg-gray-700 h-[calc(100vh-10vh)] flex-col">
        <h1 className="text-center text-5xl p-3 font-bold text-gray-200">Register</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-around bg-slate-300 p-5 m-5 rounded-3xl h-full w-1/3 items-center relative min-w-fit shadow-lg shadow-white">
          <div className="w-full">
            <label className="text-xl font-bold text-gray-700">UserName</label>
            <input className={inputstyle} type="text" placeholder="Name" id="username" name="username" {...register("username",{required:{value:true,message:"Name is Required"},maxLength:20,minLength:3})}/>
            <p className="text-red-700 ">{errors.username?.message}</p>
          </div>
          <div className="w-full ">
            <label className="text-xl font-bold text-gray-700">Email</label>
            <input className={inputstyle} type="email" placeholder="Email" id="email" name="email" {...register("email",{required:{value:true,message:"Email is Required"},pattern:{value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"Invalid Email Format"}})}/>
            <p className="text-red-700 ">{errors.email?.message}</p>
          </div>
          <div className="w-full ">
            <label className="text-xl font-bold text-gray-700">Password</label>
            <input className={inputstyle} type="password" placeholder="Password" id="password" name="password" {...register("password",{required:{value:true,message:"Password is Required"},minLength:6,maxLength:20})}/>
            <p className="text-red-700 ">{errors.password?.message}</p>
          </div>
          <div className="w-full ">
            <label className="text-xl font-bold text-gray-700">Confirm Password</label>
            <input
                className={inputstyle}
                type="password"  
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                {...register("cpassword", {
                    required: { value: true, message: "Password is Required" },
                    minLength: { value: 6, message: "Password should be at least 6 characters" },
                    maxLength: { value: 20, message: "Password should be at most 20 characters" },
                    validate: (value) =>
                    value === getValues("password") || "Password should be the same as above",
                })}
                />
            <p className="text-red-700 ">{errors.cpassword?.message}</p>
          </div>
          <button className="bg-gray-500 w-1/2 text-2xl p-3 rounded-lg font-bold text-white hover:opacity-80 transition-opacity" type="submit">Submit</button>
        </form>
        <DevTool control={control}/>
      </div>
  );
};

export default Register;
