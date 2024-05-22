import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const LogoutButton = () => {
    const dispatch = useDispatch();

    return <button onClick={() => dispatch(logout())}>Déconnexion</button>;
}

export default LogoutButton;