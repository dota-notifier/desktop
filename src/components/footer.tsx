import './footer.scss'

import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'

export const Footer: FunctionalComponent = () => {
  const [away, setAway] = useState(false)

  return (
    <footer>
      <button className={away ? 'away' : 'here'} onClick={() => setAway(!away)}>
        {away ? `I'm back` : `I'm away`}
      </button>
    </footer>
  )
}
