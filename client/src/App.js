import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/login';
import Authenticate from './pages/password/authenticate';
import Forgot from './pages/password/forgot_password';
import Reset from './pages/password/reset_password';
import Register from './pages/register/register';
import AdminDashboard from './pages/administrator/dashboard.jsx'
import Report from './pages/administrator/report.jsx'
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
import Landing from './pages/landing/front.jsx';
import Notifications from './pages/notifications/dashboard.jsx';
import ParentFees from './parent-portal/pages/fees/parent-fees.jsx';
import AcademicHistory from './parent-portal/pages/academics/parent-academics.jsx';
import ParentEvents from './parent-portal/pages/events/parent-events.jsx';
import Setting from './super-admin/pages/settings/settings.jsx';
import SuperDashboard from './super-admin/pages/dashboard/dasboard.jsx';
import ParentPortal from './parent-portal/pages/dashboard/dashboard.jsx';
import ProfileSuper from './super-admin/pages/profile/profiles.jsx';
import Schools from './super-admin/pages/schools/school.jsx';
import Subsciptions from './super-admin/pages/subscriptions/subscription.jsx';
import AddSubsciptions from './super-admin/pages/subscriptions/components/add.jsx';
import Pricing from './pages/pricing/pricing.jsx';
import Contact from './pages/contacts/contact.jsx';
import FAQ from './pages/faq/faq.jsx';
import About from './pages/about/about.jsx';
import Invoicing from './pages/pricing/billing.jsx';
import Events from './pages/administrator/events.jsx';
import PromoteStudents from './pages/students/promotion/promotion.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
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
      path: '/student',
      element: (
          <InactivityHandler>
          <Students />
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
      path: '/notifications',
      element: (
          <InactivityHandler>
          <Notifications />
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
      path: '/add-student',
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
    {
      path: '/pricing',
      element: (
          <InactivityHandler>
            <Pricing />
          </InactivityHandler>
        )
    },
    {
      path: '/contact',
      element: (
          <InactivityHandler>
            <Contact />
          </InactivityHandler>
        )
    },
    {
      path: '/faq',
      element: (
          <InactivityHandler>
            <FAQ />
          </InactivityHandler>
        )
    },
    {
      path: '/about',
      element: (
          <InactivityHandler>
            <About />
          </InactivityHandler>
        )
    },
    {
      path: '/invoicing/:plan',
      element: (
          <InactivityHandler>
            <Invoicing />
          </InactivityHandler>
        )
    },
    {
      path: '/events',
      element: (
          <InactivityHandler>
            <Events />
          </InactivityHandler>
        )
    },
    {
      path: '/student-promotion',
      element: (
          <InactivityHandler>
            <PromoteStudents />
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




    // Parent Portal Routes 
    {
      path: '/parent/dashboard/',
      element: (
          <ParentPortal />
        )
    },
    {
      path: '/parent/fees/',
      element: (
          <ParentFees />
        )
    },
    {
      path: '/parent/academics/',
      element: (
          <AcademicHistory />
        )
    },
    {
      path: '/parent/events/',
      element: (
          <ParentEvents />
        )
    },
    // Parent Portal Routes 




    // Super Administrator Portal Routes 

    {
      path: '/super',
      element: (
        <InactivityHandler>
          <SuperDashboard />
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
      path: '/suprofile',
      element: (
        <InactivityHandler>
          <ProfileSuper />
        </InactivityHandler>
      )
    },
    {
      path: '/schools',
      element: (
        <InactivityHandler>
          <Schools />
        </InactivityHandler>
      )
    },
    {
      path: '/subscriptions',
      element: (
        <InactivityHandler>
          <Subsciptions />
        </InactivityHandler>
      )
    },
    {
      path: '/add-subscriptions',
      element: (
        <InactivityHandler>
          <AddSubsciptions />
        </InactivityHandler>
      )
    },

    // Super Administrator Portal Routes 
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
