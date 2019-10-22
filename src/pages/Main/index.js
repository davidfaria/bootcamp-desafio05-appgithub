import React, { Component } from 'react';
import { FaPlus, FaGithubAlt, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Alert } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMsg: '',
  };

  // Carrgegar os dados do localStorage
  componentDidMount() {
    this.setState({
      repositories: JSON.parse(localStorage.getItem('repositories')) || [],
    });
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories)
      localStorage.setItem('repositories', JSON.stringify(repositories));
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo } = this.state;

    try {
      this.state.repositories.find(repo => {
        if (repo.name === newRepo) throw new Error('Repositório duplicado');
      });

      const res = await api.get(`/repos/${newRepo}`);

      const data = {
        name: res.data.full_name,
      };

      this.setState({
        repositories: [...this.state.repositories, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      let { message } = err;

      if (err.response && err.response.status === 404) {
        message = 'Repositório não encontrado..';
      }

      this.setState({
        error: true,
        errorMsg: message,
      });
    } finally {
      this.setState({ loading: false, newRepo: '' });
    }

    // console.log(this.state);
  };

  render() {
    const { newRepo, repositories, loading, error, errorMsg } = this.state;

    // console.log(loading);

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form error={error} onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton disabled={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {error && <Alert>{errorMsg}</Alert>}

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
export default Main;
