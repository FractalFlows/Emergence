import React from 'react'
import { pure } from 'recompose'
import {
  RaisedButton,
} from 'material-ui'

// Components
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelHeaderButton,
} from '../../Components/Panel'
import KnowledgeBit from '../../Components/KnowledgeBit'

// Helpers
import requireLoginAndGoTo from '/imports/client/Utils/requireLoginAndGoTo'

function ArticleInformations({
  articleSlug,
  informations,
}){
  return (
    <Panel>
      <PanelHeader title="Knowledge bits">
        <PanelHeaderButton
          data-name="add-knowledge-btn"
          onClick={() => requireLoginAndGoTo({
            pathname: `/article/information-upsert/${articleSlug}`,
            state: { modal: true },
          })}
        >
          Add knowledge product
        </PanelHeaderButton>
      </PanelHeader>
      <PanelBody>
        {informations.length > 0 ?
          informations.map((knowledgeBit, i) =>
            <KnowledgeBit
              key={i}
              knowledgeBit={knowledgeBit}
              articleSlug={articleSlug}
            />
          ) :
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <RaisedButton
              label="Create a new knowledge bit"
              onClick={() => requireLoginAndGoTo({
                pathname: `/article/information-upsert/${articleSlug}`,
                state: { modal: true },
              })}
              primary
            />
          </div>
        }
      </PanelBody>
    </Panel>
  )
}

export default pure(ArticleInformations)
