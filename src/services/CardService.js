const CardService = {
  STORAGE_KEY: 'board-cards',

  getCards() {
    const cards = localStorage.getItem(this.STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  },

  getCardById(id) {
    const cards = this.getCards();
    return cards.find(card => card.id === id);
  },

  createCard(title, description = '', date = '') {
    const cards = this.getCards();
    const newCard = {
      id: Date.now().toString(),
      title,
      description,
      date
    };
    cards.push(newCard);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
    return newCard;
  },

  updateCard(updatedCard) {
    const cards = this.getCards();
    const index = cards.findIndex(card => card.id === updatedCard.id);
    if (index === -1) return undefined;
    cards[index] = updatedCard;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
    return updatedCard;
  },

  deleteCard(id) {
    const cards = this.getCards();
    const newCards = cards.filter(card => card.id !== id);
    if (newCards.length === cards.length) return false;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newCards));
    return true;
  }
};

export default CardService;