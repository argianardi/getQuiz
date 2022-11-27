import React from "react";

const getErrorMessage = (type) => {
  switch (type) {
    case "minLength":
      return "The number of characters does not meet the minimum";
    case "required":
    default:
      return "Please fill in the fields";
  }
};

const ErrorMessage = ({ errors }) => {
  if (!errors) {
    return <></>;
  }

  const { type } = errors;
  const message = getErrorMessage(type);

  return (
    <div>
      <p className="text-red-600 text-xs px-2 mt-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;
