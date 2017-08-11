import * as mocha from 'mocha'
import { expect } from 'chai'

import * as fs from 'fs'
import scrape from './scraper'
import { text, attr, map, contents, has, find } from './scraper'

describe('helpers', () => {
  // each item in array is descriptor of operation and yields a selection
  // TODO: map, reduce, until, after, find, filter, reject, contains, attr, join, tap, split, inspect, text, children, is
  const source = fs.readFileSync('./fixtures/chapter1.html', 'utf8')

  describe('text', () => {
    it('extracts text from a result', () => {
      const schema = ['.col-csm-6 h4', text()]
      const result = scrape(source, schema)

      expect(result).to.equal('Chapter 1.04 RCW')
    })
  })

  describe('attr', () => {
    it('extracts attributes from a result', () => {
      const schema = ['#divChapterDispoLinks a', attr('href')]
      const result = scrape(source, schema)

      expect(result).to.equal('http://app.leg.wa.gov/RCW/default.aspx?cite=1.04')
    })
  })

  describe('contents', () => {
    it('returns a list of direct child elements and text nodes', () => {
      const schema = ['#foo', contents()]
      const source = '<div id="foo">text <span>bar</span> another</div>'
      const result = scrape(source, schema)

      expect(result.length).to.equal(3)
    })
  })

  describe('has', () => {
    it('returns nodes where selector has matching children', () => {
      const schema = ['span', has('a')]
      const source = '<div><span><a>me</a></span><span><a>and me</a></span><span>but not me</span></div>'
      const result = scrape(source, schema)

      expect(result.length).to.equal(2)
    })
  })

  describe('find', () => {
    it('returns nodes where selector matches', () => {
      const schema = [find('.findme')]
      const source = '<div><span class="findme">asdf</span><span>but not me</span><span class="findme alsome">qwerty</span>'
      const result = scrape(source, schema)

      expect(result.length).to.equal(2)
    })
  })

})
