import React from 'react';

export type Setter<T> = (n: T) => void;

export const FlightButtons: React.FC<{
    x: number, y: number, sx: number, sy: number, setSpeed: (x: number, y: number) => void,
    manufuel: number, setManuFuel: Setter<number>,
}> = props => {
    const ax = 3, ay = 3;
    return <>
        <button onClick={() => { if (props.manufuel > 0) { props.setManuFuel(props.manufuel - 1); props.setSpeed(props.sx, props.sy - ay) } }} className="hiddenButton" style={{ top: 70, left: 340, width: 50, height: 50 }}>U</button>
        <button onClick={() => { if (props.manufuel > 0) { props.setManuFuel(props.manufuel - 1); props.setSpeed(props.sx - ax, props.sy) } }} className="hiddenButton" style={{ top: 120, left: 290, width: 50, height: 50 }}>L</button>
        <button onClick={() => { if (props.manufuel > 0) { props.setManuFuel(props.manufuel - 1); props.setSpeed(props.sx, props.sy + ay) } }} className="hiddenButton" style={{ top: 170, left: 340, width: 50, height: 50 }}>D</button>
        <button onClick={() => { if (props.manufuel > 0) { props.setManuFuel(props.manufuel - 1); props.setSpeed(props.sx + ax, props.sy) } }} className="hiddenButton" style={{ top: 120, left: 390, width: 50, height: 50 }}>R</button>

        <OrientationDisplay x={props.x} y={props.y} />

        <button className="devButton" style={{ top: 153, left: 568, width: 50, height: 50 }}>stage</button>
        <button className="devButton" style={{ top: 153, left: 887, width: 50, height: 50 }}>chute</button>

        <button className="devButton" style={{ top: 651, left: 232, width: 50, height: 50 }}>tar</button>

    </>;
}

const OrientationDisplay: React.FC<{ x: number, y: number }> = props => {
    const cx = 140;
    const cy = 180;

    const edge = 80; //90 -> edge 270 -> other edge

    let cartx = Math.sin(props.x * Math.PI / 180) * Math.cos(props.y * Math.PI / 180) * edge;
    let carty = Math.sin(props.x * Math.PI / 180) * Math.sin(props.y * Math.PI / 180) * edge;
    let cartz = Math.cos(props.x * Math.PI / 180) * edge;

    let top = cy + carty;
    let left = cx + cartx;

    let tb = cy - carty;
    let tl = cx - cartx;
    return <>
        {cartz >= 0 ?
            <div style={{ border: "1px solid red", borderRadius: 10, width: 5, height: 5, position: "absolute", left, top, backgroundColor: "red" }}></div>
            : null}
        {cartz <= 0 ?
            <div style={{ border: "3px solid blue", borderRadius: 10, width: 5, height: 5, position: "absolute", left: tl, top: tb, }}></div>
            : null}
    </>;
}

export const ThrottleDisplay: React.FC<{
    throttle: number, setThrottle: Setter<number>
    fuel: number, setFuel: Setter<number>,
    manufuel: number, setManuFuel: Setter<number>,
    engineOn: boolean, setEngineOn: Setter<boolean>,
}> = props => {
    React.useEffect(() => {
        if (props.engineOn && props.throttle > 0) {
            setTimeout(() => {
                props.setFuel(props.fuel - props.throttle * .05)
            }, 100);
        }
    }, [props.engineOn, props.fuel, props.throttle])
    return <>
        <button onClick={() => { props.setEngineOn(true) }} className="hiddenButton" style={{ top: 408, left: 270, width: 50, height: 50 }}>ign</button>
        <button onClick={() => { props.setEngineOn(false) }} className="hiddenButton" style={{ top: 517, left: 270, width: 50, height: 50 }}>shtf</button>

        <div style={{ width: 50, height: 50, borderRadius: 50, position: "absolute", left: 400, top: 330, border: "5px solid black", backgroundColor: props.engineOn ? "lightgrey" : "black" }}></div>

        <button onClick={() => props.setThrottle(Math.min(100, props.throttle * 1.2 + 10))} className="hiddenButton" style={{ top: 364, left: 172, width: 50, height: 50 }}>ut</button>
        <button onClick={() => props.setThrottle(Math.max(0, props.throttle / 1.2 - 10))} className="hiddenButton" style={{ top: 513, left: 172, width: 50, height: 50 }}>dt</button>
        <div style={{ width: 95, height: 40, position: "absolute", top: 516 - props.throttle * 1.5, left: 50, backgroundColor: "black" }}></div>

        <div style={{ width: 252 * props.fuel / 1000, height: 30, position: "absolute", top: 414, left: 529, backgroundColor: "grey" }}></div>
        <div style={{ width: 252 * props.manufuel / 100, height: 30, position: "absolute", top: 522, left: 528, backgroundColor: "grey" }}></div>
    </>;
}