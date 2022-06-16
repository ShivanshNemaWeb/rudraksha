import React, { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const VendorTypeChart = () => {
  const [vendorTypeDetails, setvendorTypeDetails] = useState([]);

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/vendor/getVendorTypeDetails`
        );
        setvendorTypeDetails(data.data);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  const chartConfigs = {
    type: "pie2d", // The chart type
    width: "500", // Width of the chart
    height: "600", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Vendor Report",
        subCaption: "Percentage of Available vendors",
        use3DLighting: "0",
        showPercentValues: "1",
        decimals: "1",
        useDataPlotColorForLabels: "1",
        theme: "fusion",
        palettecolors:
          "5d62b5,f2726f,DB3131, 31DB75,C4D021,D426BD,E23385,5D0B31,0E5317,48C659,48C6BD,24978F,C1EC4B,EC664B,F6D015,655D32,653259,5D3980,140226,0F769B,86B5C6,1DC391,A6BF7A,CA353F,B21B25,E90175,01A3E9,0D384A, E63023,A5E623,238BE6,030608,CEF4D9 ",
      },
      data: [...vendorTypeDetails],
    },
  };
  return (
    <div style={{ position: "absolute", top: 0 }}>
      <ReactFC {...chartConfigs} />
    </div>
  );
};
export default VendorTypeChart;
