import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { FaCashRegister, FaHistory } from 'react-icons/fa';

const SideBar = () => {
    return (
        <section className="sidebar">
            <h3>Todo envases y químicos</h3>

            <div className='sidebar-links'>

            <NavLink to='/facturacion' className={({ isActive, isPending }) => isPending ? 'link pending' : isActive ? 'link active' : 'link'}>
                <FaCashRegister/> Pedidos
            </NavLink>

            <NavLink to='/historial' className={({ isActive, isPending }) => isPending ? 'link pending' : isActive ? 'link active' : 'link'}>
                <FaHistory/> Historial
            </NavLink>

            </div>
            
        </section>
    );
}

export default SideBar;