import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoadingSpinner from './Infinity.jsx';
import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import Store from './helpers/examination/examStore.jsx';
import InactivityHandler from './hooks/activity.jsx';

// Lazy load components
const Bursar = lazy(() => import('./pages/bursar/bursar.jsx'));
const Expenses = lazy(() => import('./pages/bursar/expense.jsx'));
const Hoa = lazy(() => import('./pages/hoa/hoa.jsx'));
const Hod = lazy(() => import('./pages/hod/hod.jsx'));
const Login = lazy(() => import('./pages/login/login'));
const Authenticate = lazy(() => import('./pages/password/authenticate'));
const Forgot = lazy(() => import('./pages/password/forgot_password'));
const Reset = lazy(() => import('./pages/password/reset_password'));
const Register = lazy(() => import('./pages/register/register'));
const AdminDashboard = lazy(() => import('./pages/administrator/dashboard.jsx'));
const Report = lazy(() => import('./pages/administrator/report.jsx'));
const NotFound = lazy(() => import('./pages/nopage/nopage.jsx'));
const Students = lazy(() => import('./pages/administrator/students.jsx'));
const Fees = lazy(() => import('./pages/administrator/fees.jsx'));
const Teachers = lazy(() => import('./pages/administrator/teachers.jsx'));
const Config = lazy(() => import('./pages/teacher/config.jsx'));
const TeacherProfile = lazy(() => import('./pages/teacher/teacherProfile.jsx'));
const AddStudents = lazy(() => import('./pages/students/config.jsx'));
const StudentProfile = lazy(() => import('./pages/students/studentProfile.jsx'));
const FeesSetting = lazy(() => import('./pages/fees/setting.jsx'));
const Payment = lazy(() => import('./pages/fees/payment.jsx'));
const TeacherDashboard = lazy(() => import('./teacher-service/dashboard.jsx'));
const TStudent = lazy(() => import('./teacher-service/pages/student.jsx'));
const Entry = lazy(() => import('./teacher-service/pages/entry.jsx'));
const StudentDetail = lazy(() => import('./teacher-service/pages/studentDetail.jsx'));
const AdminProfile = lazy(() => import('./pages/dashboard/adminProfile.jsx'));
const StudentReport = lazy(() => import('./pages/reports/studentReport.jsx'));
const Landing = lazy(() => import('./pages/landing/front.jsx'));
const Notifications = lazy(() => import('./pages/notifications/dashboard.jsx'));
const ParentFees = lazy(() => import('./parent-portal/pages/fees/parent-fees.jsx'));
const AcademicHistory = lazy(() => import('./parent-portal/pages/academics/parent-academics.jsx'));
const ParentEvents = lazy(() => import('./parent-portal/pages/events/parent-events.jsx'));
const Setting = lazy(() => import('./super-admin/pages/settings/settings.jsx'));
const SuperDashboard = lazy(() => import('./super-admin/pages/dashboard/dasboard.jsx'));
const ParentPortal = lazy(() => import('./parent-portal/pages/dashboard/dashboard.jsx'));
const ProfileSuper = lazy(() => import('./super-admin/pages/profile/profiles.jsx'));
const Schools = lazy(() => import('./super-admin/pages/schools/school.jsx'));
const Subsciptions = lazy(() => import('./super-admin/pages/subscriptions/subscription.jsx'));
const AddSubsciptions = lazy(() => import('./super-admin/pages/subscriptions/components/add.jsx'));
const Pricing = lazy(() => import('./pages/pricing/pricing.jsx'));
const Contact = lazy(() => import('./pages/contacts/contact.jsx'));
const FAQ = lazy(() => import('./pages/faq/faq.jsx'));
const About = lazy(() => import('./pages/about/about.jsx'));
const Invoicing = lazy(() => import('./pages/pricing/billing.jsx'));
const Events = lazy(() => import('./pages/administrator/events.jsx'));
const PromoteStudents = lazy(() => import('./pages/students/promotion/promotion.jsx'));
const UserProfile = lazy(() => import('./teacher-service/pages/profile.jsx'));
const Feedback = lazy(() => import('./pages/administrator/feedback.jsx'));
const Feeds = lazy(() => import('./super-admin/pages/feedback/feeds.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/law/policy.jsx'));
const TermsOfService = lazy(() => import('./pages/law/terms.jsx'));

function App() {
  const router = createBrowserRouter([
    // Bursar Section
    {
      path: '/bursar',
      element: (
        <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Bursar /> </Suspense>
          </InactivityHandler>
        )
      },
      {
        path: '/expenses',
        element: (
          <InactivityHandler>
              <Suspense fallback={<LoadingSpinner />}><Expenses /> </Suspense>
            </InactivityHandler>
          )
        },

    // Bursar Section
    {
      path: '/hoa',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Hoa /> </Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/hod',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Hod /> </Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '*',
      element: <Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense>
    },
    {
      path: '/',
      element: <Suspense fallback={<LoadingSpinner />}><Landing /></Suspense>
    },
    {
      path: '/login',
      element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense>
    },
    {
      path: '/register',
      element: <Suspense fallback={<LoadingSpinner />}><Register /></Suspense>
    },
    {
      path: '/forgot',
      element: <Suspense fallback={<LoadingSpinner />}><Forgot /></Suspense>
    },
    {
      path: '/reset',
      element: <Suspense fallback={<LoadingSpinner />}><Reset /></Suspense>
    },
    {
      path: '/authenticate',
      element: <Suspense fallback={<LoadingSpinner />}><Authenticate /></Suspense>
    },
    {
      path: '/administrator',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><AdminDashboard /></Suspense>
          </InactivityHandler>
      )
    },
    {
      path: '/profile',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><AdminProfile /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/report',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Report /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/student',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Students /></Suspense>
          </InactivityHandler>
      )
    },
    {
      path: '/fees',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Fees /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/notifications',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Notifications /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/fees_setting',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><FeesSetting /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/payment',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Payment /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/teachers',
      element: (
          <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Teachers /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/config',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Config /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/add-student',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><AddStudents /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/teacher_profile/:id',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><TeacherProfile /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/student_profile/:id',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><StudentProfile /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/student-report/:id',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><StudentReport /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/pricing',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Pricing /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/contact',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/faq',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><FAQ /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/about',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><About /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/invoicing/:plan',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Invoicing /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/events',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Events /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/feedback',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Feedback /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/policy',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><PrivacyPolicy /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/terms',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><TermsOfService /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/student-promotion',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><PromoteStudents /></Suspense>
          </InactivityHandler>
        )
    },


    // Teacher Portal Routes
    
    {
      path: '/tdashboard/',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><TeacherDashboard /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/tstudent/',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><TStudent /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/entry/',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><Entry /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/student/:id',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><StudentDetail /></Suspense>
          </InactivityHandler>
        )
    },
    {
      path: '/teacher-profile',
      element: (
          <InactivityHandler>
            <Suspense fallback={<LoadingSpinner />}><UserProfile /></Suspense>
          </InactivityHandler>
        )
    },

    // Teacher Portal Routes 




    // Parent Portal Routes 
    {
      path: '/parent/dashboard/',
      element: (
          <Suspense fallback={<LoadingSpinner />}><ParentPortal /></Suspense>
        )
    },
    {
      path: '/parent/fees/',
      element: (
          <Suspense fallback={<LoadingSpinner />}><ParentFees /></Suspense>
        )
    },
    {
      path: '/parent/academics/',
      element: (
          <Suspense fallback={<LoadingSpinner />}><AcademicHistory /></Suspense>
        )
    },
    {
      path: '/parent/events/',
      element: (
          <Suspense fallback={<LoadingSpinner />}><ParentEvents /></Suspense>
        )
    },
    // Parent Portal Routes 




    // Super Administrator Portal Routes 

    {
      path: '/super',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><SuperDashboard /></Suspense>
        </InactivityHandler>
        )
    },
    {
      path: '/setting',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Setting /></Suspense>
        </InactivityHandler>
      )
    },
    {
      path: '/suprofile',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><ProfileSuper /></Suspense>
        </InactivityHandler>
      )
    },
    {
      path: '/schools',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Schools /></Suspense>
        </InactivityHandler>
      )
    },
    {
      path: '/subscriptions',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Subsciptions /></Suspense>
        </InactivityHandler>
      )
    },
    {
      path: '/feeds',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><Feeds /></Suspense>
        </InactivityHandler>
      )
    },
    {
      path: '/add-subscriptions',
      element: (
        <InactivityHandler>
          <Suspense fallback={<LoadingSpinner />}><AddSubsciptions /></Suspense>
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
