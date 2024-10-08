import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddRoomForm from './Components/AddRoomForm/AddRoomForm';
import RoomCard from './Components/RoomCard/RoomCard';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import RoomsPage from './Pages/RoomsPage/RoomsPage';
import ApprovalsPage from './Pages/ApprovalsPage/ApprovalsPage';
import BookingCalendar from './Components/Calender/Calender';
import InternalLoginPage from './Pages/InternalLoginPage/InternalLoginPage';
import InternalSignupPage from './Pages/InternalSignupPage/InternalSignupPage';
import Logout from './Components/Logout/Logout';
import logo from './assets/google-logo.webp';
import './App.css';
import RoomView from './Components/RoomView/RoomView';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <LoginPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/rooms",
      element: <RoomsPage />
    },
    {
      path: "/calendar/:id",
      element: <BookingCalendar />
    },
    {     
      path: "/login/internal",
      element: <InternalLoginPage />
    },
    {
      path: "/signup/internal",
      element: <InternalSignupPage />
    },
    {
      path: "/logout",
      element: <Logout />
    },     
    { path: "/approvals/internal",
      element: <ApprovalsPage/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
