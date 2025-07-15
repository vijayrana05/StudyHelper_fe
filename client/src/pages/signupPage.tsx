import { useState } from "react";

export function Signup() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const[message, setMessage] = useState("")
    const [name,setName] = useState("")
    const handleSignup = async (e:any) => {
        e.preventDefault();
    
        try {
          console.log("test3")
          const response = await fetch("http://localhost:5000/api/authRoutes/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });
    
          console.log("test2")
    
          const data = await response.json();
    
          console.log("Response OK:", response.ok);
          console.log("Response Data:", data);
          console.log(message)
          if (response.ok) {
    
            setMessage("Signup successful!");
          } else {
            setMessage(data.message || "Signup failed.");
          }
        } catch (error) {
          setMessage("An error occurred. Please try again.");
        }
      };
    return (
        <div>
            <div>
                <div className="">
                    <input type="text" placeholder="enter name" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} className="bg-blue-300"></input>
                </div>
                <div className="">
                    <input type="text" placeholder="enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} className="bg-blue-300"></input>
                </div>
                <div className="">
                    <input type="text" placeholder="enter passowrd" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} className="bg-blue-400"></input>
                </div>
                <div>
                    <button onClick={handleSignup}>Signin</button>
                </div>
                <div>{message}</div>
            </div>  
        </div>
    )
}