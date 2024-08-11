import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddRoomForm from './Components/AddRoomForm/AddRoomForm';
import RoomCard from './Components/RoomCard/RoomCard';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import RoomsPage from './Pages/RoomsPage/RoomsPage';
import InternalLoginPage from './Pages/InternalLoginPage/InternalLoginPage';
import InternalSignupPage from './Pages/InternalSignupPage/InternalSignupPage';
import logo from './assets/google-logo.webp';
import './App.css';
import RoomView from './Components/RoomView/RoomView';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <RoomView />,
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
      path: "/login/internal",
      element: <InternalLoginPage />
    },
    {
      path: "/signup/internal",
      element: <InternalSignupPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
