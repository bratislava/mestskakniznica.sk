import cx from 'classnames'
import React from 'react'

interface IVideo {
  id?: string
  youTubeUrl?: string
  mediaUrl?: string
  className?: string
  size?: 'default' | 'custom'
}

export function Video({ id, className, youTubeUrl, mediaUrl, size = 'default' }: IVideo) {
  const [embedUrl, setEmbedUrl] = React.useState('')

  React.useEffect(() => {
    const parseYoutubeUrl = async () => {
      const oembedUrl = `https://www.youtube.com/oembed?url=${youTubeUrl}&format=json`
      const res = await fetch(oembedUrl)
      const { html }: { html: string } = await res.json()

      const substrStart = html.indexOf('src="') + 5
      const substrEnd = html.indexOf('oembed') + 6
      const embedUrl = html.substring(substrStart, substrEnd)

      setEmbedUrl(embedUrl)
    }

    if (youTubeUrl) parseYoutubeUrl()
  }, [youTubeUrl])

  return (
    <div
      className={cx(className, {
        'w-72 h-[162px] lg:w-[780px] lg:h-[439px]': size === 'default',
      })}
    >
      <iframe className={cx('w-full h-full')} title={id} src={youTubeUrl ? embedUrl : mediaUrl} allowFullScreen />
    </div>
  )
}
