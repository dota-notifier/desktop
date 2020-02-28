import './code.scss'

import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import qrcode from 'qrcode'

interface Props {
  id: string
}

export const Code: FunctionalComponent<Props> = ({ id }) => {
  const [img, setImg] = useState('')

  useEffect(() => {
    qrcode
      .toDataURL(id, {
        color: {
          dark: '#f44336',
          light: '#000'
        },
        width: 200
      })
      .then(img => setImg(img))
  }, [])

  if (!img) {
    return null
  }

  return (
    <figure>
      <img src={img} />
    </figure>
  )
}
