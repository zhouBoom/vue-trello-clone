const ListService = {
  STORAGE_KEY: 'board-lists',

  getLists() {
    const lists = localStorage.getItem(this.STORAGE_KEY);
    return lists ? JSON.parse(lists) : [];
  },

  getListById(id) {
    const lists = this.getLists();
    return lists.find(list => list.id === id);
  },

  createList(title) {
    const lists = this.getLists();
    const newList = {
      id: Date.now().toString(),
      title,
      items: []
    };
    lists.push(newList);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return newList;
  },

  updateList(updatedList) {
    const lists = this.getLists();
    const index = lists.findIndex(list => list.id === updatedList.id);
    if (index === -1) return undefined;
    lists[index] = updatedList;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return updatedList;
  },

  deleteList(id) {
    const lists = this.getLists();
    const newLists = lists.filter(list => list.id !== id);
    if (newLists.length === lists.length) return false;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newLists));
    return true;
  },

  moveList(fromIndex, toIndex) {
    const lists = this.getLists();
    const list = lists.splice(fromIndex, 1)[0];
    lists.splice(toIndex, 0, list);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return lists;
  },

  addItemToList(listId, item) {
    const lists = this.getLists();
    const list = lists.find(list => list.id === listId);
    if (!list) return undefined;
    list.items.push(item);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return list;
  },

  removeItemFromList(listId, itemId) {
    const lists = this.getLists();
    const list = lists.find(list => list.id === listId);
    if (!list) return undefined;
    const itemIndex = list.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return undefined;
    list.items.splice(itemIndex, 1);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return list;
  },

  moveItemBetweenLists(fromListId, fromIndex, toListId, toIndex, item) {
    const lists = this.getLists();
    const fromList = lists.find(list => list.id === fromListId);
    const toList = lists.find(list => list.id === toListId);
    if (!fromList || !toList) return undefined;
    fromList.items.splice(fromIndex, 1);
    toList.items.splice(toIndex, 0, item);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lists));
    return lists;
  }
};

export default ListService;