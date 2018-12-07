const chai = require('chai');
const path = require('path');

const should = chai.should();
const expect = chai.expect;

const configLoader = require(path.join('..', 'index.js'))

describe("reading config from defaults", function() {
  let config;
  before(() => {
    process.argv.push('--another_key')
    process.argv.push('value_from_arg')
    process.env['SOME_KEY'] = "value_set_from_env"
    process.env['OBJECT__KEY_3'] = "value_set_from_env"
    process.env['ANOTHER_KEY'] = "value_set_from_env"
    config = configLoader({ home_dir: path.join(__dirname, 'mock_configs') })
  })

  it("read the default values for certain keys in defaults", function() {
    expect(config.get('mock_key')).to.eql('mock_value')
  })

  it("should read and overwrite defaults from config file", function() {
    expect(config.get('overwritten_in_config')).to.eql('overwritten')
  })

  it("should read and overwrite defaults from secrets", function() {
    expect(config.get('a_secret')).to.eql('secret_value')
  })

  it("should overwrite configs if an environment variable is set to that key", function() {
    expect(config.get('some_key')).to.eql('value_set_from_env')
  })

  it("should read configs in sub-objects", function() {
    expect(config.get('object:key_1')).to.eql('value_set_from_defaults')
  })

  it("should overwrite configs in sub-objects", function() {
    expect(config.get('object:key_2')).to.eql('value_set_from_conf')
  })

  it("should overwrite configs in sub-objects using environment variables", function() {
    expect(config.get('object:key_3')).to.eql('value_set_from_env')
  })

  it("should overwrite everything if value comes in from arguments", function() {
    expect(config.get('another_key')).to.eql('value_from_arg')
  })
})

describe("api tests", function() {

})
