const chai = require('chai');
const path = require('path');

const should = chai.should();
const expect = chai.expect;

const configLoader = require(path.join('..', 'index.js'))

describe("reading config from defaults", function() {
  let config;
  before(() => {
    config = configLoader({ home_dir: path.join(__dirname, 'mock_configs') })
  })

  it("read the default values for certain keys in defaults", function() {
    expect(config.get('mock_key')).to.eql('mock_value')
  })
})

describe("api tests", function() {

})
