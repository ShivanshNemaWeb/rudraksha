import "./App.css";

import { Route, Switch } from "react-router-dom";
// Shivank*********

import COC from "./components/CodeOfConduct/COC";
import CoreValues from "./components/CoreValues/CoreValues";
import Faq from "./components/FAQ/Faq";
import Management from "./components/Management/Management";
import Organigram from "./components/Organigram/Organigram";
import Refund from "./components/Refund/Refund";
import Mission from "./components/Mission/Mission";
import Vision from "./components/Vision/Vision";
import Agenda from "./components/Agenda/Agenda";
import Pro1 from "./components/proj1/Pro1";
import Pro2 from "./components/proj2/Pro2";
import Pro3 from "./components/proj3/Pro3";
import Pro4 from "./components/proj4/Pro4";
import Pro5 from "./components/proj5/Pro5";
import Pro6 from "./components/proj6/Pro6";
import Pro7 from "./components/proj7/Pro7";
import Pro8 from "./components/proj8/Pro8";
import Pro9 from "./components/proj9/Pro9";
import Pro10 from "./components/pro10/Pro10";
import HomePage from "./components/Homepage/HomePage";
import FooterPagePro from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import HomeHeading from "./components/HomeHeading/HomeHeading";
import Aboutus from "./components/Aboutus/Aboutus";
import Survey from "./components/Survey/Survey";

import Pro11 from "./components/Project 11/Pro11";
import Pro12 from "./components/Project 12/Pro12";
import Pro13 from "./components/Project 13/Pro13";
import Pro14 from "./components/Project 14/Pro14";
import Pro15 from "./components/Project 15/Pro15";
import LoginJoin from "./components/Login/LoginJoin";
import LoginInter from "./components/Login/LoginInter";
import Rec from "./components/Rec/Rec";
import Joining from "./components/Joining/Joining";
import Interview from "./components/Interview/Interview";
import { MDBContainer } from "mdb-react-ui-kit";
import Listint from "./components/Interview/Listint";
import Joinrepo from "./components/Joining/Joinrepo";
import NavNew from "./components/NavNew/NavNew";

//crm components
import Login from "./components/CRMPage/Login/Login";
import Employee from "./components/CRMPage/Employee/Employee";
import Vendor from "./components/CRMPage/Vendor/Vendor";
import Event from "./components/CRMPage/Event/Event";
import AllCostSheets from "./components/CRMPage/CostSheet/CostSheets";
import CostSheet from "./components/CRMPage/CostSheet/CostSheetTable/CostSheet";
import Home from "./components/CRMPage/Home/Home";
import EventApproval from "./components/CRMPage/EventApproval/Eventapproval";
import "bootstrap/dist/css/bootstrap.min.css";
import Reception from "./components/CRMPage/Reception/Reception";
import AMS from "./components/CRMPage/AMS/AMS";
import LMS from "./components/CRMPage/LMS/LMS";
import DisplayLeave from "./components/CRMPage/LMS/DisplayLeave/DisplayLeave";
import LeaveReport from "./components/CRMPage/LMS/leaveReport/LeaveReport";
import VIMS from "./components/CRMPage/VIMS/VIMS";
import VimsReport from "./components/CRMPage/VIMS/VimsReports/VimsReport";
import NSM from "./components/CRMPage/NMS/NMS";
import NMSReport from "./components/CRMPage/NMS/NMSReport/NMSReport";
import Volunteership from "./components/CRMPage/NMS/Volunteership/Volunteership";
import DMS from "./components/CRMPage/DMS/DMS";
import SMS from "./components/CRMPage/SMS/SMS";   
import Memo from "./components/CRMPage/Memo/Memo";
import PMS from "./components/CRMPage/PMS/PMS";
import Register from "./components/CRMPage/Register/Register";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/agenda" component={Agenda} />
        <Route path="/vision" component={Vision} />
        <Route path="/mission" component={Mission} />
        <Route path="/Corevalues" component={CoreValues} />
        <Route path="/aboutus" component={Aboutus} />
        <Route path="/faq" component={Faq} />
        <Route path="/coc" component={COC} />
        <Route path="/organigram" component={Organigram} />
        <Route path="/management" component={Management} />
        <Route path="/refp" component={Refund} />
        <Route path="/loginJ" component={LoginJoin} />
        <Route path="/loginI" component={LoginInter} />
        <Route path="/rec" component={Rec} />
        <Route path="/join" component={Joining} />
        <Route path="/interview" component={Interview} />
        <Route path="/Listint" component={Listint} />
        <Route path="/Joiningreport" component={Joinrepo} />
        <Route path="/NN" component={NavNew} />

        {/* Projects */}

        <Route path="/pro1" component={Pro1} />
        <Route path="/pro2" component={Pro2} />
        <Route path="/pro3" component={Pro3} />
        <Route path="/pro4" component={Pro4} />
        <Route path="/pro5" component={Pro5} />
        <Route path="/pro6" component={Pro6} />
        <Route path="/pro7" component={Pro7} />
        <Route path="/pro8" component={Pro8} />
        <Route path="/pro9" component={Pro9} />
        <Route path="/pro10" component={Pro10} />
        <Route path="/pro11" component={Pro11} />
        <Route path="/pro12" component={Pro12} />
        <Route path="/pro13" component={Pro13} />
        <Route path="/pro14" component={Pro14} />
        <Route path="/pro15" component={Pro15} />

        {/* Others */}
        <Route path="/survey" component={Survey} />

        {/* CRM */}
        <Route path="/crmlogin" component={Login} />
        <Route path="/addEmployee" component={Employee} />
        <Route path="/addVendor" component={Vendor} />
        <Route path="/addEvent" component={Event} />
        <Route path="/costsheet" component={AllCostSheets} />
        <Route path="/costsheetdata" component={CostSheet} />
        <Route path="/crm" component={Home} />
        <Route path="/approve" component={EventApproval} />
        <Route path="/rms" component={Reception} />
        <Route path="/ams" component={AMS} />
        <Route exact path="/lms" component={LMS} />
        <Route exact path="/lms/displayleave" component={DisplayLeave} />
        <Route exact path="/lms/leaveReport" component={LeaveReport} />
        <Route exact path="/VIMS" component={VIMS} />
        <Route exact path="/VIMS/VimsReport" component={VimsReport} />
        <Route exact path="/NMS" component={NSM} />
        <Route exact path="/NMS/NMSReport" component={NMSReport} />
        <Route exact path="/NMS/Volunteership" component={Volunteership} />
        <Route exact path="/DMS" component={DMS} />
        <Route exact path="/SMS" component={SMS} />
        <Route exact path="/Memo" component={Memo} />
        <Route exact path="/PMS" component={PMS} />
        <Route exact path="/Register" component={Register} />

      </Switch>
    </>
  );
}

export default App;
