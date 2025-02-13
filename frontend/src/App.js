import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="max-w-screen-2xl border px-12">
      <div>
        <Header />

        <div className="mt-24 md:mt-[70px] py-3">
          <Outlet />
        </div>

        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
