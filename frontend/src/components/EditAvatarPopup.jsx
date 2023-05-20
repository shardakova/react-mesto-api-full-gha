import React from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function EditAvatarPopup (props) {
  const [onInput, errors, isValid, resetValidation] = useValidation();
  const inputRef = React.createRef();

  React.useEffect(() => {
    if (!props.isOpen) {
      resetValidation();
    }
  }, [props.isOpen]);

  function handleSubmit () {
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="form__field">
        <input
          ref={inputRef}
          onInput={onInput}
          className="form__input"
          type="url"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          disabled={props.isLoading}
        />
        {errors.avatar && (<span className="form__span form__span-error">{errors.avatar}</span>)}
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
