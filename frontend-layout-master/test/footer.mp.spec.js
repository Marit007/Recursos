/**
 * Module dependencies
 */
const React = require('react');
const expect = require('chai').expect;
const { shallow } = require('enzyme');
const FooterMercadopago = require('../src/components/footer/footer.mp.js');

describe('Footer MP Component', () => {
  const testProps = {
    labels: {
      companyName: 'test',
    },
    configSchema: {
      footer: {
        navigation: ['helpMain', 'commercial', 'tyc', 'developers', 'investor'],
        social: ['facebook', 'twitter', 'linkedin', 'youtube'],
      },
    },
    urls: {
      helpMain: {
        link: 'http://test.mercadolibre.com',
        name: 'helpMain',
      },
      commercial: {
        link: 'http://test.mercadolibre.com',
        name: 'commercial',
      },
      tyc: {
        link: 'http://test.mercadolibre.com',
        name: 'tyc',
      },
      developers: {
        link: 'http://test.mercadolibre.com',
        name: 'developers',
      },
      investor: {
        link: 'http://test.mercadolibre.com',
        name: 'investor',
      },
      facebook: {
        link: 'http://test.mercadolibre.com',
        name: 'facebook',
      },
      twitter: {
        link: 'http://test.mercadolibre.com',
        name: 'twitter',
      },
      linkedin: {
        link: 'http://test.mercadolibre.com',
        name: 'linkedin',
      },
      youtube: {
        link: 'http://test.mercadolibre.com',
        name: 'youtube',
      },
    },
  };

  it('should contain a copyright with the current year and the company name', () => {
    const wrapper = shallow(
      <FooterMercadopago
        labels={testProps.labels}
        urls={testProps.urls}
        configSchema={testProps.configSchema}
      />);

    expect(wrapper.find('.nav-footer-copyright')).to.have.length(1);
    expect(wrapper.find('.nav-footer-copyright').text())
      .to.equal(`Copyright © ${new Date().getFullYear()} ${testProps.labels.companyName}`);
  });

  it('should render three links', () => {
    const wrapper = shallow(
      <FooterMercadopago
        labels={testProps.labels}
        urls={testProps.urls}
        configSchema={testProps.configSchema}
      />);

    expect(wrapper.find('.nav-footer-navigation')).to.have.length(1);
    expect(wrapper.find('a')).to.have.length(9);
  });

  it('should be empty without links', () => {
    testProps.urls = {};

    const wrapper = shallow(
      <FooterMercadopago
        labels={testProps.labels}
        urls={testProps.urls}
        configSchema={testProps.configSchema}
      />);

    expect(wrapper.find('a')).to.have.length(0);
  });
});
