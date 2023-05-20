(async function() {
    var data = await d3.csv("http://learnjsdata.com/data/cities.csv", d3.autoType);
    const width = 700;
    const height = 550;
    const margin = { top: 20, bottom: 50, left: 60, right: 40 };

    const svg = d3.select("#d3-container")
        .append("svg")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)]).nice()
    .range([height - margin.bottom, margin.top]);

    svg
        .append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data.sort((a, b) => d3.descending(a.population, b.population)))
        .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.population))
        .attr("title", d => d.city)
        .attr("class", "bar")
        .attr("height", d => y(0) - y(d.population))
        .attr("width", x.bandwidth());
    
    function xAxis(g){
        g.attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].city).tickSizeOuter(0))

    }

    function yAxis(g){
        g.attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr('font-size', '10px')

    }

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

})();



  