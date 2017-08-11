import * as cheerio from 'cheerio'

function performScrape (selection: Cheerio, schema) {
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

function scrape (source: string, schema) {
  return performScrape(cheerio.load(source).root(), schema)
}

function map (schema) {
  return (sel: Cheerio) =>
    sel.map((i, el) =>
      performScrape(cheerio.load(el).root(), schema)
    ).get()
}

export { map }
export * from './helpers'
export default scrape
