import React from "react";
import ReactECharts from "echarts-for-react";

const Linecharts = () => {
  const color = ["rgba(0,138,206,1)"];
  const option = {
    color: color,
    textStyle: {
      color: "rgba(94,102,121,1)",
      fontSize: 18,
      fontFamily: "MontserratRegular",
      fontWeight: "500"
    },
    // title: {
    //   text: "Performance",
    //   textStyle: {
    //     color: "black",
    //     fontSize: 18,
    //     fontFamily: "MontserratBold",
    //     fontWeight: "500"
    //   },
    // },
    // legend: {
    //   data: ["G.J.Gardner", "Burbank Homes", "Metricon Homes", "ABN Group", "BTC"],
    //   left: "right",
    //   itemGap: 35,
    //   textStyle: {
    //     color: "black",
    //     fontSize: 14,
    //     fontFamily: "MontserratSemiBold",
    //     fontWeight: "500"
    //   },
    // },
    grid: {
      left: "1%",
      right: "4%",
      bottom: "8%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: ["OCT 10", "OCT 11", "OCT 12", "OCT 13", "OCT 14", "OCT 15", "OCT 16"],
      boundaryGap: false,
      splitLine: {
        show: false
      },
      
    },
    yAxis: {
      type: "value",
      // axisLabel: {
      //   formatter: "${value} K"
      // },
      min: 0,
      max: 20,
      minInterval: 5,
      splitLine: {
        show: false
      },
    },
    series: [
      {
        // name: "G.J.Gardner",
        showSymbol: false,
        type: "line",
        data: [5, 12, 9, 10, 8, 14, 7]
      }
    ],
    tooltip: {
      trigger: "axis",
    },

  };
  return (
    <div style={{ width: "1050px", height: "250px" }}>
      <ReactECharts className="w-100 h-100" style={{ marginLeft: "2%", marginTop: "2%" }} option={option} />
    </div>
  );

};
export default Linecharts;