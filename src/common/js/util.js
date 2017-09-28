function getRandomInt(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min));
}

export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = arr[i];
    _arr[i] = arr[j];
    _arr[j] = t;
  }
  return _arr;
};

export function debunce(func, delay) {
  let Timer;
  return function (...args) {
    if (Timer) {
      clearTimeout(Timer);
    }
    Timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
