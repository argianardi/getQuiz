import Link from "next/link";
import React from "react";
import { GiGamepadCross, GiRun } from "react-icons/gi";
import withProtected from "../../hoc/withProtected";

const StartQuiz = () => {
  return (
    <div className="p-2 h-screen flex flex-col justify-center bgLamp">
      <div className="mb-5 w-full sm:w-[500px] mx-auto rounded-md bg-white/20  effectBlur py-16">
        <GiGamepadCross size={50} className="mx-auto" />
        <div className="flex border-b-2 border-blue-900  mb-5 justify-center items-center">
          <p className="text-2xl font-bold text-center  sm:text-3xl md:text-4xl">
            Are you Ready?
          </p>
        </div>
        <Link
          className="flex items-center justify-center mx-auto font-bold bg-blue-900 w-52 text-white rounded-sm"
          href={"/get-quiz"}
        >
          <GiRun size={40} />
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default withProtected(StartQuiz);
