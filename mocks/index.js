var fs = require('fs'),
    path = require('path');
/*
 * key values hash where key will be converted to a regex to match against paths and the value is the name of the file to be
 * served when that regex matchs.
 *
 * Behavior is undefined in the case of paths that match multiple keys. The first key seen (as returned by the javascript engine's iterator)
 * is the winner.
 */

module.exports = exports = {
    __dirname: __dirname,

    '/search.json\\?.*q=(.*)': function(product) {
      return fs.readFileSync(path.join(__dirname, 'search-result.json'));
    }
};
