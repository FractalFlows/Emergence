/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'

// Components
import Panel from '../../Components/Panel'

export default class Article extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: '40px 150px',
        }}
      >
        <Panel title="Summaries" />
      </div>
    )
  }
}

// export default container(Article)
