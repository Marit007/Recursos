/**
 * Module dependencies
 */
const React = require('react');
const expect = require('chai').expect;
const { shallow } = require('enzyme');

const Body = require('../src/body');
const Header = require('../src/components/header');
const FooterAccess = require('../src/components/footer-access');
const Footer = require('../src/components/footer');
const getConfiguration = require('../src/utils/get-config');

/**
 * Tests
 */
describe('Body Component with User', () => {
  const testProps = {
    platform: {
      id: 'ML',
      countryId: 'AR',
      siteId: 'MLA',
      domain: 'mercadolibre.com.ar',
    },
    device: {
      mobile: true,
    },
    user: {
      nickname: 'sayMyName',
    },
  };
  testProps.urls = getConfiguration(testProps.platform).urls;
  testProps.labels = getConfiguration(testProps.platform).urls;
  testProps.configSchema = getConfiguration(testProps.platform).configSchema;
  testProps.actualLocation = getConfiguration(testProps.platform).urls.baseDomain.link;

  it('Full <Body/> should have <Header/>, <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'full';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(1);
    expect(el.find(Footer)).to.have.length(1);
  });

  it('Lite <Body/> should have <Header/>, <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'lite';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(1);
    expect(el.find(Footer)).to.have.length(1);
  });

  it('Internal <Body/> should have <Header/> and no <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'internal';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(0);
    expect(el.find(Footer)).to.have.length(0);
  });

  it('<Body/> childs should have <Body/> props', () => {
    testProps.type = 'full';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header).props().user.nickname).to.equal(testProps.user.nickname);
    expect(el.find(Header).props().platform.id).to.equal(testProps.platform.id);
    expect(el.find(FooterAccess).props().user.nickname).to.equal(testProps.user.nickname);
    expect(el.find(FooterAccess).props().platform.id).to.equal(testProps.platform.id);
    expect(el.find(Footer).props().user.nickname).to.equal(testProps.user.nickname);
    expect(el.find(Footer).props().platform.id).to.equal(testProps.platform.id);
  });
});

describe('Body Component without User', () => {
  const testProps = {
    platform: {
      id: 'ML',
      countryId: 'AR',
      siteId: 'MLA',
      domain: 'mercadolibre.com.ar',
    },
    device: {
      mobile: true,
    },
  };
  testProps.urls = getConfiguration(testProps.platform).urls;
  testProps.labels = getConfiguration(testProps.platform).urls;
  testProps.configSchema = getConfiguration(testProps.platform).configSchema;
  testProps.actualLocation = getConfiguration(testProps.platform).urls.baseDomain.link;

  it('Full <Body/> should have <Header/>, <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'full';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(1);
    expect(el.find(Footer)).to.have.length(1);
  });

  it('Lite <Body/> should have <Header/>, <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'lite';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(1);
    expect(el.find(Footer)).to.have.length(1);
  });

  it('Internal <Body/> should have <Header/> and no <FooterAccess/> and <Footer/>', () => {
    testProps.type = 'internal';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header)).to.have.length(1);
    expect(el.find(FooterAccess)).to.have.length(0);
    expect(el.find(Footer)).to.have.length(0);
  });

  it('<Body/> childs should have <Body/> props', () => {
    testProps.type = 'full';
    const el = shallow(<Body {...testProps}/>);
    expect(el.find(Header).props().platform.id).to.equal(testProps.platform.id);
    expect(el.find(FooterAccess).props().platform.id).to.equal(testProps.platform.id);
    expect(el.find(Footer).props().platform.id).to.equal(testProps.platform.id);
  });
});
