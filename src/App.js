import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./App.css";
import ScatterPlot from "./ScatterPlot";
import HeatMap from "./HeatMap";
import ChoroplethMap from "./ChoroplethMap";
import TreeMap from "./TreeMap";

function App() {
  const [barChartData, setBarChartData] = useState(null);
  const [scatterPlotData, setScatterPlotData] = useState(null);
  const [heatMapData, setHeatMapData] = useState(null);
  const [choroplethMapData, setChoroplethMapData] = useState(null);
  const [US, setUS] = useState(null);
  const [treeMapData, setTreeMapData] = useState(null);

  useEffect(() => {
    async function getBarChartData() {
      fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
      )
        .then(json => json.json())
        .then(res => {
          setBarChartData(res.data);
        });
    }

    async function getScatterPlotData() {
      fetch(
        "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json"
      )
        .then(json => json.json())
        .then(res => setScatterPlotData(res));
    }

    async function getHeatMapData() {
      fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
      )
        .then(json => json.json())
        .then(res => setHeatMapData(res));
    }

    async function getChoroplethMapData() {
      fetch(
        "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json"
      )
        .then(json => json.json())
        .then(res => setChoroplethMapData(res));
    }

    async function getUS() {
      fetch(
        "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"
      )
        .then(json => json.json())
        .then(res => setUS(res));
    }

    async function getTreeMapData() {
      fetch(
        "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"
      )
        .then(json => json.json())
        .then(res => setTreeMapData(res));
    }

    getBarChartData();
    getScatterPlotData();
    getHeatMapData();
    getChoroplethMapData();
    getUS();
    getTreeMapData();
  }, []);

  return (
    <>
      <div
        style={{ marginTop: "50px", marginLeft: "20%", position: "relative" }}
      >
        {barChartData && <BarChart data={barChartData} />}
      </div>
      <div
        style={{ marginTop: "100px", marginLeft: "25%", position: "relative" }}
      >
        {scatterPlotData && <ScatterPlot data={scatterPlotData} />}
      </div>

      <div
        style={{ marginTop: "100px", marginLeft: "10%", position: "relative" }}
      >
        <h2 style={{ textAlign: "center" }}>
          Monthly Global Land-Surface Temperature
        </h2>
        {heatMapData && <HeatMap data={heatMapData} />}
      </div>
      <div
        style={{ marginTop: "100px", marginLeft: "20%", position: "relative" }}
      >
        {choroplethMapData && US && (
          <ChoroplethMap data={choroplethMapData} us={US} />
        )}
      </div>

      <div
        style={{ marginTop: "100px", marginLeft: "20%", position: "relative" }}
      >
        {treeMapData && <TreeMap data={treeMapData} />}
      </div>
    </>
  );
}

export default App;
