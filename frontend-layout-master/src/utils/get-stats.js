/**
 * Get stats performance
 */
function getStats(page) {
  const time = process.hrtime();
  return function end() {
    const diff = process.hrtime(time);
    const duration = diff[0] + (diff[1] / 1000000); // in milliseconds
    return { page, duration: duration.toFixed(3) };
  };
}

/**
 * Expose getStats
 */
module.exports = getStats;
