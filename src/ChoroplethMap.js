import React from "react";
import { scaleThreshold, range, schemeGreens, geoPath } from "d3";
import { feature } from "topojson";

export default function ChoroplethMap({ data, us }) {
  const width = 900,
    height = 600;

  const path = geoPath();

  const geojson = feature(us, us.objects.counties).features;

  const color = scaleThreshold()
    .domain(range(2.6, 75.1, (75.1 - 2.6) / 8))
    .range(schemeGreens[9]);

  return (
    <svg width={width} height={height}>
      {geojson.map(d => (
        <path d={path(d)} />
      ))}
    </svg>
  );
}
