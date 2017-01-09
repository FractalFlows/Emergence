import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'
import { toArray, times } from 'lodash'

Meteor.methods({
  'dev/createArticles'(){
    Meteor.call('dev/createUsers')

    const users = Meteor.users.find().fetch()

    ;([
      // No summaries or knowledge bits
      {
        title: 'Electrospinning of polymeric nanofibers for tissue engineering applications: a review',
        authors: ['Quynh P. Pham', 'Upma Sharma', 'Antonios G. Mikos'],
        DOI: '10.1109/FIE.2000.896576',
        abstract: getMonkeySayings(),
      },

      // No KD but summaries
      {
        title: 'Utility of multimaterial 3D printers in creating models with pathological entities to enhance the training experience of neurosurgeons',
        authors: ['Vicknes Waran', 'Vairavan Narayanan', 'Ravindran Karuppiah', 'Sarah L. F. Owen', 'Tipu Aziz'],
        DOI: '10.3171/2013.11.JNS131066',
        abstract: getMonkeySayings(),
        summaries: [
          {
            authorId: users[0]._id,
            content: getMonkeySayings(),
            date: new Date(),
            upVotes: 1,
            downVotes: 0,
            voters: [
              {
                vote: 1,
                voterId: users[1]._id,
                voterName: users[1].profile.firstName,
              },
            ],
          }
        ]
      },

      {
        title: 'New Landscapes and New Eyes: The Role of Virtual World Design for Supply Chain Education',
        authors: ['Theo J. Bastiaens', 'Lincoln C. Wood', 'Torsten Reiners'],
        DOI: '10.1109/TC.2002.100914',
        abstract: getMonkeySayings(),
        informations: [
          {
            type: 'github',
            label: 'Emergence',
            link: 'https://github.com/FractalFlows/Emergence',
            addedById: users[0]._id,
            addedByName: users[0].profile.firstName,
            createdAt: new Date(),
            updatedAt: new Date(),
            upVotes: 0,
            downVotes: 0,
            status: 'enabled',
          }
        ],
      },
    ]).forEach(article => Articles.insert(article))
  }
})

function getMonkeySayings({length = 1000} = {}){
  const dict = 'abcdefghijklmnopqrstuvwxyz.!? '

  return times(length, () => {
    return dict[Math.floor(dict.length * Math.random())]
  }).join('')
}
