import mongoose from 'mongoose';

const RepositorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    owner_avatar: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Repository', RepositorySchema);
