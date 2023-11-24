export default interface Page<T> {
  data: T[];
  current: number;
  total: number;
  size: number;
}
