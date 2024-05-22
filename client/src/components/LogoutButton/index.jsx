import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import Deconnexion from '../../assets/icons/deconnexion.png';

const LogoutButton = () => {
    const dispatch = useDispatch();

    return (
        <button
            className="nav__links_item"
            onClick={() => dispatch(logout())}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
            <img className="nav__icon" src={Deconnexion} alt="" />
        </button>
    )
}

export default LogoutButton;