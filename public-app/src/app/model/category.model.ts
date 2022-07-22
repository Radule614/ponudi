export interface Category {
  name:       string;
  path:       string;
  icon?:      any;
  children?:  Category[];
}