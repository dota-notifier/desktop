import './header.scss'

import { FunctionalComponent, h } from 'preact'

import { img_close_window, img_minimize_window } from '../assets'

export const Header: FunctionalComponent = () => (
  <header>
    <h1>Dota Notifier</h1>
    <nav>
      <a>
        <img src={img_minimize_window} alt="Minimize" />
      </a>
      <a>
        <img src={img_close_window} alt="Close" />
      </a>
    </nav>
  </header>
)
