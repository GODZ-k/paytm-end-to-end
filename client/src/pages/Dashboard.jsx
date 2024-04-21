import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState("");

  // display user balance
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};
