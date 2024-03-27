import React from "react";
import { useContext, useState } from "react";
import Layout from "../../component/Layout/Layout";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import QuestionList from "../allQuestion/QuestionList";
import { UserContext } from "../../component/Dataprovider/DataProvider";
 
function Home() {
  const [userData,setUserData] = useContext(UserContext);
  //console.log(userData)
  const [searchQuery, setSearchQuery] = useState("");
 
  return (
    <Layout>
      <div className={classes.home}>
        <div className={classes.ask_wrapper}>
          <div className={classes.ask}>
            <Link to={"/question"}>
              <button>Ask Question</button>
            </Link>
          </div>

          <div className={classes.question_search}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3 className={classes.welcome_username}>
            Welcome: {userData?.firstname}
            
          </h3>
        </div>
        <div className={classes.question_header}>
          <h2>Questions</h2>
          <hr />
        </div>
        <QuestionList searchQuery={searchQuery} />
      </div>
    </Layout>
  );
}

export default Home;
