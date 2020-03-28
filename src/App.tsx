import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comm from "./images/comm.png";
import Flight from "./images/flight.png";
import Window from "./images/window.png";
import Seat from "./images/seat.png";
import { FlightButtons, ThrottleDisplay } from './scenes/flight';

export interface IShip {
  // Theta & Phi for orientation (Yaw, Pitch, roll, etc)
  x: number,
  y: number,

  // Speed for T & P
  sx: number,
  sy: number,

  // Throttle and fuel
  throttle: number,
  primaryFuel: number,
  manueverFuel: number,

  // velocity
  v: number,
}

function App() {
  const [scene, setScene] = React.useState<"Comm" | "Flight" | "Window" | "Seat" | "Menu">("Flight");

  let content: React.ReactNode = <div>Welcome to space.</div>;

  const [x, setx] = React.useState(0);
  const [y, sety] = React.useState(0);
  const [sx, setsx] = React.useState(0);
  const [sy, setsy] = React.useState(0);

  //console.log(sx,sy);

  const [throttle, setThrottle] = React.useState(50);
  const [mainFuel, setMainFuel] = React.useState(1000);
  const [manueverFuel, setManueverFuel] = React.useState(100);
  const [engingeOn, setEngineOn] = React.useState(false);
  
  let timeout: NodeJS.Timeout | null = null;
  React.useEffect(() => {
    if (sx != 0 || sy != 0) {
      timeout = setTimeout(() => {
        setx((x + sx + 360) % 360);
        sety((y + sy + 360) % 360);
      }, 100);
    }
  }, [sx, sy, x, y]);

  switch (scene) {
    case "Comm":
      content = <img src={Comm} />
      break;
    case "Flight":
      content = <>
        <img src={Flight} />
        <FlightButtons
         x={x} y={y} sx={sx} sy={sy} 
         setSpeed={(nx, ny) => { clearTimeout(timeout!); setsx(nx); setsy(ny); }} 
         manufuel={manueverFuel} setManuFuel={setManueverFuel}
         />
        <ThrottleDisplay 
        throttle={throttle} setThrottle={setThrottle} 
        fuel={mainFuel} setFuel={setMainFuel} 
        manufuel={manueverFuel} setManuFuel={setManueverFuel}
        engineOn={engingeOn} setEngineOn={setEngineOn}
         />
      </>;
      break;
    case "Window":
      content = <img src={Window} />
      break;
    case "Seat":
      content = <img src={Seat} />
      break;
  }

  return (
    <div
      className="App"
      style={{
        fontFamily: "Consolas",
        fontSize: "24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%"
      }}>
      <div style={{ flex: "auto", position: "relative" }}>
        {content}

      </div>
      <div style={{ marginTop: "auto", margin: 30 }}>
        <button onClick={() => setScene("Flight")}>{"Flight"}</button>
        <button onClick={() => setScene("Window")}>{"Window"}</button>
        <button onClick={() => setScene("Seat")}>{"Seat"}</button>
        <button onClick={() => setScene("Comm")}>{"Comm"}</button>
      </div>
    </div>
  );
}

export default App;
