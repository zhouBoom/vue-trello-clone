import ListService from '@/services/ListService'
import CardService from '@/services/CardService'
import { getItemById, getListById, getListByItemId } from 'app/utils/board'

export function state () {
  return {
    lists: ListService.getLists(),
  }
}

const getters = {
  getListById: state => listId => {
    return getListById(state.lists, listId)
  },

  getListByItemId: state => itemId => {
    return getListByItemId(state.lists, itemId)
  },

  getItemById: state => itemId => {
    return getItemById(state.lists, itemId)
  }
}

export const mutations = {
  lists (state, value) {
    state.lists = value
    localStorage.setItem(ListService.STORAGE_KEY, JSON.stringify(value))
  },

  reset (state) {
    localStorage.removeItem(ListService.STORAGE_KEY)
    localStorage.removeItem(CardService.STORAGE_KEY)
    state.lists = []
  },

  addList (state, { title }) {
    const newList = ListService.createList(title)
    state.lists.push(newList)
  },

  moveList (state, [fromIndex, toIndex]) {
    state.lists = ListService.moveList(fromIndex, toIndex)
  },

  removeList (state, { listId }) {
    ListService.deleteList(listId)
    state.lists = ListService.getLists()
  },

  addItem (state, { listId, title, description, date }) {
    const newCard = CardService.createCard(title, description, date)
    ListService.addItemToList(listId, newCard)
    state.lists = ListService.getLists()
  },

  updateItem (state, { itemId, title, description, date }) {
    const updatedCard = CardService.updateCard({ id: itemId, title, description, date })
    if (updatedCard) {
      const list = getListByItemId(state.lists, itemId)
      const index = list.items.findIndex(item => item.id === itemId)
      list.items[index] = updatedCard
    }
  },

  moveItem (state, [fromListRef, fromIndex, toListRef, toIndex]) {
    const fromListId = typeof fromListRef === 'number' ? state.lists[fromListRef].id : fromListRef
    const toListId = typeof toListRef === 'number' ? state.lists[toListRef].id : toListRef
    const item = getItemById(state.lists, state.lists[fromListRef].items[fromIndex].id)
    ListService.moveItemBetweenLists(fromListId, fromIndex, toListId, toIndex, item)
    state.lists = ListService.getLists()
  },

  removeItem (state, { itemId }) {
    const list = getListByItemId(state.lists, itemId)
    ListService.removeItemFromList(list.id, itemId)
    CardService.deleteCard(itemId)
    state.lists = ListService.getLists()
  },}
}

export default {
  state,
  mutations,
  getters,
}
