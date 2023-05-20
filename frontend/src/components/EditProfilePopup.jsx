import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useValidation from '../hooks/useValidation';

function EditProfilePopup (props) {
  const [onInput, errors, isValid, resetValidation] = useValidation();
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    if (!props.isOpen) {
      resetValidation();
    }
  }, [currentUser, props.isOpen]);

  function handleSubmit () {
    props.onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="form__field">
        <input
          onInput={(event) => {
            setName(event.target.value);
            onInput(event);
          }}
          className="form__input"
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={name || ''}
          minLength="2"
          maxLength="40"
          required
          disabled={props.isLoading}
        />
        {errors.name && (<span className="form__span form__span-error">{errors.name}</span>)}
      </div>
      <div className="form__field">
        <input
          onInput={(event) => {
            setAbout(event.target.value);
            onInput(event);
          }}
          className="form__input"
          type="text"
          name="about"
          placeholder="Вид деятельности"
          value={about || ''}
          minLength="2"
          maxLength="200"
          required
          disabled={props.isLoading}
        />
        {errors.about && (<span className="form__span form__span-error">{errors.about}</span>)}
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
