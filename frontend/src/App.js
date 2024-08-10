import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddRoomForm from './Components/AddRoomForm/AddRoomForm';
import LoginPage from './Components/LoginPage/LoginPage';
import SignupPage from './Components/SignupPage/SignupPage';
import './App.css';

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
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
