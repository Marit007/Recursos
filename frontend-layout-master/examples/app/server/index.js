/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const config = require('nordic/config');
const { layoutMiddleware } = require('../../../');

/**
 * Routers
 */
const demoRoute = require('../pages/demo');

/**
 * Use layout middleware
 */
router.use(layoutMiddleware());

/**
 * Redirect
 */
router.get('/', (req, res) => res.redirect(`${config.ragnar.basePath}demo`));

/**
 * Mount routers
 */
router.use('/demo', demoRoute);

/**
 * Expose router
 */
module.exports = router;
