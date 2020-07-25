import axios from 'axios';
import * as Yup from 'yup';
import User from '../models/User';
import Repository from '../schemas/Repository';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      github_id: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, github_id, email } = await User.create(req.body);

    const url = `https://api.github.com/users/${github_id}/starred`;

    const starredRepositories = await axios.get(url);

    const repositoryData = starredRepositories.data.map(repository => ({
      id: repository.id,
      user_id: id,
      name: repository.name,
      description: repository.description,
      url: repository.html_url,
      owner_avatar: repository.owner.avatar_url,
      tags: [],
    }));

    await Repository.insertMany(repositoryData);

    return res.json({
      id,
      name,
      github_id,
      email,
      starredRepositories: repositoryData,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      github_id: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, github_id } = await user.update(req.body);

    return res.json({
      id,
      name,
      github_id,
      email,
    });
  }
}

export default new UserController();
