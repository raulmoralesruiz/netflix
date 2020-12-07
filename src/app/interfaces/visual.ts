import { ProductI } from './product';

export interface VisualI {
  idVisual?: number;
  start: string;
  end: string;
  product?: ProductI;
  idCustomer?: number;
}
