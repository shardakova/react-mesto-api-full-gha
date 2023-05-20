import { useEffect, useState } from 'react';
import { API } from '../utils/constants';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App () {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [confirmDeletionCardId, setConfirmDeletionCardId] = useState(null);

  useEffect(() => {
    API.getUserInfo()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.error(err);
      });
    API.getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const isPopupOpen = (
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    confirmDeletionCardId
  );

  useEffect(() => {
    function closeByEscape (event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isPopupOpen) {
      document.addEventListener('keyup', closeByEscape);
      return function () {
        document.removeEventListener('keyup', closeByEscape);
      };
    }
  }, [isPopupOpen]);

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function onEditProfile () {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace () {
    setIsAddPlacePopupOpen(true);
  }

  function onEditAvatar () {
    setIsEditAvatarPopupOpen(true);
  }

  function onDeleteCard (card) {
    setConfirmDeletionCardId(card._id);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmDeletionCardId(null);
    setSelectedCard(null);
  }

  function handleUpdateUser ({ name, about }) {
    setIsFormLoading(true);
    API.setUserInfo({ name, about })
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsFormLoading(true);
    API.updateAvatar(avatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  }

  function handleCardLike (card) {
    const hasMyLike = card.likes.find(i => i === currentUser._id);
    API.setLike(card._id, hasMyLike)
      .then(newCard => {
        setCards(cards => cards.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleCardDelete () {
    setIsFormLoading(true);
    API.deleteCard(confirmDeletionCardId)
      .then(() => {
        setCards(cards => cards.filter(c => confirmDeletionCardId !== c._id));
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  }

  function handleAddPlaceSubmit ({ name, link }) {
    setIsFormLoading(true);
    API.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            onDeleteCardClick={onDeleteCard}
            handleCardLike={handleCardLike}
          />
          <Footer />
        </div>

        <ImagePopup
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="deleteConfirmation"
          buttonText="Да"
          buttonLoadingText="Удаление..."
          onSubmit={handleCardDelete}
          isOpen={confirmDeletionCardId}
          isLoading={isFormLoading}
          onClose={closeAllPopups}
          isValid={true}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          isLoading={isFormLoading}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          isLoading={isFormLoading}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          isLoading={isFormLoading}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
