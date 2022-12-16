import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Layout = () => {
  const location = useLocation()
  const asideStyle =  'md:flex md:min-h-screen'
  return (
    <div className={asideStyle}>
      <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-4xl font-black text-white text-center '>CRM - Clientes</h2> 

        <nav className='mt-10'>
          <Link className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl mt-2  hover:text-blue-300 text-white  block active:text-blue-300` }  to={'/'}>
            Cliente
          </Link>
          <Link  className={`${location.pathname === '/cliente/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl mt-2  hover:text-blue-300 block text-white  active:text-blue-300` }  to={'/cliente/nuevo'}>
            Nuevo Cliente
          </Link>
        </nav>
      </aside>

      <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet/>
      </main>
    </div>
  );
};

export default Layout;
