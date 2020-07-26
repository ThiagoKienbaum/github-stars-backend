import Repository from '../schemas/Repository';

class TagController {
  async store(req, res) {
    const { newTag } = req.body;

    const starredRepository = await Repository.findOneAndUpdate(
      {
        user_id: req.userId,
        id: req.params.id,
      },
      { $addToSet: { tags: newTag } },
      { new: true }
    );

    return res.json(starredRepository);
  }

  async show(req, res) {
    const { tagToSearch } = req.body;
    const starredRepository = await Repository.find({
      user_id: req.userId,
      tags: new RegExp(tagToSearch, 'i'),
    });

    if (starredRepository.length === 0) {
      return res.status(400).json({ error: 'Tag not found' });
    }
    return res.json(starredRepository);
  }

  async update(req, res) {
    const { updatedTag } = req.body;

    const starredRepository = await Repository.findOneAndUpdate(
      {
        user_id: req.userId,
        id: req.params.id,
        tags: req.params.tag,
      },
      { $set: { 'tags.$': updatedTag } },
      { new: true }
    );

    return res.json(starredRepository);
  }

  async delete(req, res) {
    const starredRepository = await Repository.findOneAndUpdate(
      {
        user_id: req.userId,
        id: req.params.id,
        tags: req.params.tag,
      },
      { $pull: { tags: { $in: req.params.tag } } },
      { new: true }
    );

    return res.json(starredRepository);
  }
}

export default new TagController();
