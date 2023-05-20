import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card (props) {
  const { card } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const hasMyLike = card.likes.find(like => like === currentUser._id);

  return (
    <li className="card">
      {isOwn && (
        <button
          onClick={() => props.onDeleteCardClick(card)}
          className="button button_type_del opacity"
          type="button"
          aria-label="Удалить"
        />
      )}
      <img
        alt={card.name}
        src={card.link}
        className="card__image"
        onClick={() => props.onCardClick({
          name: card.name,
          link: card.link
        })}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            onClick={() => props.onCardLike(card)}
            className={`button button_type_like ${hasMyLike ? 'button_type_like_active' : ''} opacity`}
            type="button"
            aria-label="Лайкнуть"
          />
          <span className="card__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
