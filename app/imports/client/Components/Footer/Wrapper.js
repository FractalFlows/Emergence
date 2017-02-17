import styled from 'styled-components'
import {
	white,
	grey700,
} from 'material-ui/styles/colors'

const FooterWrapper = styled.div`
  background-color: ${white};
  margin-top: 30;
  padding: 40px 150px;
  text-align: center;
  
  @media (max-width: 780px){
    padding: 40px 20px;
  }
` 

export default FooterWrapper
