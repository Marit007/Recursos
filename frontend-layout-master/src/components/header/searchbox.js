const React = require('react');
const Script = require('frontend-script');
const Head = require('react-declarative-head');

const SearchBox = (props) => {
  const { platform, device, user, urls, category, layoutType, searchFocus } = props;
  const searchEndpoint = `${urls.listing.link}/$query`;
  const siteDomain = urls.mainDomain.link;
  const categoryEndpoint = category && category.permalink ? category.permalink : null;
  const isPO = props.platform.countryId === 'BR' || props.platform.countryId === 'PT';
  const isPlus = layoutType.indexOf('plus') > -1;
  const version = isPlus ? '2.0.1' : '1.0.7';

  let placeholder = null;
  if (device.mobile) {
    placeholder = isPO ? 'Estou buscando...' : 'Estoy buscando...';
  } else if (isPlus) {
    placeholder = isPO ? 'Buscar produtos, marcas e muito mais...' : 'Buscar productos, marcas y más...';
  }

  return (
    <form className="nav-search"
          action={`https://www.${props.platform.domain}/jm/search`}
          method="GET" role="search">
      <input type="text" className="nav-search-input" name="as_word" placeholder={placeholder} maxLength="120"
             data-autofocus={searchFocus} tabIndex="2" />
      { platform.id === 'ML' && <button className="nav-search-clear-btn" type="button" title="Limpiar" /> }
      { platform.id === 'ML' && <button className="nav-search-close-btn" type="button" title="Cerrar" /> }
      { category && (<p id="mlCategory" className="nav-category" title={category.name}>
        <input type="checkbox" id="categorySearch" name="as_categ_id" value={category.id} />
        <label htmlFor="categorySearch">{category.name}</label>
      </p>)
      }
      <button type="submit" className="nav-search-btn" tabIndex="3">
        <i className="nav-icon-search"><span>Buscar</span></i>
      </button>
      <Head>
        {category && (<style>{`
/* Category checkbox
---------------------------------------------------------------*/
.nav-search .nav-category {
    background-color: #fff;
    color: #666666;
    line-height: 20px;
    height: 24px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55%;
    padding: 2px 10px;
    position: absolute;
    right: 50px;
    top: 15px;
    text-align: right;
}
.nav-search .nav-category:hover .nav-label-small {
    width: initial;
}
.nav-search .nav-category label {
    -webkit-user-select: none;
}
.nav-search .nav-category .nav-label-small {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
    width: 58px;
}
.nav-search .nav-category input[type=checkbox] {
    border: 1px solid #CCC;
    background: 0;
    box-shadow: none;
    display: inline-block;
    margin: 2px 9px 0 0;
    height: 14px;
    padding: 0;
    vertical-align: top;
    width: 14px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.nav-search .nav-category input[type=checkbox]:focus {
    outline: 1px dotted #9a9a9a;
}
@media (max-width: 768px) {
    .nav-search .nav-category {
        display: none;
    }
}
      `}</style>)}
      </Head>
      <Script src={`https://http2.mlstatic.com/ui/searchbox/${version}/index.js`}>{
        `
        new Searchbox('.nav-search-input', {
        platformId: '${platform.id}',
        siteId: '${platform.siteId}',
        siteDomain: '${siteDomain}',
        limit: 6,
        searchEndpoint: '${searchEndpoint}',
        categoryEndpoint: '${categoryEndpoint}',
        categoryCheckbox: document.getElementById('categorySearch'),
        loggedIn: ${!!user}
      });

      (function (doc) {
            'use strict';

            var header = doc.querySelector('.nav-header'),
                searchInput = doc.querySelector('.nav-search-input'),
                searchForm = doc.querySelector('.nav-search'),
                menuSwitch = document.getElementById('nav-header-menu-switch'),
                clearBtn = doc.querySelector('.nav-search-clear-btn'),
                searchInputHasFocus = false,
                searchInputFocusTimer;

            function checkInputText() {
                clearTimeout(searchInputFocusTimer);

                searchInputFocusTimer = setTimeout(function() {
                    searchForm.classList[searchInput.value.length && searchInputHasFocus ? 'add' : 'remove']('nav-search--has-text');
                }, 100);
            }

            searchInput.addEventListener('focus', function() {
                header.classList.add('nav-header-has-search-active');
                header.classList.remove('nav-header--is-leave');
                menuSwitch.checked = false;
                searchInputHasFocus = true;
                checkInputText();

                setTimeout(function() {
                    header.classList.add('nav-header--is-enter');
                }, 1);
            });

            searchInput.addEventListener('blur', function() {
                header.classList.remove('nav-header--is-enter');
                header.classList.add('nav-header--is-leave');
                searchInputHasFocus = false;
                checkInputText();
                setTimeout(function() {
                    if (!searchInputHasFocus) {
                        header.classList.remove('nav-header-has-search-active');
                    }
                }, 100);
            });


            searchInput.addEventListener('input', checkInputText);

            clearBtn && clearBtn.addEventListener('mousedown', function(e) {
                e.preventDefault();

                searchInput.value = '';
                checkInputText();

                setTimeout(function(){
                    searchInput.focus();
                }, 50);
            }, false);
        }(document));

`}
      </Script>
    </form>
  );
};

module.exports = SearchBox;
