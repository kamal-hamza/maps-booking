import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddRoomForm from './Components/AddRoomForm/AddRoomForm';
import RoomCard from './Components/RoomCard/RoomCard';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import RoomsPage from './Pages/RoomsPage/RoomsPage';
import logo from './assets/google-logo.webp';
import './App.css';
import RoomView from './Components/RoomView/RoomView';
import BookRoomForm from './Components/BookRoomForm/BookRoomForm';

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <AddRoomForm />,
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
      path: "/rooms/form/:id",
      element: <BookRoomForm />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
