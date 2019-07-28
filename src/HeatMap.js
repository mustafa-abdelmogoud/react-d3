import React, { useEffect, useRef, useState } from "react";
import {
  axisBottom,
  select,
  axisLeft,
  scaleBand,
  utcFormat,
  scaleThreshold,
  min,
  max
} from "d3";
import chroma from "chroma-js";

export default function HeatMap({ data }) {
  const width = 1100,
    height = 800,
    marginLeft = 60,
    marginRight = 70,
    marginBottom = 50;

  const [tooltip, setTooltip] = useState(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const xScale = scaleBand()
    .domain(data.monthlyVariance.map(d => d.year))
    .range([0, width - marginRight]);

  const yScale = scaleBand()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .range([0, height - marginBottom]);

  const colors = chroma.brewer.BrBG;
  const legendScale = scaleThreshold()
    .domain(
      (function(min, max, count) {
        var array = [];
        var step = (max - min) / count;
        var base = min;
        for (var i = 1; i < count; i++) {
          array.push(base + i * step);
        }
        return array;
      })(
        min(data.monthlyVariance, d => d.variance),
        max(data.monthlyVariance, d => d.variance),
        colors.length
      )
    )
    .range(colors);

  const xAxis = axisBottom(xScale).tickValues(
    xScale.domain().filter(function(year) {
      return year % 10 === 0;
    })
  );
  const yAxis = axisLeft(yScale).tickFormat(function(month) {
    var date = new Date(0);
    date.setUTCMonth(month);
    return utcFormat("%B")(date);
  });

  useEffect(() => {
    select(xAxisRef.current).call(xAxis);
    select(yAxisRef.current).call(yAxis);
  }, [xAxis, yAxis]);

  return (
    <>
      {tooltip && (
        <div
          style={{
            top: yScale(tooltip.month) - 20,
            left: xScale(tooltip.year) - 20
          }}
          className="bar-tooltip"
        >
          <p>
            {tooltip.month} - {tooltip.year}
          </p>
          <p>{tooltip.variance} °c</p>
        </div>
      )}
      <svg width={width} height={height}>
        <g
          ref={xAxisRef}
          transform={`translate(${marginLeft}, ${height - marginBottom})`}
        />
        <g ref={yAxisRef} transform={`translate(${marginLeft}, ${0})`} />

        <g transform={`translate(${marginLeft}, ${0})`}>
          {data.monthlyVariance.map((d, i) => (
            <rect
              key={i}
              x={xScale(d.year)}
              y={yScale(d.month)}
              width={xScale.bandwidth()}
              height={yScale.bandwidth()}
              style={{ fill: legendScale(d.variance) }}
              onMouseOver={() => setTooltip(d)}
              onMouseOut={() => setTooltip(null)}
            />
          ))}
        </g>
      </svg>
    </>
  );
}
