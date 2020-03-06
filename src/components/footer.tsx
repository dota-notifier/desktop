import './footer.scss'

import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { createWorker } from 'tesseract.js'

import { worker } from '../lib'

export const Footer: FunctionalComponent = () => {
  const [away, setAway] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const run = async () => {
      const worker = createWorker()

      await worker.load()
      await worker.loadLanguage('eng')

      setReady(true)
    }

    run()
  })

  return (
    <footer>
      <button
        className={away ? 'away' : 'here'}
        disabled={!ready}
        onClick={() => {
          if (away) {
            worker.stop()
          } else {
            worker.start()
          }

          setAway(!away)
        }}>
        {ready ? (away ? `I'm back` : `I'm away`) : 'Loading'}
      </button>
    </footer>
  )
}
