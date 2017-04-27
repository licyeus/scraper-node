import * as cheerio from 'cheerio'

const performScrape = (selection: Cheerio, schema) => {
  if (schema instanceof Array) {
    return schema.reduce((acc, def) => performScrape(acc, def), selection)
  } else if (schema instanceof Function) {
    // TODO: find better type detection, as functions are matching instanceof Object, therefore order of these if blocks matters
    return schema(selection)
  } else if (schema instanceof Object) {
    return Object.keys(schema).reduce((acc, key) => ({ ...acc, [key]: performScrape(selection, schema[key]) }), {})
  } else {
    return selection.find(schema)
  }
}

const scrape = (source: string, schema) => {
  const $ = cheerio.load(source)
  return performScrape($.root(), schema)
}

export default scrape

export const text = () => (el: Cheerio) => el.text()

export const attr = (attrName: string) => (el: Cheerio) => el.attr(attrName)

export const map = (schema) => (els: Cheerio) => {
  return els.map((i, el) => performScrape(cheerio.load(el).root(), schema)).get()
}

export const contents = () => (els: Cheerio) => els.contents()

export const has = (selector:string) => (el: Cheerio) => el.has(selector)
