import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { set } from "mongoose";

function Homepage() {
  const history = useHistory();
  const [login, setLogin] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  const handleClick = (e) => {
    console.log(e);
    if (e === 0) setLogin(0);
    if (e === 1) setLogin(1);
  };

  return (
    <div class="container">
      <div class="sub-img"></div>
      <div class="main-content">
        <div class="btn-check">
          <button
            class={`${login === 0 ? "active" : ""}`}
            onClick={() => handleClick(0)}
          >
            Login
          </button>
          <button class={`${login === 1 ? "active" : ""}`} onClick={() => handleClick(1)}>
            SignUp
          </button>
        </div>
        <div>
          {login === 0 && <Login />}
          {login === 1 && <Signup />}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
