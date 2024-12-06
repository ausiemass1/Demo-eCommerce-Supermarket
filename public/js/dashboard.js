
// const dataset = [4, 12, 3, 2, 11, 5, 7, 9, 6, 3];
const dataset = salesData.map(d => d.sales_amount );

// Define margins and a function to render the chart
const margin = { top: 20, right: 20, bottom: 30, left: 40 };


function salesChart() {
  // Remove any existing SVG to prevent multiple charts
  d3.select("#chart").select("svg").remove();

  //setting up responsiveness
  const containerWidth = document.getElementById("chart").clientWidth; 
  const aspectRatio = 0.5;
  const width = containerWidth - margin.left - margin.right;
  const height = width * aspectRatio;

  // Create SVG container
  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Set up x and y scales
  const x = d3.scaleBand()
      .domain(dataset.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

  const y = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([height, 0]);

  // Create x-axis
  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => i + 1));

  // Create y-axis
  svg.append("g")
      .call(d3.axisLeft(y));

  // Append bars
  svg.selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d))
      .attr("fill", "steelblue");
}

// Render chart on load
salesChart();

// Redraw chart on window resize
window.addEventListener("resize", salesChart);


