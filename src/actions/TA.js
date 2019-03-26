import { taCollection } from '../services/firebase';

export const addTA = TA => taCollection.add(TA);