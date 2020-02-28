import './footer.scss'

import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

import { worker } from '../lib'

export const Footer: FunctionalComponent = () => {
  const [away, setAway] = useState(false)

  return (
    <footer>
      <button
        className={away ? 'away' : 'here'}
        onClick={() => {
          if (away) {
            worker.stop()
          } else {
            worker.start()
          }

          setAway(!away)
        }}>
        {away ? `I'm back` : `I'm away`}
      </button>
    </footer>
  )
}
