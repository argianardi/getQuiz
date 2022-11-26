import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiGamepadCross } from "react-icons/gi";

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=10&type=multiple`
  );
  const questions = data.results;
  return {
    props: {
      questions: questions,
    },
  };
};

const Index = ({ questions }) => {
  const [endQuiz, setEndQuiz] = useState(false);
  const [currQues, setCurrQues] = useState(0);
  const [options, setOption] = useState([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState("");

  useEffect(() => {
    console.log(questions);
    setCorrect(questions[currQues]?.correct_answer);
    setOption(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      {endQuiz ? (
        <>
          <p>Final Score: {score}</p>
          <button className="px-3 py-1 font-bold text-white bg-blue-700 rounded-md">
            Play Again
          </button>
          <button className="bg-[#f7731c] text-white font-bold py-1 px-3 rounded-md">
            Logout
          </button>
        </>
      ) : (
        <>
          {questions ? (
            <div className="p-2 h-screen flex flex-col justify-center">
              <div className="mb-5 w-full sm:w-[500px] mx-auto">
                <GiGamepadCross size={50} className="mx-auto" />
                <p className="text-2xl font-bold text-center border-b-2 border-blue-900 mb-5 sm:text-3xl md:text-4xl">
                  Welcome to getQuiz
                </p>
              </div>

              <div className="shadow-md shadow-slate-600 rounded-md p-2 sm:p-10 w-full sm:w-[500px] mx-auto">
                <div className="flex justify-around sm:justify-between text-xl">
                  <p>Question {currQues + 1}</p>
                  <p>Score: {score}</p>
                </div>

                <div className="text-lg mb-5 font-medium">
                  <p>{questions[currQues].question}</p>
                </div>

                <div className="flex flex-col w-full sm:w-72 justify-center mx-auto gap-2">
                  {options &&
                    options.map((i) => (
                      <button
                        key={i}
                        className={`p-1 border-2 border-blue-900 `}
                      >
                        {i}
                      </button>
                    ))}
                </div>

                <div className="mx-auto mt-5 mb-2 flex justify-between">
                  <button
                    className="bg-[#f7731c] rounded-sm px-3 py-1 text-white font-bold"
                    onClick={() => setEndQuiz(!endQuiz)}
                  >
                    Quit
                  </button>
                  <button className="rounded-sm px-3 py-1 font-bold text-white bg-blue-900">
                    Next Question
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen min-w-full">
              <p className="mt-[300px] text-5xl text-center">Loading.....</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
