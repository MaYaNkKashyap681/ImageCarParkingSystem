import { useState, useEffect, useRef } from "react";
import { Image } from "./components";
import "./App.css";

const App = () => {
  //  useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     setMousePos({ x: event.clientX, y: event.clientY });
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener(
  //       'mousemove',
  //       handleMouseMove
  //     );
  //   };
  // }, []);

  // useEffect(() => {
  //   let isDown = false;
  //   let isUp = true;
  //   if (!boxRef || !boxRef.current) return;

  //   const handleMouseEnter = (e) => {
  //     isDown = true;
  //     isUp = false;
  //   };

  //   const handleMouseMove = (e) => {
  //     if (!isDown) return;
  //     console.log(e.clientX, e.clientY);
  //     boxRef.current.style.top = `${e.clientY - 30}px`;
  //     boxRef.current.style.left = `${e.clientX - 30}px`;
  //   };

  //   const handleMouseClick = (e) => {
  //     isDown = false;
  //     isUp = true;
  //   };
  //   boxRef.current.addEventListener("mouseenter", handleMouseEnter);
  //   boxRef.current.addEventListener("mousemove", handleMouseMove);
  //   boxRef.current.addEventListener("click", handleMouseClick);

  //   return () => {
  //     boxRef.current.removeEventListener("mouseenter", handleMouseEnter);
  //     boxRef.current.removeEventListener("mousemove", handleMouseMove);
  //     boxRef.current.removeEventListener("click", handleMouseClick);
  //   };
  // }, []);

  return (
    <div className="app">
      {/* <div className="box" ref={boxRef}></div> */}
      <Image />
    </div>
  );
};

export default App;
