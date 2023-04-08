import { parking } from "../assets/index";
import { useEffect, useRef, useState } from "react";
import InputField from "./inputfield/InputField";
import axios from "axios";
import Detail from "./Detail";
import Form from "./Form";
import { Submitted } from "../assets/index";
import sound from "../assets/notification.mp3";

const baseUrl = "http://localhost:3000/parking";
const Image = () => {
  const dotRef = useRef(null);
  // const [park, setPark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [busySlots, setBusySlots] = useState(null);
  const [filter, setFilter] = useState(null);
  const [booked, setBooked] = useState(null);
  const [aud, setAud] = useState(null);

  const [details, setDetails] = useState({
    vehicleNumber: null,
    vehicleType: null,
    exitTime: null,
    xoffset: null,
    yoffset: null,
    dateTime: null,
  });

  const fetchBusyParking = async () => {
    if (!filter) {
      alert("Enter Slot");
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/filter/${filter}`);

      if (res.status === 200) {
        setBusySlots(res.data);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClear = () => {
    setBusySlots(null);
    // setFilter(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleBusyClick = (data) => {
    localStorage.setItem("clickedItem", JSON.stringify(data));
    setToggle((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !details.vehicleNumber ||
        !details.vehicleType ||
        !details.xoffset ||
        !details.yoffset ||
        !details.exitTime ||
        !details.dateTime
      ) {
        alert("Fields cannot be empty");
        return;
      }

      const res = await axios.post(`${baseUrl}/add`, {
        vehicleNumber: details.vehicleNumber,
        vehicleType: details.vehicleType,
        exitTime: details.exitTime,
        xoffset: details.xoffset,
        yoffset: details.yoffset,
        dateTime: details.dateTime,
      });
      if (res.status === 200) {
        setBooked(res.data);
        new Audio(Submitted).play();
        dotRef.current.style.top = "30px";
        dotRef.current.style.left = "30px";
        alert("Slot Booked");
      }
    } catch (err) {
      console.log(err)
      alert(err.message);
    } finally {
      setDetails({
        ...details,
        vehicleNumber: null,
        vehicleType: null,
        time: null,
        xoffset: null,
        yoffset: null,
        dateTime: null,
      });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let isDown = false;
    let isUp = true;
    if (!dotRef || !dotRef.current) return;

    const handleMouseEnter = (e) => {
      isDown = true;
      isUp = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      dotRef.current.style.top = `${e.clientY - 10}px`;
      dotRef.current.style.left = `${e.clientX - 10}px`;
    };

    const handleMouseClick = (e) => {
      isDown = false;
      isUp = true;
      if (e.clientX > 368 && e.clientY > 25) {
        setIsOpen(true);
        setDetails({ ...details, xoffset: e.clientX, yoffset: e.clientY });
      }
    };
    dotRef.current.addEventListener("mouseenter", handleMouseEnter);
    dotRef.current.addEventListener("mousemove", handleMouseMove);
    dotRef.current.addEventListener("click", handleMouseClick);

    return () => {
      dotRef.current.removeEventListener("mouseenter", handleMouseEnter);
      dotRef.current.removeEventListener("mousemove", handleMouseMove);
      dotRef.current.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <div className="main_container">
      <div className="parking-container">
        <div className="parking-ball-container">
          <div className="ball-outer">
            {<div className="parking-ball" ref={dotRef}></div>}
          </div>
          {busySlots ? (
            busySlots.map((slot) => (
              <div
                className="parking-ball col-red"
                onClick={() => handleBusyClick(slot)}
                key={slot._id}
                style={{ left: slot.xoffset - 10, top: slot.yoffset - 10 }}
              ></div>
            ))
          ) : (
            <></>
          )}

          {booked ? (
            <>
              <div
                className="parking-ball col-red"
                onClick={() => handleBusyClick(booked)}
                key={booked._id}
                style={{ left: booked.xoffset - 10, top: booked.yoffset - 10 }}
              ></div>
            </>
          ) : (
            <></>
          )}
          <span
            style={{
              top: "80px",
              position: "absolute",
              color: "white",
              backgroundColor: "green",
              padding: "20px",
            }}
          >
            Place this Green dot to slot
          </span>
          <div
            style={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: "20px",
            }}
          >
            <InputField
              type="datetime-local"
              name="filterdate"
              label="Enter date and time"
              placeholder="check slot"
              changeFunction={handleFilterChange}
            />
            <div className="button" onClick={fetchBusyParking}>
              Check Slot
            </div>

            {busySlots ? (
              <div
                className="button"
                style={{
                  marginTop: "20px",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={handleClear}
              >
                Clear
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="image-container">
          <img src={parking} alt="parking image" />
        </div>
      </div>

      {toggle ? (
        <div className="detail-model">
          <div
            className="closing-button"
            onClick={() => setToggle((prev) => !prev)}
          >
            X
          </div>
          <Detail />
        </div>
      ) : (
        <></>
      )}

      {isOpen ? (
        <Form
          setIsOpen={setIsOpen}
          handleDetailsChange={handleDetailsChange}
          handleFormSubmit={handleFormSubmit}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Image;
