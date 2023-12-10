import React, { useContext, useEffect } from "react";
import { JobContext } from "../../context/JobsStore";

const Alert = () => {
  const { alertMessage, setAlertMessage } = useContext(JobContext);

  const setMessage = () => {
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  useEffect(() => {
    setMessage();
  }, [alertMessage]);

  return (
    <>
      {alertMessage === "" ? (
        ""
      ) : (
        <div className="alert_container absolute z-10 top-0 w-full flex justify-center bg-blue-200 py-2">
          <div className="alert_message w-4/5 text-2xl py-2">
            Message : {alertMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
