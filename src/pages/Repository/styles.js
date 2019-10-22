import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const TagLabel = styled.span`
  background-color: #${props => props.color};
  color: #000;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const Estado = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: bold;
`;
export const Select = styled.select`
  border: none;
  padding: 8px 16px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Paginator = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;
export const BtnAnterior = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  width: 150px;
  border: 1px solid #7159c1;
  padding: 8px 16px;
  color: #7159c1;
  background-color: #fff;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background-color: #7159c1;
  }

  &:disabled {
    color: #eee;
    background-color: #b9b9b9;
    border: 1px solid #eee;
    cursor: not-allowed;
  }
`;
export const BtnProximo = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  width: 150px;
  border: 1px solid #7159c1;
  padding: 8px 16px;
  color: #7159c1;
  background-color: #fff;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background-color: #7159c1;
  }

  &:disabled {
    color: #eee;
    background-color: #b9b9b9;
    border: 1px solid #eee;
    cursor: not-allowed;
  }
`;
