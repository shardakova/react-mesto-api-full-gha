import { Link, useLocation, useNavigate } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import useAuth from '../hooks/useAuth';

function Header () {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  let userBlock;
  if (auth.user) {
    userBlock = (
      <>
        <span className="header__user">{auth.user.email}</span>
        <Link
          className="header__link header__link-has-user"
          to="/"
          onClick={(event) => {
            event.preventDefault();
            auth.signOut(() => {
              navigate('/', { replace: true });
            });
          }}
        >
          Выйти
        </Link>
      </>
    );
  } else {
    if (location.pathname.startsWith('/sign-in')) {
      userBlock = (
        <Link className="header__link" to="/sign-up">
          Зарегистрироваться
        </Link>
      );
    } else {
      userBlock = (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      );
    }
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="Логотип сайта" className="header__logo"/>
      </Link>
      <div className="header__auth">
        {userBlock}
      </div>
    </header>
  );
}

export default Header;
