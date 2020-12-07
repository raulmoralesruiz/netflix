import { SubscriptionI } from './subscription';
import { VisualI } from './visual';

export interface CustomerI {
  id?: number;
  username: string;
  name: string;
  surname?: string;
  address?: string;
  city?: string;
  dni: string;
  subscription?: SubscriptionI;
  visuals?: VisualI;
}
