import { useEffect, useState } from "react"
import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    let [balance, setBalance] = useState(0)
    useEffect(() =>
    {
        axios.get('http://localhost:3000/api/v1/account/balance',{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token in Authorization header
          }},)
        .then((response) =>
        {
            
            setBalance(response.data.balance)
            console.log(response.data,'hii')
            
        })
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}