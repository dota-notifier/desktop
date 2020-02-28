import { Fragment, h, render } from 'preact'
import shortid from 'shortid'

import { Code, Footer, Header } from './components'
import { storage } from './lib'

const getId = () => {
  const id = storage.get('id')

  if (id) {
    return id
  }

  const newId = shortid.generate()

  storage.set('id', newId)

  return newId
}

render(
  <Fragment>
    <Header />
    <Code id={getId()} />
    <div className="copy">
      <p>Scan this QR code with the mobile app.</p>
      <p>Press the button when you're going AFK or when you're back.</p>
    </div>
    <Footer />
  </Fragment>,
  document.getElementById('root') as Element
)
