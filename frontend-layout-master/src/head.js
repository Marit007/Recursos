const { platformStyles, cdnBase, cdnHtml5shiv } = require('./utils/get-styles');
const { noScriptRedirect } = require('./utils/get-no-script');

class Head {
  /**
   * Create the style or link tag for layout styles
   */
  getLayoutStyles(props) {
    let layoutStyle = '';

    // Critical Path: inline styles (not from cdn)
    if (props.criticalPath || props.embedCss) {
      if (props.isMobile) {
        if (props.isInternal && props.styles.internalCss !== null) {
          layoutStyle += `<style>${props.styles.internalCss}</style>`;
        }
        layoutStyle += `<style>${props.styles.smallCss}</style>`;
      }
      layoutStyle += `<style>${props.styles.responsiveCss}</style>`;

      if (props.loadLargeCss) {
        // In case it's IE version less than 9, add navigation large because
        // it contains both small and large (small is the base for large).
        layoutStyle += `<style>${props.styles.largeCss}</style>`;
      }

      return layoutStyle;
    }

    // Inline styles (from cdn)
    layoutStyle += `<link rel="stylesheet" type="text/css" href="${props.styles[props.isInternal && props.styles.internalCss !== null ? 'internalCdn' : 'cdn']}" />`;

    // In case it's IE version less than 9, add navigation large because
    // it contains both small and large (small is the base for large).
    if (props.loadLargeCss) {
      layoutStyle += `<link rel="stylesheet" type="text/css" href="${props.styles.cdnLarge}" />`;
    }

    return layoutStyle;
  }

  getStyles(bundledStyles) {
    return bundledStyles && bundledStyles.constructor === Array ?
      bundledStyles.reduce((acc, scr) => `${acc}<link rel="stylesheet" type="text/css" href="${scr}" />`, '') : '';
  }

  getInlineStyles(inlineCss) {
    return inlineCss && inlineCss.constructor === Array ?
      inlineCss.reduce((acc, scr) => `<style>${scr}</style>`, '') : '';
  }

  render(props, criticalPath) {
    const platformId = props.platform.id;
    const styles = platformStyles(platformId, props.type);
    const platformName = styles.id;
    const uiNavigationBase = `${cdnBase}/${platformName}`;
    // optional if you want to send your css before the application render
    const externalStyles = this.getStyles(props.externalCss);
    // optional if you want to send your inline css before the application render
    const inlineStyles = this.getInlineStyles(props.inlineCss);
    // In case it's IE version less than or equal 9 load html5shiv
    const loadHtml5shiv = props.browser.name === 'ie' && props.browser.version <= 9;
    // In case it's IE version less than 9 load ui-navigation large
    const loadLargeCss = props.browser.name === 'ie' && props.browser.version < 9;
    // get layout link or style inline tag (if criical path)
    const layoutStyles = this.getLayoutStyles({
      platformId,
      criticalPath,
      embedCss: props.embedCss || false,
      isMobile: props.device && props.device.mobile,
      isInternal: props.type && props.type === 'internal',
      loadLargeCss,
      styles,
    });

    // in case of send inline css add a prefetch link tag with the css resource
    const preLoadCss = criticalPath ? styles.cdn : null;
    const isLowEnd = props.device && props.device.lowEnd;
    const preLoadCssTag = preLoadCss && !isLowEnd ? `<script>window.addEventListener('load',function(){var d="${preLoadCss}";if(d!=="null"){var l=document.createElement('link');l.href = d;l.rel="prefetch";document.head.appendChild(l);}});</script>` : '';
    // in case of using webpack and need hmr or chunk loading add proper script tags
    const scriptTag = !isLowEnd && props.scripts && props.scripts.length > 0 ? `<script>window.addEventListener('load',function(){var s="${props.scripts}";if (s==='null'||s==='undefined')return;s=s.split(',');s.forEach(function(c){var t=document.createElement('script');t.src=c;t.async=false;t.defer=true;document.head.appendChild(t);})})</script>` : '';

    const noScriptRedirectMeta = noScriptRedirect({
      isLowEnd,
      platformId,
      baseDomain: props.urls.baseDomain,
      actualLocation: props.actualLocation,
    });

    return (`${noScriptRedirectMeta}
<meta charSet="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="HandheldFriendly" content="True"/>
<meta http-equiv="cleartype" content="on"/>
<link rel="shortcut icon" href="${uiNavigationBase}/favicon.ico" />
<link rel="apple-touch-icon" href="${uiNavigationBase}/60x60-precomposed.png" />
<link rel="apple-touch-icon" sizes="76x76" href="${uiNavigationBase}/76x76-precomposed.png" />
<link rel="apple-touch-icon" sizes="120x120" href="${uiNavigationBase}/120x120-precomposed.png" />
<link rel="apple-touch-icon" sizes="152x152" href="${uiNavigationBase}/152x152-precomposed.png" />
${loadHtml5shiv ? cdnHtml5shiv : ''}
${props.type !== 'hidden' ? layoutStyles : ''}${inlineStyles}${externalStyles}${preLoadCssTag}${scriptTag}`
    );
  }
}

module.exports = new Head();
