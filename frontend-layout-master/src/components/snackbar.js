const React = require('react');
const Script = require('frontend-script');

/*
    SnackbarWidget is an interface builder for the Snackbar common widget.

    This will use the layout event bus (freya), where it'll provide events to
    interact with the Snackbar, for example `freya.emit('snackbar:show', configuration)`.

    Read more about the widget here:
    https://github.com/mercadolibre/frontend-layout_widgets/tree/master/mercadolibre/packages/snackbar
*/

const Snackbar = () => (
  <Script src="https://http2.mlstatic.com/resources/frontend/statics/ml-widgets/snackbar/v1.0.0/snackbar.js">
    {`
      (function(win, freya) {
        if (win.SnackbarWidget && freya) {
          new SnackbarWidget({
            bus: freya,
          });
        }
      })(window, window.freya);
    `}
  </Script>
);

module.exports = Snackbar;
