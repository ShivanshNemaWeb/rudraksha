import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const DesignationChart = () => {
  const [chartData, setchartData] = useState([]);
  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getBarChartDetails`
        );
        setchartData(data.data);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "450", // Width of the chart
    height: "670", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Employee Report",
        subCaption: "No.of Employees with respective Designations",
        yAxisMinValue: "0",
        xAxisName: "Designation",
        yAxisName: "No. of Employees",
        numberSuffix: "employees",
        theme: "fusion",
        palettecolors: "5d62b5,f2726f,DB3131, 31DB75,C4D021 ",
      },
      data: chartData,
    },
  };

  return (
    <div>
      <ReactFC {...chartConfigs} />
    </div>
  );
};

export default DesignationChart;
