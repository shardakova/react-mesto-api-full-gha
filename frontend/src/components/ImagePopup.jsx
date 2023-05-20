function ImagePopup (props) {
  const { selectedCard } = props;

  function handleOutsideClick (event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      onMouseDown={handleOutsideClick}
      className={`popup popup_type_image ${selectedCard ? 'popup_opened' : ''}`}
    >
      <div className="popup__image-container">
        <button
          className="button button_type_close opacity"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <figure className="figure">
          <img className="figure__image" src={selectedCard?.link} alt={selectedCard?.name} />
          <figcaption className="figure__caption">{selectedCard?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
