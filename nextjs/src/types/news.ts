export type NewsItemProps = {
        guid?: {
          '#text': string
          isPermaLink?: string
        }
        link?: string
        title?: string
        description?: string
        'a10:updated'?: string
        enclosure?: {
          url?: string
          type?: string
          length?: string
        }
      }

export type NewsRss = {
  rss: {
    channel: {
      title?: string
      link?: string
      description?: string
      language?: string
      item?: Array<NewsItemProps>
    }
  }
}