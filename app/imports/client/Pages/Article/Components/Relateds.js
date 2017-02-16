import React from 'react'
import {
  compose,
  pure,
  withState,
  withProps,
} from 'recompose'
import { Meteor } from 'meteor/meteor'
import {
  RaisedButton,
  Snackbar,
} from 'material-ui'

// Components
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelHeaderButton,
} from '/imports/client/Components/Panel'
import RelatedArticle from './RelatedArticle'
import RelatedArticleInput from './RelatedArticleInput'

// Helpers
import requireLoginAndGoTo from '/imports/client/Utils/requireLoginAndGoTo'

function ArticleRelatedArticles({
  articleSlug,
  relatedArticles,
  showAddNewRelatedArticle,
  hideAddNewRelatedArticle,
  showSnackbar,
  hideSnackbar,
  isAddingNewRelatedArticle,
  isShowingSnackbar,
  user,
  removeRelated,
}){
  return (
    <Panel>
      <PanelHeader title="Related articles">
        <PanelHeaderButton
          onClick={showAddNewRelatedArticle}
        >
          Add more related articles
        </PanelHeaderButton>
      </PanelHeader>
      <PanelBody>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <tbody>
            {relatedArticles.length > 0 ?
              relatedArticles.map((relatedArticle, i) =>
                <RelatedArticle
                  key={i}
                  article={relatedArticle}
                  user={user}
                  removeRelated={removeRelated}
                />
              ) :
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <RaisedButton
                  label="Add related articles"
                  onClick={showAddNewRelatedArticle}
                  primary
                />
              </div>
            }
            {isAddingNewRelatedArticle &&
              <tr>
                <td colSpan="2">
                  <RelatedArticleInput
                    currentRelatedArticlesDOIs={relatedArticles.map(({ DOI }) => DOI)}
                    cancel={hideAddNewRelatedArticle}
                    showSnackbar={showSnackbar}
                    articleSlug={articleSlug}
                  />
                </td>
              </tr>
            }
          </tbody>
        </table>
      </PanelBody>
      <Snackbar
        open={isShowingSnackbar}
        message="Related article removed"
        action="undo"
        autoHideDuration={4000}
        onRequestClose={hideSnackbar}
      />
    </Panel>
  )
}

export default compose(
  withState('isAddingNewRelatedArticle', 'setAddingNewRelatedArticle', false),
  withState('isShowingSnackbar', 'setSnackbarVisibility', false),
  withProps(({ setAddingNewRelatedArticle, setSnackbarVisibility, articleSlug }) => ({
    showAddNewRelatedArticle: () => setAddingNewRelatedArticle(true),
    hideAddNewRelatedArticle: () => setAddingNewRelatedArticle(false),
    showSnackbar: () => setSnackbarVisibility(true),
    hideSnackbar: () => setSnackbarVisibility(false),
    removeRelated: ({ DOI }) => () => Meteor.call('article/removeRelated', {
      articleSlug,
      DOI,
    })
  })),
  pure,
)(ArticleRelatedArticles)
