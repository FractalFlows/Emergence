import styled from 'styled-components'

const FooterColumn = styled.div`
	width: 33.33%;
	padding: 20px;

	&:not(:last-child) {
		border-right: 1px solid #DDD;
	}

  @media (max-width: 780px){
    width: 100%;
    border-right: none;
  }
`

export default FooterColumn
