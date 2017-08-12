import * as mocha from 'mocha'
import { expect } from 'chai'

import * as fs from 'fs'
import scrape from './scraper'
import { text, attr, map, contents, has, find, children, filter, reject } from './scraper'

describe('helpers', () => {
  // each item in array is descriptor of operation and yields a selection
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

  describe('children', () => {
    it('selects children of the current selection', () => {
      const schema = ['#sel', children()]
      const source = '<div id="sel"><span>a child</span><div>another child</div></div><div><span>not me</span></div>'
      const result = scrape(source, schema)

      expect(result.length).to.equal(2)
    })
  })

  describe('filter', () => {
    const source = '<ul><li class="foo">find me</li><li class="bar">not me</li><li class="foo bar"><span>and me</span></li><ul>'

    it('filters a selection, returning elements that match the given selector', () => {
      const schema = ['li', filter('.foo')]
      const result = scrape(source, schema)

      expect(result.length).to.equal(2)
    })

    it('can be provided a selector fn', () => {
      const schema = ['li', filter(has('span'))]
      const result = scrape(source, schema)

      expect(result.length).to.equal(1)
    })
  })

  describe('reject', () => {
    const source = '<ul><li class="foo">find me</li><li class="bar">not me</li><li class="foo bar"><span>and me</span></li><ul>'

    it('filters a selection, returning elements that do not match the given selector', () => {
      const schema = ['li', reject('.foo')]
      const result = scrape(source, schema)

      expect(result.length).to.equal(1)
    })

    it('can be provided a selector fn', () => {
      const schema = ['li', reject(has('span'))]
      const result = scrape(source, schema)

      expect(result.length).to.equal(2)
    })
  })

  describe('is', () => {
    it('')
  })

  describe('join', () => {
    it('')
  })

  describe('until', () => {
    it('')
  })

  describe('contains', () => {
    it('')
  })

  describe('reduce', () => {
    it('')
  })

  describe('after', () => {
    it('')
  })

  describe('tap', () => {
    it('')
  })

  describe('split', () => {
    it('')
  })

  describe('inspect', () => {
    it('')
  })

})
