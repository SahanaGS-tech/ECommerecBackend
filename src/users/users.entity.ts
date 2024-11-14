import mongoose from 'mongoose';
import { usersSchema } from './users.schema';

export const Users = mongoose.model('users', usersSchema);
