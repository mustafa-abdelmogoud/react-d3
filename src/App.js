import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import "./App.css";
import ScatterPlot from "./ScatterPlot";

function App() {
  const [barChartData, setBarChartData] = useState(null);
  const [scatterPlotData, setScatterPlotData] = useState(null);

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

    getBarChartData();
    getScatterPlotData();
  }, []);

  return (
    <>
      {barChartData && <BarChart data={barChartData} />}
      {scatterPlotData && <ScatterPlot data={scatterPlotData} />}
    </>
  );
}

export default App;
