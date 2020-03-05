import axios from 'axios'

import { storage } from './storage'

class Functions {
  async notify(type: 'READY_CHECK' | 'MATCH_FOUND'): Promise<void> {
    const id = storage.get('id')

    if (!id) {
      return
    }

    await axios({
      data: {
        id,
        type
      },
      method: 'post',
      url: 'https://us-central1-dota-5233a.cloudfunctions.net/notify'
    })
  }
}

export const functions = new Functions()
