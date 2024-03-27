import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./component/Dataprovider/DataProvider";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import axios from "./api/axiosConfig";
import Question from "./pages/Question/Question";
import Answer from "./pages/Answer/Answer";
import NotFound from "./pages/login/Notfound";


function App() {
  const [userData,setUserData]= useContext(UserContext);
  //console.log(userData)
 
  const navigate = useNavigate();
 
  const checkUserLoggedIn = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      } else {
        const { data } = await axios.get(
          "/users/check",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        //console.log(data);
        setUserData(data);
        //console.log(userData)
      }
    } catch (error) {
      //console.log(error.data?.msg);
      navigate("/login");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/:id" element={<Answer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
   
  );
}

export default App;
