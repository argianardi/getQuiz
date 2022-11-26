import axios from "axios";
import React from "react";

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
  console.log(questions);
  return (
    <div>
      <p>GetQuiz</p>
    </div>
  );
};

export default Index;
