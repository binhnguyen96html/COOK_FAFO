import ReactDOM from 'react-dom';
import { useEffect } from 'react';


function Modal2({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        // onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed inset-40 lg:inset-80  p-10 bg-white z-50 overflow-hidden md:overflow-auto">
        <div className="flex flex-col justify-between ">
          {children}
        </div>

        <div className="flex justify-center mt-12">{actionBar}</div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal2;
