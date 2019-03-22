import { channelCollection } from '../services/firebase';

export const addQuestion = question => channelCollection.add(question);
