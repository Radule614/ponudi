export class Category {
  name:               string;
  id:                 string;
  icon?:              any;
  children:           Category[];
  additionalFields?:  string[];
}