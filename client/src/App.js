import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/login';
import Authenticate from './pages/password/authenticate';
import Forgot from './pages/password/forgot_password';
import Reset from './pages/password/reset_password';
import Register from './pages/register/register';
import AdminDashboard from './pages/administrator/dashboard.jsx'
import Report from './pages/administrator/report.jsx'
import General from './pages/administrator/general.jsx'
import Setting from './pages/administrator/setting.jsx'
import NotFound from './pages/nopage/nopage.jsx'
import Students from './pages/administrator/students.jsx';
import Fees from './pages/administrator/fees.jsx';
import Teachers from './pages/administrator/teachers.jsx';
import { Provider } from 'react-redux';
import Store from './helpers/examination/examStore.jsx';
import InactivityHandler from './hooks/activity.jsx';
import Config from './pages/teacher/config.jsx';
import TeacherProfile from './pages/teacher/teacherProfile.jsx';
import AddStudents from './pages/students/config.jsx';
import StudentProfile from './pages/students/studentProfile.jsx';
import FeesSetting from './pages/fees/setting.jsx';
import Payment from './pages/fees/payment.jsx';
import TeacherDashboard from './teacher-service/dashboard.jsx';
import TStudent from './teacher-service/pages/student.jsx';
import Entry from './teacher-service/pages/entry.jsx';
import StudentDetail from './teacher-service/pages/studentDetail.jsx';
import AdminProfile from './pages/dashboard/adminProfile.jsx';
import StudentReport from './pages/reports/studentReport.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot',
      element: <Forgot />
    },
    {
      path: '/reset',
      element: <Reset />
    },
    {
      path: '/authenticate',
      element: <Authenticate />
    },
    {
      path: '/administrator',
      element: (
          <InactivityHandler>
            <AdminDashboard />
          </InactivityHandler>
      )
    },
    {
      path: '/profile',
      element: (
          <InactivityHandler>
          <AdminProfile />
          </InactivityHandler>
        )
    },
    {
      path: '/report',
      element: (
          <InactivityHandler>
          <Report />
          </InactivityHandler>
        )
    },
    {
      path: '/general',
      element: (
        <InactivityHandler>
        <General />
        </InactivityHandler>
      )
    },
    {
      path: '/student',
      element: (
          <InactivityHandler>
          <Students />
          </InactivityHandler>
      )
    },
    {
      path: '/setting',
      element: (
        <InactivityHandler>
          <Setting />
        </InactivityHandler>
      )
    },
    {
      path: '/fees',
      element: (
          <InactivityHandler>
          <Fees />
          </InactivityHandler>
        )
    },
    {
      path: '/fees_setting',
      element: (
          <InactivityHandler>
          <FeesSetting />
          </InactivityHandler>
        )
    },
    {
      path: '/payment',
      element: (
          <InactivityHandler>
          <Payment />
          </InactivityHandler>
        )
    },
    {
      path: '/teachers',
      element: (
          <InactivityHandler>
          <Teachers />
          </InactivityHandler>
        )
    },
    {
      path: '/config',
      element: (
          <InactivityHandler>
            <Config />
          </InactivityHandler>
        )
    },
    {
      path: '/addstudents',
      element: (
          <InactivityHandler>
            <AddStudents />
          </InactivityHandler>
        )
    },
    {
      path: '/teacher_profile/:id',
      element: (
          <InactivityHandler>
            <TeacherProfile />
          </InactivityHandler>
        )
    },
    {
      path: '/student_profile/:id',
      element: (
          <InactivityHandler>
            <StudentProfile />
          </InactivityHandler>
        )
    },
    {
      path: '/student-report/:id',
      element: (
          <InactivityHandler>
            <StudentReport />
          </InactivityHandler>
        )
    },


    // Teacher Portal Routes
    
    {
      path: '/tdashboard/',
      element: (
          <InactivityHandler>
            <TeacherDashboard />
          </InactivityHandler>
        )
    },
    {
      path: '/tstudent/',
      element: (
          <InactivityHandler>
            <TStudent />
          </InactivityHandler>
        )
    },
    {
      path: '/entry/',
      element: (
          <InactivityHandler>
            <Entry />
          </InactivityHandler>
        )
    },
    {
      path: '/student/:id',
      element: (
          <InactivityHandler>
            <StudentDetail />
          </InactivityHandler>
        )
    },

    // Teacher Portal Routes 
  ])

  return (
    <Provider store={Store}>
      <main>
         <RouterProvider router={router} />
      </main>
    </Provider>
  );
}

export default App;
