import styled from 'styled-components';

export const Boxcontainer = styled.div`
  max-width: 900px;
  margin: 50px auto 0;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 21px;
      padding-left: 15px;
      margin-left: 15px;
      border-left: 1px solid #ddd;
    }
    h3 {
      font-size: 12px;
      padding-left: 15px;
      margin-left: 15px;
      border-left: 1px solid #ddd;
      color: #999;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
