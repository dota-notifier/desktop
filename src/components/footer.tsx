import './footer.scss'

import { FunctionalComponent, h } from 'preact'

export const Footer: FunctionalComponent = () => (
  <footer>
    <p>Scan this QR code with the mobile app.</p>
    <p>Press the button when you're going AFK or when you're back.</p>
    <button>I'm AFK</button>
  </footer>
)
