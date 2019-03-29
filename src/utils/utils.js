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

function selectDataByFilter(data, filters) {
  let selectedRecords = data;
  // console.log(filters);

  let hasFilter = false;
  for (let key in filters) {
    let attrs = filters[key];
    if (attrs.length !== 0) {
      hasFilter = true;
      let isInitial = true;
      let lastResult = selectedRecords;
      for (let value of attrs) {
        if (isInitial) {
          selectedRecords = selectedRecords.filter(
            record => _.get(record, key) === value
          );
          isInitial = false;
        } else
          selectedRecords = selectedRecords.concat(
            lastResult.filter(record => _.get(record, key) === value)
          );
      }
    }
  }

  if (!hasFilter) selectedRecords = data;

  // this.props.onSelectedData(selectedRecords);
  return selectedRecords;
}

export default {
  compareStrings,
  removeDuplicate,
  paginate,
  selectDataByFilter
};
