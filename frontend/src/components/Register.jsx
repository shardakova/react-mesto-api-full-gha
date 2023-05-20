import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import useValidation from '../hooks/useValidation';
import useAuth from '../hooks/useAuth';
import InfoTooltip from './InfoTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Register () {
  const auth = useAuth();
  const navigate = useNavigate();
  const [onInput, errors, isValid] = useValidation();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (auth.user) {
    return navigate('/', { replace: true });
  }

  function handleSubmit () {
    setIsFormLoading(true);
    setRegistrationError('');
    auth.register({
      email,
      password
    }, err => {
      if (err) {
        setRegistrationError(err?.message || err || 'Что-то пошло не так!\nПопробуйте еще раз.');
      }
      setIsShowTooltip(true);
      setIsFormLoading(false);
    });
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
          className="sign_in_form" name="register-form"
          noValidate
        >
          <h3 className="sign_in_form__title">Регистрация</h3>
          <div className="sign_in_form__field">
            <input
              onInput={(event) => {
                onInput(event);
                setEmail(event.target.value);
              }}
              className="sign_in_form__input"
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isFormLoading}
            />
            {errors.email && (<span className="sign_in_form__span sign_in_form__span-error">{errors.email}</span>)}
          </div>
          <div className="sign_in_form__field">
            <input
              onInput={(event) => {
                onInput(event);
                setPassword(event.target.value);
              }}
              className="sign_in_form__input"
              type="password"
              name="password"
              placeholder="Пароль"
              required
              disabled={isFormLoading}
            />
            {errors.password && (<span className="sign_in_form__span sign_in_form__span-error">{errors.password}</span>)}
          </div>
          <button
            className="button button_type_login_form"
            type="submit"
            disabled={isFormLoading || !isValid}
          >
            {
              isFormLoading ? 'Регистрируем...' : 'Зарегистрироваться'
            }
          </button>
          <div className="sign_in_form__hint">
            Уже зарегистрированы? <Link className="sign_in_form__hint_link" to="/sign-in">Войти</Link>
          </div>
        </form>
        <InfoTooltip
          text={registrationError || 'Вы успешно зарегистрировались!'}
          icon={
            <FontAwesomeIcon
              className={registrationError ? 'info_tooltip__icon-danger' : ''}
              icon={registrationError ? faCircleXmark : faCircleCheck}
            />
          }
          isOpen={isShowTooltip}
          onClose={() => {
            setRegistrationError('');
            setIsShowTooltip(false);
          }}
        />
        <Footer />
      </div>
    </div>
  );
}

export default Register;
