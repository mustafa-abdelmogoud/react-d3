import React, { useState, useRef, useEffect } from "react";
import { scaleBand, scaleLinear, scaleOrdinal, extent, select } from "d3";
import { flatten } from "lodash";
import { legendColor } from "d3-svg-legend";

export default function ScatterPlot({ data }) {
  const width = 600,
    height = 500,
    marginLeft = 80,
    marginRight = 100,
    marginTop = 30,
    marginBottom = 30;

  const [tooltip, setTooltip] = useState(null);

  const legendRef = useRef(null);

  const yScale = scaleLinear()
    .domain(
      extent(
        flatten(
          data.children.map(category => category.children.map(m => m.value))
        )
      )
    )
    .range([height - marginBottom, marginTop]);

  const moviesScale = scaleBand()
    .domain(
      flatten(data.children.map(category => category.children.map(m => m.name)))
    )
    .range([marginLeft, width]);

  const color = scaleOrdinal()
    .domain(data.children.map(category => category.name))
    .range([
      "rgb(43, 226, 83)",
      "rgb(43, 70, 226)",
      "rgb(226, 43, 134)",
      "rgb(198, 226, 43)",
      "rgb(226, 168, 43)",
      "rgb(211, 43, 226)",
      "rgb(43, 144, 226)"
    ]);

  useEffect(() => {
    const colorLegend = legendColor().scale(color);

    select(legendRef.current).call(colorLegend);
  });

  return (
    <>
      {tooltip && (
        <div
          style={{
            left: moviesScale(tooltip.name),
            top: yScale(tooltip.value)
          }}
          className="scatter-tooltip"
        >
          <p>{tooltip.name}</p>
          <p>${tooltip.value}</p>
        </div>
      )}
      <svg width={width} height={height}>
        <g
          ref={legendRef}
          transform={`translate(${width - marginRight},${marginTop})`}
        />
        <text
          transform={`translate(${marginLeft},${height / 2}),rotate(${270})`}
        >
          Movie sales
        </text>
        <text transform={`translate(${width / 2},${height})`}>Movie name</text>
        {data.children.map(category => {
          return category.children.map(movie => (
            <>
              <circle
                cx={moviesScale(movie.name)}
                cy={yScale(movie.value)}
                r="3"
                style={{ fill: color(movie.category) }}
                onMouseOver={() => setTooltip(movie)}
                onMouseOut={() => setTooltip(null)}
              />
            </>
          ));
        })}
      </svg>
    </>
  );
}
