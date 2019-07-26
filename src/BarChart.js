import React, { useRef, useEffect, useState } from "react";
import {
  scaleTime,
  scaleLinear,
  axisBottom,
  axisLeft,
  select,
  min,
  max
} from "d3";

export default function BarChart({ data }) {
  const width = 800,
    height = 800,
    marginLeft = 50,
    marginTop = 30,
    marginBottom = 30,
    marginRight = 70;
  const barWidth = width / data.length;

  const [toolTip, setTooltip] = useState(null);

  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  const xScale = scaleTime()
    .domain([new Date(min(data, d => d[0])), new Date(max(data, d => d[0]))])
    .range([0, width - marginRight]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d[1])])
    .range([height - marginBottom, marginTop]);

  const barScale = scaleLinear()
    .domain([max(data, d => d[1]), 0])
    .range([height - marginBottom, marginTop]);

  useEffect(() => {
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    select(xAxisRef.current).call(xAxis);
    select(yAxisRef.current).call(yAxis);
  }, []);

  return (
    <>
      {toolTip && (
        <div style={{ left: xScale(new Date(toolTip[0])) }} className="tooltip">
          <p>{toolTip[0]}</p>
          <p>${toolTip[1]}</p>
        </div>
      )}
      <svg width={width} height={height}>
        <text
          style={{
            fill: "black",
            fontSize: "25",
            fontWeight: "600",
            letterSpacing: "3"
          }}
          transform={`translate(${width / 2 - marginRight}, ${marginTop +
            marginBottom})`}
        >
          United States GDP
        </text>
        <g
          ref={xAxisRef}
          transform={`translate(${marginLeft},${height - marginBottom})`}
        />
        <text
          style={{
            fill: "black",
            fontSize: "20"
          }}
          transform={`translate(${marginLeft + 20}, ${300}), rotate(270)`}
        >
          {" "}
          Gross domestic products
        </text>
        <g ref={yAxisRef} transform={`translate(${marginLeft},${0})`} />
        {data.map(d => (
          <rect
            x={marginLeft + xScale(new Date(d[0]))}
            y={height - barScale(d[1])}
            height={barScale(d[1]) - marginTop}
            width={barWidth}
            fill="#33adff"
            onMouseOver={() => {
              setTooltip(d);
            }}
            onMouseLeave={() => {
              setTooltip(null);
            }}
          />
        ))}
      </svg>
    </>
  );
}
