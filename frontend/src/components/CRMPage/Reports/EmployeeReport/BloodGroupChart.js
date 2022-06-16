import { useEffect, useState } from "react";
import axios from "axios";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

const EmployeePieChart = () => {
  const [chartData, setchartData] = useState([]);
  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getPieChartDetails`
        );
        setchartData(data.data);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  // Resolves charts dependancy
  charts(FusionCharts);

  const dataSource = {
    chart: {
      showBorder: 0,
      caption: "Employee Report",
      subcaption: "Blood Group",
      showvalues: "1",
      showpercentintooltip: "0",
      numberprefix: "$",
      enablemultislicing: "1",
      theme: "fusion",
      palettecolors:
        "5d62b5,29c3be,f2726f,DB3131, 31DB75,C4D021,D021CA, 261CAC ",
    },
    data: chartData,
  };

  return (
    <ReactFusioncharts
      type="pie3d"
      width="450"
      height="350"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};
export default EmployeePieChart;
