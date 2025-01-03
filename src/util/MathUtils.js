export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function clampRange(num, range) {
  return clamp(num, -range / 2, range / 2);
}

export function normalize(val, min, max) {
  return (val - min) / (max - min);
}

export function RandomInRange(val) {
  return Math.random() * val;
}

export function RandomInNegativeRange(val) {
  return -val + RandomInRange(val) * 2;
}

export class UniqueRandomArray {
  constructor(size) {
    if (size === undefined) {
      this.set = new Set();
      return;
    }
    const set = new Set();
    while (set.size !== size) {
      set.add(Math.random());
    }
    this.set = set;
  }
}
