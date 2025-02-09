import React, { useEffect } from 'react'

import cn from '@/utils/cn'

interface IVideo {
  id?: string
  youTubeUrl?: string
  mediaUrl?: string
  className?: string
  size?: 'default' | 'custom'
}

export const Video = ({ id, className, youTubeUrl, mediaUrl, size = 'default' }: IVideo) => {
  const [embedUrl, setEmbedUrl] = React.useState('')

  useEffect(() => {
    const parseYoutubeUrl = async () => {
      const oembedUrl = `https://www.youtube.com/oembed?url=${youTubeUrl ?? ''}&format=json`
      const res = await fetch(oembedUrl)
      const { html }: { html: string } = await res.json()

      const substrStart = html.indexOf('src="') + 5
      const substrEnd = html.indexOf('oembed') + 6
      const embedUrlInner = html.slice(substrStart, substrEnd)

      setEmbedUrl(embedUrlInner)
    }

    if (youTubeUrl)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      parseYoutubeUrl()
  }, [youTubeUrl])

  return (
    <div
      className={cn(className, {
        'h-[162px] w-72 lg:h-[439px] lg:w-[780px]': size === 'default',
      })}
    >
      <iframe
        className="size-full"
        title={id}
        src={youTubeUrl ? embedUrl : mediaUrl}
        allowFullScreen
      />
    </div>
  )
}
