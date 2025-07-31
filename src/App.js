import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from "./pages/Aboutus";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Associates from "./pages/Associates";
import Contact from "./pages/Contact";
import CreateAccount from "./pages/CreateAccount";
import Us from "./pages/Us";
import Canada from "./pages/Canada";
import Uk from "./pages/Uk";
import NewZealand from "../src/pages/NewZealand";
import Australia from "../src/pages/Australia";
import Germany from "../src/pages/Germany";
import France from "../src/pages/France";
import Italy from "../src/pages/Italy";
import Dubai from "../src/pages/Dubai";
import Finland from "../src/pages/Finland";
import Singapore from "../src/pages/Singapore";
import Poland from "../src/pages/Poland";
import Cyprus from "../src/pages/Cyprus";
import Malta from "../src/pages/Malta";
import Ireland from "../src/pages/Ireland";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "../src/pages/AdminLogin";
import AgentLogin from "../src/pages/AgentLogin";
import CourseFinder from "./components/CourseFinder";
import AdminDashboard from "./components/AdminDashboard";
import AgentDashboard from "./components/AgentDashboard";
import Login from "./pages/Login";
import Student from "./components/Student";
import Recruitment from "./components/Recruitment";
import Blogs from "./pages/Blogs";
import Institutions from "./components/Institutions";
import ResetPassword from "./components/ResetPassword";
import TopToBottom from "./components/TopToBottom";
import AIChatbot from "./pages/AIChatbot";
import StudentDsh from "./components/StudentDsh";
import Fees from "./pages/Fees";
import EnrollStudent from "./pages/EnrollStudents";
import EnrollStdAgent from "./pages/EnrollStdAgent";
import AgentGuide from "./pages/AgentGuide";
import StudentGuide from "./pages/StudentGuide";
import TermsCondition from "./pages/TermsCondition";
import PrivacyCookies from "./pages/PrivacyCookies";
import Accessibility from "./pages/Accessibility";
import PaymentHistory from "./pages/PaymentHistory";
import StudentsHistory from "./pages/StudentsHistory";
import AgentsHistory from "./pages/AgentsHistory";
import SubAdminUS from "./pages/SubAdminUS";
import SubAdminAusNZ from "./pages/SubAdminAusNZ";
import SubAdminUK from "./pages/SubAdminUK";
import SubAdminCanada from "./pages/SubAdminCanada";
import SubAdminEurope from "./pages/SubAdminEurope";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Import } from "lucide-react";
import CourseRequest from "./pages/CourseRequest";

const App = () => {
  return (
    <>
      <Router>
        {/* <AIChatbot /> */}
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <AdminDashboard /> */}
        {/* <TopToBottom /> */}
        <Routes>
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/" element={<Home />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="terms-conditions" element={<TermsCondition />} />
          <Route path="privacy-cookies-policy" element={<PrivacyCookies />} />
          <Route path="guide" element={<AgentGuide />} />
          <Route path="student-guide" element={<StudentGuide />} />
          <Route path="about" element={<Aboutus />} />
          <Route path="services" element={<Services />} />
          <Route path="associate" element={<Associates />} />
          <Route path="contact" element={<Contact />} />
          <Route path="plan-studies" element={<Student />} />
          <Route path="resources" element={<Recruitment />} />
          <Route path="track-progress" element={<Institutions />} />
          <Route path="register" element={<CreateAccount />} />
          <Route path="stdlogout" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="log" element={<CreateAccount />} />
          <Route path="us" element={<Us />} />
          <Route path="canada" element={<Canada />} />
          <Route path="uk" element={<Uk />} />
          <Route path="nz" element={<NewZealand />} />
          <Route path="aus" element={<Australia />} />
          <Route path="germany" element={<Germany />} />
          <Route path="france" element={<France />} />
          <Route path="italy" element={<Italy />} />
          <Route path="dubai" element={<Dubai />} />
          <Route path="finland" element={<Finland />} />
          <Route path="singapore" element={<Singapore />} />
          <Route path="poland" element={<Poland />} />
          <Route path="cyprus" element={<Cyprus />} />
          <Route path="malta" element={<Malta />} />
          <Route path="ireland" element={<Ireland />} />

          <Route path="blog" element={<Blogs />} />

          <Route path="/" element={<CreateAccount />} />
          <Route path="student-login" element={<StudentLogin />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="agent-login" element={<AgentLogin />} />
          <Route path="student-dash" element={<StudentDsh />} />
          <Route path="/" element={<StudentDsh />} />
          {/* <Route path="course-finder" element={<StudentDashboard />} /> */}
          <Route path="course-finder" element={<CourseFinder />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="sub-admin-usa-dashboard" element={<SubAdminUS />} />
          <Route
            path="sub-admin-aus-nz-dashboard"
            element={<SubAdminAusNZ />}
          />
          <Route path="sub-admin-uk-dashboard" element={<SubAdminUK />} />
          <Route
            path="sub-admin-canada-dashboard"
            element={<SubAdminCanada />}
          />
          <Route
            path="sub-admin-europe-dashboard"
            element={<SubAdminEurope />}
          />
          <Route path="agent-dashboard" element={<AgentDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<AgentDashboard />} />
          <Route path="fees" element={<Fees />} />
          <Route path="docs" element={<EnrollStdAgent />} />
          <Route path="/" element={<StudentDsh />} />
          <Route path="fees" element={<Fees />} />
          <Route path="enroll" element={<EnrollStudent />} />
          <Route path="request" element={<CourseRequest />} />
          <Route path="/" element={<AdminDashboard />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="students-history" element={<StudentsHistory />} />
          <Route path="agents-history" element={<AgentsHistory />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
