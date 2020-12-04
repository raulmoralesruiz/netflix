import { ProductI } from './product';

export interface VisualI {
  idVisual?: number;
  inicio: string;
  fin: string;
  producto?: ProductI;
  idCustomer?: number;
}
