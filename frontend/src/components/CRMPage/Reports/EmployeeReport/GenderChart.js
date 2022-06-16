import React, { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const EmployeeBar2dReport_gender = () => {
  const [genderDetails, setGenderDetails] = useState([]);

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getGenderDetails`
        );
        setGenderDetails(data.data);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const chartConfigs = {
    type: "bar2d", // The chart type
    width: "450", // Width of the chart
    height: "250", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Employee Report",
        subCaption: "Number of Male and Female Employees",
        yAxisName: "Number of employees",
        // numberSuffix: "employees",
        theme: "fusion",
        palettecolors: "D021CA, 261CAC",
      },
      data: [...genderDetails],
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default EmployeeBar2dReport_gender;
