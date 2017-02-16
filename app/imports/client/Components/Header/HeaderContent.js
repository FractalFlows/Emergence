import styled from 'styled-components'
import {
	white,
	grey400,
} from 'material-ui/styles/colors'

const HeaderContent = styled.div`
  width: 100vw;
  max-width: 100vw;
  padding: 7px 150px;
  backgroundColor: white;
  boxShadow: 0 1px 4px ${grey400};
  display: flex;
  alignItems: center;
  boxSizing: border-box;

	@media (max-width: 780px) {
		padding: 7px 30px;
	}
`

export default HeaderContent
