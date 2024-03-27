import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../component/Dataprovider/DataProvider";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "./question.module.css";
import { FaArrowCircleRight } from "react-icons/fa";

function Question() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  //console.log(userData)
  const titleDom = useRef();
  const descriptionDom = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  async function handleSubmit(e) {
    e.preventDefault();
    titleDom.current.style.backgroundColor = titleDom.current.value ? "" : "#FAE6E6";
    descriptionDom.current.style.backgroundColor = descriptionDom.current.value ? "" : "#FAE6E6";

    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      setErrorMessage("Please provide all the required information");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
      await axios.post(
        "/questions/askquestion",
        {
          title: titleValue,
          description: descriptionValue,
          userid: userData?.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/home");
    } catch (error) {
      setErrorMessage("something went wrong,Please try again!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      //console.log(error);
    }
  }

  return (
    <Layout>
      <div className={classes.question_container}>
        <div className={classes.question_wrapper}>
          <div className={classes.steps}>
            <h3 className={classes.question_headtitle}>
              Steps To Compile Your Question.
              <div className={classes.steps_line}></div>
            </h3>
            <ul className={classes.question_li}>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Summarize your problems in a one-line title.</div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Describe your problem in more detail.</div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>
                  Explain what you have tried and what you expected to know.
                </div>
              </li>
              <li>
                <div>
                  <FaArrowCircleRight color="#35355E" size={15} />
                </div>
                <div>Review your question and post it to the site.</div>
              </li>
            </ul>
          </div>

          <h4 className={classes.post_your}>Post Your Question</h4>
          {errorMessage && (
            <p className={classes.errordisMsg}>{errorMessage}</p>
          )}
          <div className={classes.question_headtitle2}>
            <form onSubmit={handleSubmit}>
              <input
                className={classes.question_title}
                ref={titleDom}
                type="text"
                placeholder="Title"
              />
              <textarea
                rows={4}
                className={classes.question_description}
                ref={descriptionDom}
                type="text"
                placeholder="Question Description..."           
                style={{ border: descriptionDom ? "" : "1px solid red" }}
              />
              <span>
                <button
                  className={classes.question_button}
                  variant="primary"
                  type="submit"
                >
                  Post Your Question
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Question;
