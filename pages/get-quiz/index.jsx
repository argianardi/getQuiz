import axios from "axios";
import React, { useEffect, useState } from "react";
import withProtected from "../../hoc/withProtected";
import {
  GiGamepadCross,
  GiSandsOfTime,
  GiPencil,
  GiAchievement,
} from "react-icons/gi";

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

const GetQuiz = ({ questions }) => {
  const [endQuiz, setEndQuiz] = useState(false);
  const [currQues, setCurrQues] = useState(0);
  const [options, setOption] = useState([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState("");
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(25);

  let waktu;
  useEffect(() => {
    waktu = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(waktu);
  });

  let startTime;
  useEffect(() => {
    setCorrect(questions[currQues]?.correct_answer);
    setOption(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
    startTime = setTimeout(() => {
      handleTimeUp();
    }, 25000);

    return () => clearInterval(startTime);
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "bg-[#06a600]";
    } else if (selected === i && selected !== correct) {
      return "bg-[#ba0000]";
    } else if (i === correct) {
      return "bg-[#06a600] ";
    } else {
      return "bg-slate-200 opacity-60";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 10);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      setEndQuiz(!endQuiz);
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
      setTimer(25);
    } else {
      setError("Please select an option first");
    }
  };

  const handleTimeUp = () => {
    if (currQues > 8) {
      setEndQuiz(!endQuiz);
    } else {
      setCurrQues(currQues + 1);
      setSelected();
      setTimer(25);
    }
  };

  const handlePlayAgain = () => {
    setCurrQues(0);
    setScore(0);
    setSelected();
    setTimer(25);
    setEndQuiz(!endQuiz);
  };

  return (
    <div>
      {endQuiz ? (
        <div className="p-2 h-screen flex flex-col justify-center">
          <div className="mb-5 w-full sm:w-[500px] mx-auto">
            <GiGamepadCross size={50} className="mx-auto" />
            <p className="text-2xl font-bold text-center border-b-2 border-blue-900 mb-5 sm:text-3xl md:text-4xl">
              Final Scrore: <span>{score}</span>
            </p>

            <div className="flex flex-col gap-3 w-[280px] sm:w-[400px] mx-auto">
              <button
                className="px-3 py-1 font-bold text-white bg-blue-700 rounded-md"
                onClick={() => handlePlayAgain()}
              >
                Play Again
              </button>
              <button className="bg-[#f7731c] text-white font-bold py-1 px-3 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {questions ? (
            <div className="p-2 h-screen flex flex-col justify-center">
              <div className="mb-2 w-full sm:w-[500px] mx-auto">
                <GiGamepadCross size={50} className="mx-auto" />
                <p className="text-2xl font-bold text-center border-b-2 border-blue-900 mb-5 sm:text-3xl md:text-4xl">
                  Welcome to getQuiz
                </p>
                <div className="flex items-center justify-center ">
                  <GiSandsOfTime size={30} />
                  <h2 className="text-center my-1 text-2xl">
                    Timer: <span className="font-bold">{timer}</span>
                  </h2>
                </div>
              </div>

              <div className="shadow-md shadow-slate-600 rounded-md p-2 sm:p-3 w-full sm:w-[500px] mx-auto">
                <div className="flex justify-around sm:justify-between text-xl">
                  <div className="flex items-center">
                    <GiPencil size={30} />
                    <p>Question {currQues + 1}</p>
                  </div>
                  <div className="flex items-center">
                    <GiAchievement size={30} />
                    <p>Score: {score}</p>
                  </div>
                </div>

                <div className="text-lg mb-3 font-medium">
                  <p>{questions[currQues].question}</p>
                </div>

                <div className="flex flex-col w-full sm:w-72 justify-center mx-auto gap-2">
                  {error && (
                    <p className="bg-[#f7731c] py-1 px-2 text-white font-bold">
                      Please select an option first{" "}
                      <span className="text-red-900">**</span>
                    </p>
                  )}

                  {options &&
                    options.map((i) => (
                      <button
                        onClick={() => handleCheck(i)}
                        key={i}
                        className={`p-1 border-2 border-blue-900 ${
                          selected && handleSelect(i)
                        }`}
                        disabled={selected}
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
                  <button
                    className="rounded-sm px-3 py-1 font-bold text-white bg-blue-900"
                    onClick={() => handleNext()}
                  >
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

export default withProtected(GetQuiz);
