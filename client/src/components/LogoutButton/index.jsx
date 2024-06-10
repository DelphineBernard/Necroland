import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import Deconnexion from '../../assets/icons/deconnexion.webp';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deconnect = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <button
            className="nav__links_item"
            onClick={deconnect}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
            <img className="nav__icon" src={Deconnexion} alt="Se déconnecter" />
        </button>
    )
}

export default LogoutButton;