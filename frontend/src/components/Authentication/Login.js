import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div class="container-login">
      <div class="img-logo"></div>
      <div class="login-title">Login</div>
      <div>
        <form class="form-content">
          <div class="email-content">
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div class="pwd-content">
            <input
              value={password}
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <span onClick={handleClick}>{show ? "Hide" : "Show"}</span>
          </div>
          <div class="submit-content" onClick={submitHandler}>
            Login
          </div>
          <div
            class="guest-content"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Guest User Credentials
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
