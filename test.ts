import * as mocha from 'mocha'
import { expect } from 'chai'

import * as fs from 'fs'
import scrape from './scraper'

describe('something', () => {
  it('does stuff', () => {
    const source = fs.readFileSync('./fixtures/chapter1.html')
    const schema = '.col-csm-6 h4'

    const result = scrape(source, schema)

    expect(result).to.equal('Chapter 1.04 RCW')
  })
})