import './header.scss'

import { remote } from 'electron'
import { FunctionalComponent, h } from 'preact'

import { img_close_window, img_minimize_window } from '../assets'

export const Header: FunctionalComponent = () => (
  <header>
    <h1>Dota Notifier</h1>
    <nav>
      <a>
        <img
          alt="Minimize"
          onClick={() => remote.getCurrentWindow().minimize()}
          src={img_minimize_window}
        />
      </a>
      <a>
        <img
          alt="Close"
          onClick={async () => {
            const { response } = await remote.dialog.showMessageBox({
              buttons: ['Yes', 'No'],
              message: 'Are you sure you want to quit?',
              title: 'Dota Notifier'
            })

            if (response === 0) {
              remote.app.quit()
            }
          }}
          src={img_close_window}
        />
      </a>
    </nav>
  </header>
)
