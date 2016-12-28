/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import styled from 'styled-components'
import { RaisedButton } from 'material-ui'
import {
  grey200,
  grey300,
  grey400,
  grey600,
  grey700,
  grey800,
} from 'material-ui/styles/colors'

// Components
import ArticleSummary from '../ArticleSummary'
import RelatedArticle from '../RelatedArticle'
import Panel from '../../Components/Panel'
import PanelBody from '../../Components/PanelBody'
import PanelHeader from '../../Components/PanelHeader'

//Styled Components
const PanelHeaderButton = styled.button`
  backgroundColor: ${grey200};
  color: ${grey600};
  border: 1px solid ${grey300};
  padding: 7px 10px;
  borderRadius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${grey300};
  }
`

const ArticleDetail = styled.p`
  color: ${grey600};
  margin: 0 0 3px 0;
  font-size: 15px;
`

export default class Article extends React.Component {
  render() {
    const summaries = [
      {
        author: 'Pierre-Elouan Rethore',
        date: new Date(2013, 3, 27),
      },
      {
        author: 'Imad Abdallah',
        date: new Date(2016, 11, 25),
      },
    ]

    summaries.map(summary =>
      summary.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula a neque dapibus maximus sed eu velit. Donec mattis congue tellus quis condimentum. Aliquam pulvinar rutrum tortor a tempus. Duis maximus vel neque sit amet pellentesque. Maecenas tincidunt nisl id sapien iaculis iaculis. Sed aliquet id dolor gravida lobortis. Cras quam tellus, euismod sit amet quam eleifend, cursus lacinia mauris. Donec nec vulputate turpis, et malesuada eros. Nulla nec nulla non ante volutpat dignissim vitae a lorem. Vestibulum lacus enim, hendrerit sit amet ultrices nec, porttitor id nisl. Fusce interdum pharetra metus sit amet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis semper libero cursus semper consequat. Nullam nec dapibus nisi, eu convallis ligula. Sed tristique nisl quis faucibus ullamcorper. Fusce a nisl ac sem pretium tincidunt. Cras lobortis mattis sodales. Vivamus bibendum turpis sit amet nibh laoreet porta. Phasellus porttitor dignissim quam et gravida. Morbi aliquam ut neque eget rhoncus. Nunc ac nisi ante. Nullam efficitur eros ut nibh pulvinar, ut volutpat ligula sodales. Proin bibendum dignissim orci et egestas. Nunc tortor odio, dictum id lorem quis, gravida consequat tortor. Cras auctor fermentum libero. Suspendisse non nisl nisi. Curabitur fringilla neque neque, vitae iaculis tortor vestibulum id. Praesent viverra libero et ornare auctor. Nunc a lectus lorem. Duis et magna tempus, venenatis leo in, consectetur tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae convallis diam. Integer gravida consequat ex, nec hendrerit est vestibulum a. Phasellus eu ante et urna facilisis convallis. Morbi volutpat mauris sit amet diam placerat, nec iaculis mauris rutrum. Donec nulla felis, vestibulum elementum efficitur non, bibendum et massa. Donec dolor tortor, molestie at eleifend vitae, pharetra vitae ex. Suspendisse tellus velit, porttitor ac dapibus nec, volutpat vitae mauris. Sed vel ultrices.'
    )

    const relatedArticles = [
      {
        title: 'Utility of multimaterial 3D printers in creating models with pathological entities to enhance the training experience of neurosurgeons',
        authors: ['Vicknes Waran', 'Vairavan Narayanan', 'Ravindran Karuppiah', 'Sarah L. F. Owen', 'Tipu Aziz'],
      },
      {
        title: 'New Landscapes and New Eyes: The Role of Virtual World Design for Supply Chain Education',
        authors: ['Theo J. Bastiaens', 'Lincoln C. Wood', 'Torsten Reiners'],
      },
    ]

    relatedArticles.map(relatedArticle =>
      relatedArticle.abstract = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula a neque dapibus maximus sed eu velit. Donec mattis congue tellus quis condimentum. Aliquam pulvinar rutrum tortor a tempus. Duis maximus vel neque sit amet pellentesque. Maecenas tincidunt nisl id sapien iaculis iaculis. Sed aliquet id dolor gravida lobortis. Cras quam tellus, euismod sit amet quam eleifend, cursus lacinia mauris. Donec nec vulputate turpis, et malesuada eros. Nulla nec nulla non ante volutpat dignissim vitae a lorem. Vestibulum lacus enim, hendrerit sit amet ultrices nec, porttitor id nisl. Fusce interdum pharetra metus sit amet blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis semper libero cursus semper consequat. Nullam nec dapibus nisi, eu convallis ligula. Sed tristique nisl quis faucibus ullamcorper. Fusce a nisl ac sem pretium tincidunt. Cras lobortis mattis sodales. Vivamus bibendum turpis sit amet nibh laoreet porta. Phasellus porttitor dignissim quam et gravida. Morbi aliquam ut neque eget rhoncus. Nunc ac nisi ante. Nullam efficitur eros ut nibh pulvinar, ut volutpat ligula sodales. Proin bibendum dignissim orci et egestas. Nunc tortor odio, dictum id lorem quis, gravida consequat tortor. Cras auctor fermentum libero. Suspendisse non nisl nisi. Curabitur fringilla neque neque, vitae iaculis tortor vestibulum id. Praesent viverra libero et ornare auctor. Nunc a lectus lorem. Duis et magna tempus, venenatis leo in, consectetur tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vitae convallis diam. Integer gravida consequat ex, nec hendrerit est vestibulum a. Phasellus eu ante et urna facilisis convallis. Morbi volutpat mauris sit amet diam placerat, nec iaculis mauris rutrum. Donec nulla felis, vestibulum elementum efficitur non, bibendum et massa. Donec dolor tortor, molestie at eleifend vitae, pharetra vitae ex. Suspendisse tellus velit, porttitor ac dapibus nec, volutpat vitae mauris. Sed vel ultrices.'
    )

    return (
      <div
        style={{
          padding: '40px 150px',
        }}
      >
        <Panel>
          <PanelBody>
            <h1
              style={{
                margin: '0 0 20px 0',
                color: grey800,
                fontSize: 23,
              }}
            >
              {unescape(this.props.params.slug)}
            </h1>
            <ArticleDetail>
              <b>Authors:</b> Theo J. Bastiaens; Lincoln C. Wood; Torsten Reiners
            </ArticleDetail>
            <ArticleDetail>
              <b>DOI:</b> 10.1109/TC.2002.1009146
            </ArticleDetail>
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Summaries">
            <PanelHeaderButton>
              Add summary
            </PanelHeaderButton>
          </PanelHeader>
          <PanelBody>
            {summaries.length > 0 ?
              summaries.map((summary, i) =>
                <ArticleSummary key={i} summary={summary} />
              ) :
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <RaisedButton
                  label="Create a new summary"
                  primary={true}
                />
              </div>
            }
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Knowledge bits">
            <PanelHeaderButton>
              Add knowledge product
            </PanelHeaderButton>
          </PanelHeader>
          <PanelBody>

          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader title="Related articles">
            <PanelHeaderButton>
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
              {relatedArticles.length > 0 ?
                relatedArticles.map((relatedArticle, i) =>
                  <RelatedArticle key={i} article={relatedArticle} />
                ) :
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <RaisedButton
                    label="Add related articles"
                    primary={true}
                  />
                </div>
              }
            </table>
          </PanelBody>
        </Panel>
      </div>
    )
  }
}

// export default container(Article)
