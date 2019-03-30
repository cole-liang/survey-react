import _ from "lodash";

function compareStrings(a, b) {
  let str1 = a.toUpperCase();
  let str2 = b.toUpperCase();
  if (str1 < str2) {
    return -1;
  }
  if (str1 > str2) {
    return 1;
  }
  return 0;
}

function removeDuplicate(array) {
  return _.uniq(array);
}

function paginate(items, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

export default {
  compareStrings,
  removeDuplicate,
  paginate
};
