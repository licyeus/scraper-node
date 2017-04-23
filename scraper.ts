import * as cheerio from 'cheerio'

const scrape = (source, schema) => {
  const $ = cheerio.load(source)
  const parsed = $(schema)
  return parsed.text()
}

export default scrape
