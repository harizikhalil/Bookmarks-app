import React from "react";
import Loader from "react-loader-spinner";
const Spinner = ({ color }) => {
  return (
    <div className="Spinner">
      <Loader
        type="Circles"
        color={color}
        height={100}
        width={100}
        timeout={3000} //3 sec
      />
    </div>
  );
};
export default Spinner;
