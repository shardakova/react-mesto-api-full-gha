import React from 'react';

function PopupWithForm (props) {
  const formRef = React.createRef();

  function handleOutsideClick (event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (props.isValid) {
      props.onSubmit();
    }
  }

  return (
    <div
      onMouseDown={handleOutsideClick}
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__content">
        <button
          className="button button_type_close opacity"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`form form_type_${props.name}`} name={`${props.name}-form`}
          noValidate
        >
          {props.children}
          <button
            className="button button_type_form"
            type="submit"
            disabled={props.isLoading || !props.isValid}
          >
            {
              props.isLoading
                ? props.buttonLoadingText || 'Сохранение...'
                : props.buttonText || 'Сохранить'
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
