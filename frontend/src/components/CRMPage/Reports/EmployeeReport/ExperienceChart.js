import React, { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ExperienceReport = () => {
  const [experienceDetails, setexperienceDetails] = useState([]);

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getExperienceDetails`
        );
        setexperienceDetails(data.data);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "500", // Width of the chart
    height: "450", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Employee Report",
        subCaption: "Employees Experience",
        decimals: "0",
        theme: "fusion",
      },
      data: [...experienceDetails],
    },
  };
  return (
    <div style={{ position: "absolute", top: 0 }}>
      <ReactFC {...chartConfigs} />
    </div>
  );
};
export default ExperienceReport;
