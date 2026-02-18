import { XMLParser } from 'fast-xml-parser'
import { NewsRss } from '../types/news'



export function rssXmlToJson(xml: string): NewsRss {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    textNodeName: '#text',
    removeNSPrefix: false,
    parseTagValue: true,
    parseAttributeValue: true,
    trimValues: true
  })

  return parser.parse(xml) as NewsRss
}