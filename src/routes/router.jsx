import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Tutors from '../pages/Tutors/Tutors'
import TutorDetails from '../pages/TutorDetails/TutorDetails'
import AddTutor from '../pages/AddTutor/AddTutor'
import MyTutors from '../pages/MyTutors/MyTutors'
import MyBookings from '../pages/MyBookings/MyBookings'
import NotFound from '../pages/NotFound/NotFound'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'tutors', element: <Tutors /> },
      { path: 'tutors/:id', element: <PrivateRoute><TutorDetails /></PrivateRoute> },
      { path: 'add-tutor', element: <PrivateRoute><AddTutor /></PrivateRoute> },
      { path: 'my-tutors', element: <PrivateRoute><MyTutors /></PrivateRoute> },
      { path: 'my-bookings', element: <PrivateRoute><MyBookings /></PrivateRoute> },
    ]
  },
  { path: '*', element: <NotFound /> }
])
export default router
