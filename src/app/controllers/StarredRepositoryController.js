import axios from 'axios';

class StarredRepositoryController {
  async index(req, res) {
    const user = 'ThiagoKienbaum';
    const url = `https://api.github.com/users/${user}/starred`;

    const starredRepositories = await axios.get(url);

    const repositoryData = starredRepositories.data.map(reporsitory => {
      return [
        {
          id: reporsitory.id,
          name: reporsitory.name,
          description: reporsitory.description,
          htmlUrl: reporsitory.html_url,
        },
      ];
    });

    return res.json(repositoryData);
  }
}

export default new StarredRepositoryController();
