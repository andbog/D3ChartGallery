// const data1=[13,14,32,21,23,11,32];
// console.log(jakasZmienna)


const ChartWidth = window.innerWidth/4;
const ChartHeight = 300;
const ChartMarginLeft = 85;
const ChartMarginTop = 30;

const GapWidth=2;

const BarLength = ChartWidth-ChartMarginLeft;
const BarHeight = (ChartHeight-2*ChartMarginTop-data1.length*GapWidth)/data1.length;

d3.select("#viz1").style("width",ChartWidth+"px")
// d3.select("#viz1").append("p").text("Chart Bar").style("text-align","center")

let viz1 = d3.select("#viz1").append("svg").attr("width",ChartWidth).attr("height",ChartHeight);

// let viz1 = d3.select("svg").attr("width",ChartWidth).attr("height",ChartHeight)

// d3.max(data1.map(d=>d.value))

const BarScale = d3.scaleLinear()
    .domain([0, d3.max(data1,d=>d.value)])
    .range([0, BarLength-5]);

    // var BarScale = d3.scaleLinear()
    //     .domain([0, d3.max(data1.map(d=>d.value))])
    //     .range([0, BarLength-5]);

  viz1.style("background-color","white");
  const g = viz1.append("g").attr("transform",`translate(${ChartMarginLeft},${ChartMarginTop})`)


  //axis
  const x_axis = d3.axisBottom()
                     .scale(BarScale);
  g.append("g").attr("class","axis").attr("transform",`translate(0,${ChartHeight-2*ChartMarginTop+5})`).call(x_axis)
  g.selectAll("g.tick").select("line").attr("y1",-ChartHeight+1.25*ChartMarginTop).attr("stroke","grey").attr("opacity","0.5")

  //add bars group
  g.append("g").attr("class","barsArea")
  g.select("g.barsArea").selectAll("g")
    .data(data1)
    .enter()
    .append("g")
    .attr("class","bar")
    .attr("transform",(d,i)=>`translate(0, ${(i*(BarHeight+GapWidth))})`)


  g.selectAll("g.bar")
    .data(data1)
    .append("rect")
    .attr("height",BarHeight)
    .attr("width",d=>BarScale(d.value) )
    .attr("fill","steelblue")
    .attr("x","0")

    //add labels
    //
    viz1.selectAll("g.bar")
    .data(data1)
    .append("text")
    .text(d=>d.country)
    .attr("class","labels")
    .attr("fill","darkblue")
    .attr("x",-ChartMarginLeft+5)
    .attr("y",2*GapWidth+BarHeight/2);


    // //add value labels
    g.selectAll("g.bar")
      .data(data1)
      .append("text")
      .text(d=>d.value)
      .attr("class","val")
      .attr("fill","white")
      .attr("x",d=>BarScale(d.value)-25)
      .attr("y",2*GapWidth+BarHeight/2);




// d3.select("#viz1").append(viz1)

      //


    //
    // //add axis
    // viz1.call(x_axis)
    //
    // viz1.select(".domain").attr("transform","translate("+ChartMarginLeft+", "+270+")")
    // viz1.selectAll(".tick").attr("transform","translate("+ChartMarginLeft+", "+270+")")
