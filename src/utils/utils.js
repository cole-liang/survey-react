import _ from "lodash";

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
  removeDuplicate,
  paginate
};
