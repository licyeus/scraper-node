import * as mocha from 'mocha'
import { expect } from 'chai'

import * as fs from 'fs'
import scrape from './scraper'
import { text, attr, map, contents, has } from './scraper'

describe('scrape', () => {
  const source = fs.readFileSync('./fixtures/chapter1.html', 'utf8')

  it('scrapes from a given schema', () => {
    const schema = '.col-csm-6 h4'
    const result = scrape(source, schema)

    expect(result.text()).to.equal('Chapter 1.04 RCW')
  })

  it('finalizes results') // TODO: run text if element is a singular selection

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

})

describe('map', () => {
  it('maps a schema to a list of elements', () => {
    const schema = ['li', map({ foo: ['span', text()] })]
    const source = '<ul><li><span>some</span> but not me</li><li><span>elements!</span>'
    const result = scrape(source, schema)

    expect(result).to.deep.equal([ { foo: 'some' }, { foo: 'elements!' }])
  })
})
