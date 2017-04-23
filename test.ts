import * as mocha from 'mocha'
import { expect } from 'chai'

import * as fs from 'fs'
import scrape from './scraper'
import { text, attr } from './scraper'

describe('scrape', () => {
  const source = fs.readFileSync('./fixtures/chapter1.html')

  it('scrapes from a given schema', () => {
    const schema = '.col-csm-6 h4'
    const result = scrape(source, schema)

    expect(result.text()).to.equal('Chapter 1.04 RCW')
  })

  it('finalizes results') // TODO: run text if element is a selection

  context('when schema is an array', () => {
    it('performs a pipeline of transformations', () => {
      const schema = ['#ctl00_ContentPlaceHolder1_pnlListing', 'a']
      const result = scrape(source, schema)

      expect(result.text()).to.equal('Chapter Listing')
    })
  })

  context('when schema is an object', () => {
    it('yields an object with the given shape', () => {
      const schema = { title: '.col-csm-6 h4' }
      const result = scrape(source, schema)

      expect(result).to.have.property('title')
      expect(result.title.text()).to.equal('Chapter 1.04 RCW')
    })
  })

  context('helpers', () => {
    describe('text', () => {
      it('extracts text from a result', () => {
        const schema = ['.col-csm-6 h4', text()]
        const result = scrape(source, schema)

        expect(result).to.equal('Chapter 1.04 RCW')
      })
    })

    describe('attr', () => {
      it.only('extracts attributes from a result', () => {
        const schema = ['#divChapterDispoLinks a', attr('href')]
        const result = scrape(source, schema)

        expect(result).to.equal('http://app.leg.wa.gov/RCW/default.aspx?cite=1.04')
      })
    })
  })
})