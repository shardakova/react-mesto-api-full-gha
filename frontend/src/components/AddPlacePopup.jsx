import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function AddPlacePopup (props) {
  const [onInput, errors, isValid, resetValidation] = useValidation();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  React.useEffect(() => {
    if (!props.isOpen) {
      setName('');
      setLink('');
      resetValidation();
    }
  }, [props.isOpen]);

  function handleSubmit () {
    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText="Создать"
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
          placeholder="Название"
          value={name}
          minLength="2"
          maxLength="30"
          required
          disabled={props.isLoading}
        />
        {errors.name && (<span className="form__span form__span-error">{errors.name}</span>)}
      </div>
      <div className="form__field">
        <input
          onInput={(event) => {
            setLink(event.target.value);
            onInput(event);
          }}
          className="form__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          required
          disabled={props.isLoading}
        />
        {errors.link && (<span className="form__span form__span-error">{errors.link}</span>)}
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
