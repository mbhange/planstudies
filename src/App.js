import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Eager load critical components (above the fold)
import Home from "./pages/Home";

// Lazy load all other components
const Aboutus = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Associates = lazy(() => import("./pages/AllAssociates"));
const Contact = lazy(() => import("./pages/Contact"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const Us = lazy(() => import("./pages/Us"));
const Canada = lazy(() => import("./pages/Canada"));
const Uk = lazy(() => import("./pages/Uk"));
const NewZealand = lazy(() => import("./pages/NewZealand"));
const Australia = lazy(() => import("./pages/Australia"));
const Germany = lazy(() => import("./pages/Germany"));
const France = lazy(() => import("./pages/France"));
const Italy = lazy(() => import("./pages/Italy"));
const Dubai = lazy(() => import("./pages/Dubai"));
const Finland = lazy(() => import("./pages/Finland"));
const Singapore = lazy(() => import("./pages/Singapore"));
const Poland = lazy(() => import("./pages/Poland"));
const Cyprus = lazy(() => import("./pages/Cyprus"));
const Malta = lazy(() => import("./pages/Malta"));
const Ireland = lazy(() => import("./pages/Ireland"));
const StudentLogin = lazy(() => import("./pages/StudentLogin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AgentLogin = lazy(() => import("./pages/AgentLogin"));
const CourseFinder = lazy(() => import("./components/CourseFinder"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const AgentDashboard = lazy(() => import("./components/AgentDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Student = lazy(() => import("./components/Student"));
const Recruitment = lazy(() => import("./components/Recruitment"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Institutions = lazy(() => import("./components/Institutions"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const StudentDsh = lazy(() => import("./components/StudentDsh"));
const Fees = lazy(() => import("./pages/Fees"));
const EnrollStudent = lazy(() => import("./pages/EnrollStudents"));
const EnrollStdAgent = lazy(() => import("./pages/EnrollStdAgent"));
const AgentGuide = lazy(() => import("./pages/AgentGuide"));
const StudentGuide = lazy(() => import("./pages/StudentGuide"));
const TermsCondition = lazy(() => import("./pages/TermsCondition"));
const PrivacyCookies = lazy(() => import("./pages/PrivacyCookies"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const PaymentHistory = lazy(() => import("./pages/PaymentHistory"));
const StudentsHistory = lazy(() => import("./pages/StudentsHistory"));
const AgentsHistory = lazy(() => import("./pages/AgentsHistory"));
const SubAdminUS = lazy(() => import("./pages/SubAdminUS"));
const SubAdminAusNZ = lazy(() => import("./pages/SubAdminAusNZ"));
const SubAdminUK = lazy(() => import("./pages/SubAdminUK"));
const SubAdminCanada = lazy(() => import("./pages/SubAdminCanada"));
const SubAdminEurope = lazy(() => import("./pages/SubAdminEurope"));
const CourseRequest = lazy(() => import("./pages/CourseRequest"));

// Optimized loading component with skeleton
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    fontSize: '18px'
  }}>
    <div style={{
      animation: 'pulse 1.5s ease-in-out infinite alternate'
    }}>Loading...</div>
    <style>{`
      @keyframes pulse {
        0% { opacity: 0.6; }
        100% { opacity: 1; }
      }
    `}</style>
  </div>
);

const App = () => {
  return (
    <>
      <Router>
        {/* <AIChatbot /> */}
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <AdminDashboard /> */}
        {/* <TopToBottom /> */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/privacy-cookies-policy" element={<PrivacyCookies />} />
          <Route path="/guide" element={<AgentGuide />} />
          <Route path="/student-guide" element={<StudentGuide />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/associate" element={<Associates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plan-studies" element={<Student />} />
          <Route path="/resources" element={<Recruitment />} />
          <Route path="/track-progress" element={<Institutions />} />
          <Route path="/blog" element={<Blogs />} />
          {/* Authentication Routes */}
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/agent-login" element={<AgentLogin />} />
          <Route path="/stdlogout" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Country Routes */}
          <Route path="/us" element={<Us />} />
          <Route path="/canada" element={<Canada />} />
          <Route path="/uk" element={<Uk />} />
          <Route path="/nz" element={<NewZealand />} />
          <Route path="/aus" element={<Australia />} />
          <Route path="/germany" element={<Germany />} />
          <Route path="/france" element={<France />} />
          <Route path="/italy" element={<Italy />} />
          <Route path="/dubai" element={<Dubai />} />
          <Route path="/finland" element={<Finland />} />
          <Route path="/singapore" element={<Singapore />} />
          Canada
          <Route path="/poland" element={<Poland />} />
          <Route path="/cyprus" element={<Cyprus />} />
          <Route path="/malta" element={<Malta />} />
          <Route path="/ireland" element={<Ireland />} />
          {/* Dashboard Routes */}
          <Route path="/student-dash" element={<StudentDsh />} />
          <Route path="/course-finder" element={<CourseFinder />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/sub-admin-usa-dashboard" element={<SubAdminUS />} />
          <Route
            path="/sub-admin-aus-nz-dashboard"
            element={<SubAdminAusNZ />}
          />
          <Route path="/sub-admin-uk-dashboard" element={<SubAdminUK />} />
          <Route
            path="/sub-admin-canada-dashboard"
            element={<SubAdminCanada />}
          />
          <Route
            path="/sub-admin-europe-dashboard"
            element={<SubAdminEurope />}
          />
          {/* Other Routes */}
          <Route path="/fees" element={<Fees />} />
          <Route path="/docs" element={<EnrollStdAgent />} />
          <Route path="/enroll" element={<EnrollStudent />} />
          <Route path="/request" element={<CourseRequest />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/students-history" element={<StudentsHistory />} />
          <Route path="/agents-history" element={<AgentsHistory />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
