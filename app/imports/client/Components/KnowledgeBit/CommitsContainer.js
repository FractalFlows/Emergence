import { connect } from 'react-refetch'
import url from 'url'

function githubLinkSanitizer(link){
  const parsed = url.parse(link)

  if(!parsed.protocol){
    return link.replace('github.com/', '')
  }

  return parsed.path.replace(/^\//, '')
}

export default connect(props => ({
  commitsFetch: (
    props.knowledgeBit.type === 'github' ?
    `https://api.github.com/repos/${githubLinkSanitizer(props.knowledgeBit.link)}/commits` :
    ''
  ),
}))
