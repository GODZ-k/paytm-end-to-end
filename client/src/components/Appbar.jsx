import axios from "axios";
import {Link} from "react-router-dom"

export const Appbar = () => {

  async function logoutUser() {
    await axios.get("http://localhost:3000/api/v1/user/logout", {
      headers: {
        Authorization: `Barear ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token")
  }
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          {
            !localStorage.getItem("token") ? <Link to={"/signin"}>Login</Link> : <button onClick={logoutUser}>Logout</button>
          }
          
        </div>
      </div>
    </div>
  );
};
