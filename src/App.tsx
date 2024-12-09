import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './global.scss';
import Join from './routes/Join';
import Login from './routes/Login';
import Layout from './routes/Layout';
import Auth from './routes/Auth';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "Join",
          element: <Join />
        },
        {
          path: "Login",
          element: <Login />
        },
        {
          path: "Auth",
          element: <Auth />
        },
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App;
