import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Estado,
  Label,
  Select,
  TagLabel,
  LoadingSpinner,
  Paginator,
  BtnAnterior,
  BtnProximo,
} from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ repository: PropTypes.string }),
    }).isRequired,
  };

  state = {
    page: 1,
    per_page: 5,
    total_page: 0,
    repoName: null,
    estado: 'open',
    repository: {},
    issues: [],
    loading: true,
    loadingIssues: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page, per_page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);
    this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          page,
          per_page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      total_page: repository.data.open_issues,
      loading: false,
    });
    // console.log(repository, issues);
  }

  handleEstado = async e => {
    this.setState({ page: 1 /** Reseta a página */ });
    const { per_page, repoName } = this.state;
    const estado = e.target.value;
    await this.loadIssues(repoName, estado, 1, per_page);
  };

  previousPage = async _page => {
    if (_page <= 1) return;
    const previousPage = _page - 1;
    this.setState({ page: previousPage });

    const { repoName, estado, per_page } = this.state;
    await this.loadIssues(repoName, estado, previousPage, per_page);
  };

  nextPage = async _page => {
    const nextPage = _page + 1;
    this.setState({ page: nextPage });

    const { repoName, estado, per_page } = this.state;
    await this.loadIssues(repoName, estado, nextPage, per_page);
  };

  async loadIssues(repoName, estado, page, per_page) {
    this.setState({
      loadingIssues: true,
    });

    const res = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: estado,
        page,
        per_page,
      },
    });

    // console.log(res.data);

    this.setState({
      issues: res.data,
      estado: estado,
      loadingIssues: false,
    });
  }

  async componentWillUpdate(_, prevState) {
    // console.log(this.state.estado, prevState.estado);
    // if (this.state.estado !== prevState.estado) {
    //   const res = await api.get(`/repos/${this.state.repoName}/issues`, {
    //     params: {
    //       state: this.state.estado,
    //       per_page: 5,
    //     },
    //   });
    //   this.setState({
    //     issues: res.data,
    //   });
    // }
  }

  render() {
    const {
      repository,
      issues,
      loading,
      estado,
      loadingIssues,
      page,
      per_page,
      total_page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Estado>
          <Label>Filtro Issues: </Label>
          <Select value={estado} onChange={this.handleEstado}>
            <option value="all">Todas</option>
            <option value="open">Aberta</option>
            <option value="closed">Fechada</option>
          </Select>
        </Estado>

        <IssueList>
          <Paginator>
            <BtnAnterior
              disabled={page === 1}
              onClick={() => this.previousPage(page)}
            >
              Anterior
            </BtnAnterior>
            {page}/{total_page}
            <BtnProximo
              disabled={page >= total_page / per_page}
              onClick={() => this.nextPage(page)}
            >
              Proximo
            </BtnProximo>
          </Paginator>
          {loadingIssues ? (
            <LoadingSpinner loading={String(loadingIssues)}>
              <FaSpinner color="#333" size={40} />
            </LoadingSpinner>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt="{issue.user.login}" />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <TagLabel color={label.color} key={String(label.id)}>
                        {label.name}
                      </TagLabel>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
