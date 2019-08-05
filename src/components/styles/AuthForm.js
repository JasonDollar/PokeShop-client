import styled from 'styled-components'

const AuthForm = styled.div`

  background: linear-gradient(to bottom right, rgba(0,0,0,.7), rgba(0,0,0,.3));
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-position-x: 53%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  @media (min-height: 678px) {
    background: linear-gradient(to bottom right, rgba(0,0,0,.7), rgba(0,0,0,.3));
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 53%;
  }

  .form {
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    transform: translateY(-4rem);
    @media (max-width: 576px) {
    width: 80%;
    }
  }

  .form__name {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 4rem;
    @media (min-width: 576px) {
      font-size: 5rem;
    }
  }

  .inputGroup {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    
    position: relative;
    @media (min-width: 576px) {
      font-size: 3rem;
    }

    label {
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
    }

    input,
    textarea,
    .input {
      width: 30rem;
      max-width: 100%;
      padding: 1rem;
      border-radius: 5px;
      font-family: inherit;
      border: 1px solid ${props => props.theme.secondaryRed};
    }
    
  }
  .form__button {
    color: ${props => props.theme.fontColorWhite};
    background: ${props => props.theme.confirm};
    border: 1px solid #555;
    border-radius: 5px;
    padding: .5rem 1.6rem;
    font-size: 2rem;
    text-transform: uppercase;
    cursor: pointer;
    width: 100%;
  }
  .form__link--container {
    display: flex;
    flex-direction: column;
  }

  .form__link {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    padding-bottom: .3rem;
    color :${props => props.theme.colorGrey};
    text-decoration: none;
    text-align: center;
    border-bottom: 1px solid transparent; 
  }
  .form__link:hover {
    border-bottom: 1px solid ${props => props.theme.colorGrey};

    /* text-decoration: underline; */
  }
  .errorMessage {
    display: block;
    font-size: 2.2rem;
    margin: 1rem 0 0;
    color :${props => props.theme.primaryRed};
    text-align: center;
  }

  .testAccount {
    /* display: inline-block; */
    font-size: 2rem;
    cursor: pointer;
    margin-top: 1rem;
    background: none;
    border: none;
    color: black;
  }

  .previewButton {
    /* text-align: center; */
    color: ${props => props.theme.colorLightGrey};
    display: block;
    margin: 0 auto;
    padding: .2rem .5rem;
    font-size: 1.8rem;
    font-family: inherit;
    border: 1px solid transparent;
    background: none;
    cursor: pointer;
    transition: border .1s;
    &:hover {
      border-bottom: 1px solid ${props => props.theme.secondaryRed};
    }
  }

  .resetLink {
    width: 60%;
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: .2rem .5rem;
    font-size: 1.8rem;
    font-family: inherit;
    text-decoration: none;
    text-align: center;
    color: inherit;
    border: 1px solid transparent;
    transition: border .1s;
    @media (max-width: 405px) {
      width: 90%;
    }
    &:hover {
      border-bottom: 1px solid ${props => props.theme.secondaryRed};
    }

    svg {
      margin-left: 4px;
      transform: translateY(1px) scale(.8);
    }
  }
  
`

export default AuthForm