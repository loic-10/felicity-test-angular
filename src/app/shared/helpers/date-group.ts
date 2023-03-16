export const groupByDay = (value: any, index: any, array: any) => {
  let d: any = new Date(value);
  d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
  return { key: d, value };
};

export const groupByWeek = (value: any, index: any, array: any) => {
  let byWeek: any = {};
  let d: any = new Date(value['date']);
  d = Math.floor(d.getTime() / (1000 * 60 * 60 * 24 * 7));
  byWeek[d] = byWeek[d] || [];
  byWeek[d].push(value);
  return byWeek;
};

export const groupByMonth = (value: any, index: any, array: any) => {
  let byMonth: any = {};
  let d: any = new Date(value['date']);
  d = (d.getFullYear() - 1970) * 12 + d.getMonth();
  byMonth[d] = byMonth[d] || [];
  byMonth[d].push(value);
  return byMonth;
};

// Accepts the array and key
export const groupBy = (array: any, key: any) => {
  // Return the end result
  return array.reduce((result: any, currentValue: any) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
