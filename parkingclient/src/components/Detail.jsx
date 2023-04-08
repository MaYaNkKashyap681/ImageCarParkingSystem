import { useState, useEffect } from "react";
import { months, days } from "../constants/index";

const Detail = () => {
  const detail = JSON.parse(localStorage.getItem("clickedItem"));


  useEffect(() => {
    // fetchParking();

  }, [detail._id]);

  return (
    <div>
      {detail ? (
        <>
          <h1>Veicle Number</h1>
          <span>{detail.vehicleNumber}</span>
          <h1>Veicle Type</h1>
          <span>{detail.vehicleType}</span>
          <h1>Date</h1>
          <span>{`${months[new Date(detail.createdAt).getMonth()]}, ${days[new Date(detail.createdAt).getDay()]}, ${new Date(detail.createdAt).getDate()}`}</span>
          <h1>Slot Booked</h1>
          <span>{`${new Date(detail.dateTime)}, ${new Date(detail.exitTime)}`}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
