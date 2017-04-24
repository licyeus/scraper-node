import * as cheerio from 'cheerio'

const performScrape = (selection:Cheerio, schema) => {
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

const scrape = (source, schema) => {
  const $ = cheerio.load(source)
  return performScrape($.root(), schema)
}

export default scrape

export const text = () => (el) => el.text()

export const attr = (attrName) => (el) => el.attr(attrName)

export const map = (schema) => (els:Cheerio) => {
  return els.map((i, el) => {
    const $ = cheerio.load(el)
    return performScrape($.root(), schema)
  }).get()
}