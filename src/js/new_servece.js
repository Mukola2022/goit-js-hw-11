export default class NewApiServece {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

   

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}