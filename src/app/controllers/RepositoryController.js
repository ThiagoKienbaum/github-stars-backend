import Repository from '../schemas/Repository';

class RepositoryController {
  async index(req, res) {
    const starredRepositories = await Repository.find({
      user_id: req.userId,
    });

    return res.json({ starredRepositories });
  }
}

export default new RepositoryController();
