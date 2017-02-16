import React from 'react'
import { compose, pure } from 'recompose'
import { get, find } from 'lodash/fp'
import {
  RaisedButton,
} from 'material-ui'

// Components
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelHeaderButton,
} from '/imports/client/Components/Panel'
import ArticleSummary from './SummaryBar'

// Helpers
import requireLoginAndGoTo from '/imports/client/Utils/requireLoginAndGoTo'

function ArticleSummaries({
  user,
  summaries,
  articleSlug,
}){
  return (
    <Panel>
      <PanelHeader title="Summaries">
        {
          !find({authorId: get('_id', user), status: 'enabled'}, summaries) ? (
            <PanelHeaderButton
              data-name="add-summary-btn"
              onClick={() => requireLoginAndGoTo({
                pathname: `/article/summary-upsert/${articleSlug}`,
                state: { modal: true },
              })}
            >
              Add summary
            </PanelHeaderButton>
          ) : null
        }
      </PanelHeader>

      <PanelBody>
        {
          summaries.length > 0 ?
          summaries.map((summary, i) =>
            <ArticleSummary
              key={i}
              summary={summary}
              articleSlug={articleSlug}
              user={user}
            />
          ) : (
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <RaisedButton
                label="Create a new summary"
                onClick={() => requireLoginAndGoTo({
                  pathname: `/article/summary-upsert/${articleSlug}`,
                  state: { modal: true },
                })}
                primary
              />
            </div>
          )
        }
      </PanelBody>
    </Panel>
  )
}

export default compose(
  pure, 
)(ArticleSummaries)
