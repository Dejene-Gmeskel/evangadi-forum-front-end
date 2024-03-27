
import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "../../pages/Question/question.module.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
 

function Answer() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const answerDom = useRef(null);
  const token = localStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Function to fetch question and answers when component mounts
    const fetchData = async () => {
      try {
        const questionResponse = await axios.get(`/questions/singlequestion/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestion(questionResponse.data);

        const answersResponse = await axios.get(`/answers/allanswers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnswers(answersResponse.data);
      } catch (error) {
        console.error("Error fetching question and answers:", error);
      }
    };

    fetchData(); 
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    answerDom.current.style.backgroundColor = answerDom.current.value ? "" : "#FAE6E6";
    const answerValue = answerDom.current.value;
    if (!answerValue) {
      setErrorMessage("Please provide your answer");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(
        `/answers/postanswer/${id}`,
        { answer: answerValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      // Refresh answers after posting
      const answersResponse = await axios.get(`/answers/allanswers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswers(answersResponse.data);
      answerDom.current.value = ""; // Clear answer input field
    } catch (error) {
      // Handle error if the answer couldn't be posted
      if (error.response) {
        // Server responded with an error status code
        setErrorMessage(error.response.data.msg || "An error occurred while posting your answer");
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        setErrorMessage("An error occurred while posting your answer");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      //console.error("Error posting answer:", error);
    }
  };
 
  return (
    <Layout>
      <div className={classes.question_container}>
        <div className={classes.question_wrapper}>
          {question && (
            <div>
              <div className={classes.header}>
                <span className={classes.questi}>QUESTION</span>
              </div>
              <div className={classes.question}>
                <FaArrowCircleRight color="#516CF0" size={30} />
                <h3>
                  {question.title}
                  <div className={classes.line}></div>
                </h3>
              </div>
              <p className={classes.descri}>{question.description}</p>
            </div>
          )}
          <h1 className={classes.community}>Answer From The Community</h1>
          <div className={classes.answer_shadow}>
            {answers.length > 0 &&
              answers.map((answer, index) => {
                return (
                  <div key={index}  className={classes.Answer_Wrap}>
                    <div className={classes.Answer}>
                      <div className={classes.avatar}>
                        <div>
                          <BsPersonCircle size={60} color="#90EE90" />
                        </div>
                        {answer?.username}
                      </div>
                      <div>{answer?.answer}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <h6 className={classes.answer_question}>Answer The Top Question</h6>
          <div className={classes.question_headtitle2}>
            {errorMessage && (
              <p className={classes.errordisMsg}>{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  rows={4}
                  className={classes.question_description}
                  ref={answerDom}
                  type="text"
                  placeholder=" Write Your Answer Here..."
                />
              </div>

              <button
                className={classes.question_button}
                variant="primary"
                type="submit"
              >
                Post Your Answer
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Answer;