import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [filter , setFilter] = useState("")
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users?filter=${filter}`);

        setUsers(response.data.users);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [filter]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          onChange={(e)=> setFilter(e.target.value)}
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {

  const navigate =  useNavigate()

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.username[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.username} 
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onClick={()=>{
          navigate(`/send?id=${user._id}&name=${user.username}`)
        }} label={"Send Money"} />
      </div>
    </div>
  );
}
