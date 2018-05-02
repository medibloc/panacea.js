import { expect } from 'chai';
import {
  CONTENT_TYPE_URLENCODED,
  DEFAULT_TIMEOUT,
  GET,
  POST,
} from 'client/constants';
import config from 'client/config';

describe('config', () => {
  const defaultGetConfig = {
    baseURL: 'http://localhost:10000',
    method: GET,
    path: '/v1/path/of/api/get',
    payload: {
      firstParam: 1,
      secondParam: 2,
    },
  };

  const defaultPostConfig = {
    baseURL: 'http://localhost:10000',
    method: POST,
    path: '/v1/path/of/api/post',
    payload: {
      firstParam: 1,
      secondParam: 2,
    },
  };

  const newBaseURL = 'http://localhost:9999';

  describe('#buildConfig', () => {
    describe('returned object', () => {
      const getConfig = config.buildConfig(defaultGetConfig);

      it('should be a object', () => {
        return expect(getConfig)
          .to.be.an('object');
      });

      it('should have a timeout field as default', () => {
        return expect(getConfig)
          .to.have.property('timeout')
          .and.equal(DEFAULT_TIMEOUT);
      });

      it('should have a validateStatus function', () => {
        return expect(getConfig)
          .to.have.property('validateStatus')
          .and.to.be.an('function');
      });

      it('should have the correct baseURL field', () => {
        return expect(getConfig)
          .to.have.property('baseURL')
          .and.equal(defaultGetConfig.baseURL);
      });

      it('should have the correct method field', () => {
        return expect(getConfig)
          .to.have.property('method')
          .and.equal(defaultGetConfig.method);
      });

      it('should have the correct url field', () => {
        return expect(getConfig)
          .to.have.property('url')
          .and.equal(defaultGetConfig.path);
      });
    });

    describe('get method type', () => {
      const getConfig = config.buildConfig(defaultGetConfig);

      it('should have the correct params object', () => {
        return expect(getConfig)
          .to.have.property('params')
          .and.to.be.a('object')
          .and.eql(defaultGetConfig.payload);
      });
    });

    describe('post method type', () => {
      const postConfig = config.buildConfig(defaultPostConfig);

      it('should have the correct data object', () => {
        return expect(postConfig)
          .to.have.property('data')
          .and.to.be.an('object')
          .and.eql(defaultPostConfig.payload);
      });

      it('should have the correct headers object', () => {
        return expect(postConfig)
          .to.have.property('headers')
          .and.to.be.an('object')
          .and.eql(CONTENT_TYPE_URLENCODED);
      });
    });
  });

  describe('#setBaseURL', () => {
    describe('returned object', () => {
      const oldConfig = config.buildConfig(defaultGetConfig);
      const newConfig = config.setBaseURL(oldConfig, newBaseURL);

      it('should be a object', () => {
        return expect(newConfig)
          .to.be.an('object');
      });

      it('should have correct baseURL field', () => {
        return expect(newConfig)
          .to.have.property('baseURL')
          .and.equal(newBaseURL);
      });
    });
  });
});