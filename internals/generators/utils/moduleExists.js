/**
 * moduleExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
// const pageComponents = fs.readdirSync(
//   path.join(__dirname, '../../../app/components'),
// );
const modules = fs.readdirSync(
  path.join(__dirname, '../../../app/modules'),
);
// const components = pageComponents.concat(pageContainers);

function moduleExists(comp) {
  return modules.indexOf(comp) === 0;
}

module.exports = moduleExists;
