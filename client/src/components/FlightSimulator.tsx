import { Suspense } from "react";
import Airplane from "./Airplane";
import Terrain from "./Terrain";
import Sky from "./Sky";
import Lights from "./Lights";

export default function FlightSimulator() {
  return (
    <>
      <Lights />
      
      <Suspense fallback={null}>
        <Sky />
        <Terrain />
        <Airplane />
      </Suspense>
    </>
  );
}
