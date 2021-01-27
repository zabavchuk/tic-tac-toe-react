export const createRange = ({ start = 0, end = 10, step = 1, length = 0 } = {}) => (
  Array.from({ length: length || ((end - start) / step + 1) })
    .fill(start)
    .map((item, index) => (item + index * step))
)