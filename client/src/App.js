import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/login';
import Authenticate from './pages/password/authenticate';
import Forgot from './pages/password/forgot_password';
import Reset from './pages/password/reset_password';
import Register from './pages/register/register';
import TeacherDashboard from './pages/teacher/dasboard.jsx'
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
      path: '/teacher',
      element: <TeacherDashboard />
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
      path: '/teachers',
      element: (
          <InactivityHandler>
          <Teachers />
          </InactivityHandler>
        )
    },
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
