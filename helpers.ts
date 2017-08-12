import * as cheerio from 'cheerio'

// each item in array is descriptor of operation and yields a selection
// reduce, until, after, find, filter, reject, contains, join, tap, split, inspect, children, is

export function text () {
  return (sel: Cheerio) => sel.text()
}

export function attr (attrName: string) {
  return (sel: Cheerio) => sel.attr(attrName)
}

export function contents () {
  return (sel: Cheerio) => sel.contents()
}

export function has (selector: string) {
  return (sel: Cheerio) => sel.has(selector)
}

export function find (selector: string) {
  return (sel: Cheerio) => sel.find(selector)
}

export function children () {
  return (sel: Cheerio) => sel.children()
}

export function filter (selector: string | Function) {
  if (typeof selector === 'string') {
    return (sel: Cheerio) => sel.filter(selector)
  } else {
    return (sel: Cheerio) => sel.filter(function (i, el) {
      return selector(cheerio.load(el).root()).length > 0
    })
  }
}

export function reject (selector: string | Function) {
  if (typeof selector === 'string') {
    return (sel: Cheerio) => sel.not(selector)
  } else {
    return (sel: Cheerio) => sel.not(function (i, el) {
      return selector(cheerio.load(el).root()).length > 0
    })
  }
}

