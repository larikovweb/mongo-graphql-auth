import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f5f5f5;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  max-width: 32rem;
  width: 100%;
  min-height: 18rem;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
