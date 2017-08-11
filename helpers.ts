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
