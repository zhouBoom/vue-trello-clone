import { defineStore } from 'pinia';
import ListService from '@/services/ListService';
import CardService from '@/services/CardService';

export const useBoardStore = defineStore('board', {
  state: () => ({
    lists: ListService.getLists()
  }),
  actions: {
    addList(title) {
      const newList = ListService.createList(title);
      this.lists.push(newList);
      return newList;
    },
    moveList(fromIndex, toIndex) {
      ListService.moveList(fromIndex, toIndex);
      this.lists = ListService.getLists();
    },
    deleteList(listId) {
      const success = ListService.deleteList(listId);
      if (success) {
        this.lists = this.lists.filter(list => list.id !== listId);
      }
      return success;
    },
    addItem(listId, title, description, date) {
      const newCard = CardService.createCard(title, description, date);
      ListService.addItemToList(listId, newCard.id);
      this.lists = ListService.getLists();
      return newCard;
    },
    updateItem(itemId, title, description, date) {
      const updatedCard = CardService.updateCard(itemId, title, description, date);
      if (updatedCard) {
        const listIndex = this.lists.findIndex(list => list.items.includes(itemId));
        if (listIndex !== -1) {
          const itemIndex = this.lists[listIndex].items.findIndex(id => id === itemId);
          if (itemIndex !== -1) {
            this.lists[listIndex].items[itemIndex] = updatedCard.id;
          }
        }
      }
      return updatedCard;
    },
    moveItem(fromListIndex, fromItemIndex, toListIndex, toItemIndex) {
      ListService.moveItemBetweenLists(fromListIndex, fromItemIndex, toListIndex, toItemIndex);
      this.lists = ListService.getLists();
    },
    deleteItem(listId, itemId) {
      const success = ListService.removeItemFromList(listId, itemId);
      if (success) {
        CardService.deleteCard(itemId);
        this.lists = ListService.getLists();
      }
      return success;
    },
    reset() {
      localStorage.removeItem(ListService.STORAGE_KEY);
      localStorage.removeItem(CardService.STORAGE_KEY);
      this.lists = ListService.getLists();
    }
  }
});
