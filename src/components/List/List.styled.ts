import styled from "styled-components";

export const Styled = styled.div`
  .list {
    /*   flex-basis: 290px; */
    /*     width: 290px;
    min-width: 290px; */
    height: 100%;
    overflow-y: auto;
    display: flex;
   /*  flex-direction: column; */
    gap: 20px;
    color: #17394d;
  }
  .list-inner {
    background-color: rgb(223 227 230 / 55%);
    padding: 15px;
    border-radius: 3px;
  }
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
  }

  .list-header-title {
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .list-header-title span {
    color: rgb(145, 145, 145);
  }

  .list-header-title-more {
    cursor: pointer;
    position: relative;
  }

  .list-dropdown {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    padding: 10px;
    width: 150px !important;
    cursor: default;
  }
  .list-dropdown p {
    border-bottom: 1px solid #f8f8f8;
    cursor: pointer;
  }

  .list-cards {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }

  .list-add-card {
    background-color: #fff;
    color: #000;
    border-radius: 10px;
    box-shadow: 1px 1px 0 1px rgba(0, 0, 0, 0.12);
    width: 100%;
    text-align: center;
  }
  .list-add-card-edit {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
  }
`;
