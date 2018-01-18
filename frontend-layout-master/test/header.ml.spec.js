/**
 * Module dependencies
 */
const React = require('react');
const expect = require('chai').expect;
const { shallow } = require('enzyme');
const getConfiguration = require('../src/utils/get-config');
const Header = require('../src/components/header/header.ml');
const UserMenu = require('../src/components/header/user-menu');
const LoggedUserMenu = require('../src/components/header/user-menu/logged-menu');
const GuestUserMenu = require('../src/components/header/user-menu/guest-menu');

describe('Header ML Component', () => {
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
  testProps.configSchema = getConfiguration(testProps.platform).configSchema;
  testProps.labels = getConfiguration(testProps.platform).labels;

  it('<Header/> should have <UserMenu/> with <LoggedUserMenu/> with user', () => {
    const el = shallow(<Header {...testProps}/>);
    const elMenu = shallow(<UserMenu {...testProps} i18n={testProps.configSchema.i18n}/>);
    expect(el.find(UserMenu)).to.have.length(1);
    expect(elMenu.find(LoggedUserMenu)).to.have.length(1);
  });

  it('<Header/> should have <UserMenu/> with <GuestUserMenu/> without user', () => {
    testProps.user = null;
    const el = shallow(<Header {...testProps}/>);
    const elMenu = shallow(<UserMenu {...testProps} i18n={testProps.configSchema.i18n}/>);
    expect(el.find(UserMenu)).to.have.length(1);
    expect(elMenu.find(GuestUserMenu)).to.have.length(1);
  });
});
