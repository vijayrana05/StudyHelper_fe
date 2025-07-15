import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const[message, setMessage] = useState("")
    const navigate = useNavigate();
    const handleLogin = async (e:any) => {
        e.preventDefault();
        console.log("signin reached")

        try {
            const response = await fetch("http://localhost:5000/api/authRoutes/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            const userId = data.userId;
            const token = data.token || response.headers.get("Authorization")?.split(" ")[1];
            console.log(userId)
            if (token) {
                localStorage.setItem("authToken", token);
                console.log("Token stored:", token);
            }

            if (response.ok && userId) {
                navigate(`/home`);
            } else {
                setMessage(data.message || "Signin fdkdkd.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (

        <div>
            <div>
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
                    <button onClick={handleLogin}>Signin</button>
                </div>
                <div>{message}</div>
            </div>  
        </div>
    )
}