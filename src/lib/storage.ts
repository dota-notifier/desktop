import Store from 'electron-store'

class Storage {
  store = new Store()

  get(key: string) {
    return this.store.get(key)
  }

  set(key: string, value: string) {
    this.store.set(key, value)
  }

  clear() {
    this.store.clear()
  }
}

export const storage = new Storage()
