export const shuffle = (arr) => {
  for (let idx = arr.length - 1; idx >= 0; idx--) {
    const rdm = Math.floor(Math.random() * idx);
    const curr = arr[idx];

    arr[idx] = arr[rdm];
    arr[rdm] = curr;
  }

  return arr;
};
