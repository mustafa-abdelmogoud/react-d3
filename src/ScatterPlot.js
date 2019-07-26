import React from "react";

export default function ScatterPlot({ data }) {
  const width = 800,
    height = 800;

  console.log("scatter plot", data);
  return (
    <svg width={width} height={height}>
      <g />
    </svg>
  );
}
