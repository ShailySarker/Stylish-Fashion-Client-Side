import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './redux/userRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginSuccess(user)); // Restore user info from localStorage
    }
  }, [dispatch]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
