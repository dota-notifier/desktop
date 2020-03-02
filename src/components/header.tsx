import './header.scss'

import { remote } from 'electron'
import { FunctionalComponent, h } from 'preact'

import {
  img_close_window,
  img_help_window,
  img_minimize_window
} from '../assets'

export const Header: FunctionalComponent = () => (
  <header>
    <h1>Dota Notifier</h1>
    <nav>
      <a
        href="#help"
        onClick={event => {
          event.preventDefault()

          remote.shell.openExternal('https://dota-notifier.now.sh')
        }}>
        <img alt="Help" src={img_help_window} />
      </a>
      <a
        href="#minimize"
        onClick={event => {
          event.preventDefault()

          remote.getCurrentWindow().minimize()
        }}>
        <img alt="Minimize" src={img_minimize_window} />
      </a>
      <a
        href="#close"
        onClick={async event => {
          event.preventDefault()

          const { response } = await remote.dialog.showMessageBox({
            buttons: ['Yes', 'No'],
            message: 'Are you sure you want to quit?',
            title: 'Dota Notifier'
          })

          if (response === 0) {
            remote.app.quit()
          }
        }}>
        <img alt="Close" src={img_close_window} />
      </a>
    </nav>
  </header>
)
