import { channelCollection } from '../services/firebase';

export const addQuestion = question => channelCollection.add(question);

export const addTA = TA => channelCollection.update({
  person: TA
})
