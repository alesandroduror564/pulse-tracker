// filename: advancedDataVisualization.js

// This code demonstrates advanced data visualization using JavaScript and the D3.js library.
// It generates an interactive and animated bar chart displaying sales data over a period of time.

// Define the dimensions of the chart
const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Load data from an external JSON file
d3.json("salesData.json").then(function (data) {

  // Parse the date string to JavaScript date object
  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(function (d) {
    d.date = parseDate(d.date);
    d.sales = +d.sales;
  });

  // Create x-scale for dates
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, function (d) { return d.date; }))
    .range([0, innerWidth]);

  // Create y-scale for sales
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.sales; })])
    .range([innerHeight, 0]);

  // Create SVG element
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create chart group
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create x-axis
  const xAxis = d3.axisBottom(xScale);
  chart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis);

  // Create y-axis
  const yAxis = d3.axisLeft(yScale);
  chart.append("g").call(yAxis);

  // Create bars
  const bars = chart
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", function (d) { return xScale(d.date); })
    .attr("y", function (d) { return yScale(d.sales); })
    .attr("width", innerWidth / data.length - 2)
    .attr("height", function (d) { return innerHeight - yScale(d.sales); })
    .attr("fill", "steelblue");

  // Add animation to the bars
  bars
    .transition()
    .duration(2000)
    .attr("y", function (d) { return yScale(d.sales); })
    .attr("height", function (d) { return innerHeight - yScale(d.sales); });

  // Create tooltip
  const tooltip = chart
    .append("text")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Add interactivity to the bars
  bars
    .on("mouseover", function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("x", xScale(d.date) + 10)
        .attr("y", yScale(d.sales) - 10)
        .text(`${d.sales} units sold on ${d.date.toLocaleDateString()}`);
    })
    .on("mouseout", function () {
      tooltip.transition().duration(200).style("opacity", 0);
    });
});

// CSS style for tooltips
// Add the following CSS to your HTML file:
/*
<style>
  .tooltip {
    font-family: "Arial", sans-serif;
    font-size: 12px;
    fill: white;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    pointer-events: none;
    user-select: none;
  }
</style>
*/