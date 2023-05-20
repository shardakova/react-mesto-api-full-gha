import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className="profile__avatar-button opacity" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="button button_type_edit opacity"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          >
          </button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="button button_type_add opacity"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card key={card._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.handleCardLike}
                  onDeleteCardClick={props.onDeleteCardClick}
                  card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
