User journey

1) homepage
Information
Splash image
Register/Login

2) profile page
Photo
username
coding language
charity
questions/answers posted

3) question list page
list of questions
categories

4) question page
headline of question
description
responses
  code framework for submitting answers

5) question submission page
headline
description
deadline
reward

Models
1)User model
email
github name
icon (optional)
language
charity
description

2)Question model
Language (reference)
Owner
Title
Reward
Deadline
Answers

3)Answers model
title
owner
description

4)Language model
name

 [
  email: sdfsdf@hotmail.com,
  githubName: sdsdfd,
  charity: blah
    question: { JavaScrip, javascript: {title, answers: {fdsf, dfsdf, fsdf}}}
      ]
    ]

user {
  email:
  username:
  githubLink:
  number
  language: { language Schema }
}

language {
  name
  question: { questionSchema }
}

Question {
  user
  title
  description
  answers { answer schema }
}

Answer {
  title
  owner
  winner default false
  description
}


//  // NEEDS TO FINISHED;
//   const admins = [{
//     'name': 'Ismael',
//     'email': 'ismaelbacha@hotmail.com',
//     'password': 'password',
//     'passwordConfirmation': 'password',
//     'github': 'ismaelocaramelo',
//     'image': 'ismael.png',
//     'bio': 'Hi',
//     'role': 'admin'
//   },{
//     'name': 'Klarissa',
//     'email': 'klarissamunz@gmail.com',
//     'password': 'password',
//     'passwordConfirmation': 'password',
//     'github': 'klarissamm',
//     'image': 'klarissamm.png',
//     'bio': 'Hi',
//     'role': 'admin'
//   },{
//     'name': 'Jamie',
//     'email': 'jgranthamburton@gmail.com',
//     'password': 'password',
//     'passwordConfirmation': 'password',
//     'github': 'ismaelocaramelo',
//     'image': 'Jamie.png',
//     'bio': 'Hi',
//     'role': 'admin'
//   },{
//     'name': 'Hudhayfa',
//     'email': 'hudhayfajamalkhan@gmail.com',
//     'password': 'password',
//     'passwordConfirmation': 'password',
//     'github': '*******',
//     'image': 'Hudhayfa.png',
//     'bio': 'Hi',
//     'role': 'admin'
//   },{
//     'name': 'Aleksandra M',
//     'email': '@aleksmikolajczyk',
//     'password': 'password',
//     'passwordConfirmation': 'password',
//     'github': '*******',
//     'image': 'Aleksandra.png',
//     'bio': 'Hi',
//     'role': 'admin'
//   }];
//
//   User.insertMany(admins, (err) => {
//     if(err) return err;
//     return console.log('Admins created');
//   });
// });
//
// // const answerSchema = mongoose.Schema({
// //   description: { type: String, trim: true, require: true },
// //   chosen: { type: Boolean, default: false },
// //   owner: { type: mongoose.Schema.ObjectId, ref: 'User'} //is the ref User.name?
// // });
//
// const answer = {
//   'description': 'You should remove the click handler once you have populated the div with the checkboxes',
//   'chosen': true,
//   'owner': 'Jen'
// };
//
// // const languageSchema = mongoose.Schema({
// //   name: { type: String, trim: true, require: true },
// //   questions: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }]
// // });
//
// const language = {
//   'name': 'JavaScript',
//   'questions': []
// }, {
//   'name': 'Ruby',
//   'questions': []
// }, {
//   'name': 'Python',
//   'questions': []
// }, {
//   'name': 'CSS',
//   'questions': []
// }
//
// // const questionSchema = mongoose.Schema({
// //   title: { type: String, trim: true, require: true },
// //   description: { type: String, trim: true, require: true },
// //   status: {type: String, required: true, trim: true, enum: questionStatuses, default: 'pending'},
// //   // coins: {type: Number, required: true, trim: true},
// //   language: { type: mongoose.Schema.ObjectId, ref: 'Language' },
// //   answers: [{ type: mongoose.Schema.ObjectId, ref: 'Answer' }],
// //   owner: { type: mongoose.Schema.ObjectId, ref: 'User'}
// // });
//
//
// const question = {
//   'title': 'How can I disable .onclick for element\'s children?',
//   'description': 'I cannot mark a checkbox option as selected or deselect it. How can I make it available?'
//   'status': 'answered',
//   'language': 'JavaScript',
//   'answers': ''
//
// }
// question.save((err, question) => {
//
// })
//
// const users = [{
//   'name': 'Gigi',
//   'email': 'gigi@gmail.com',
//   'password': 'password',
//   'passwordConfirmation': 'password',
//   'github': 'gigi_loves_coding',
//   'image': 'gigi.png',
//   'bio': 'I have been a web developer for 1 year working for the government',
//   'charity': '',
//   'language': [],
//   'questions': [],
//   'role': 'user'
// }, {
//   'name': 'Jen',
//   'email': 'jen@gmail.com',
//   'password': 'password',
//   'passwordConfirmation': 'password',
//   'github': 'jenoftheweb',
//   'image': 'jen.png',
//   'bio': 'I am passionate about coding, and am particularly into JavaScript',
//   'charity': '',
//   'language': [],
//   'questions': [],
//   'role': 'user'
// }];
//
//
//
// // Create a user
// // Create a language
// // Create (several) questions for that language
// // Create (several) answers for those questions
// // Have one of them marked as the correct answer
//
//
// const user = {
//   'name': 'Gigi',
//   'email': 'gigi@gmail.com',
//   'password': 'password',
//   'passwordConfirmation': 'password',
//   'github': 'gigi_loves_coding',
//   'image': 'gigi.png',
//   'bio': 'I have been a web developer for 1 year working for the government',
//   'charity': '',
//   'role': 'user'
// }
//
let userId;
// user.save((err, user) => {
// userId = user.id
//   const language = {
//     'name': 'JavaScript'
//   }
//
//   language.save(err, language) => {
//     user.language.push(user.id)
//
//     const question = {
//       'title': 'How can I disable .onclick for element\'s children?',
//       'description': 'I cannot mark a checkbox option as selected or deselect it. How can I make it available?'
//       'status': 'answered',
//     }
//
//     question.save(err, question) => {
//       user.language.question.push(language.id)
//
//       const answer = {
//         'description': 'You should remove the click handler once you have populated the div with the checkboxes',
//         'chosen': true,
//         'owner': 'Jen'
//       };
//
//       answer.save((err, answer) => {
//         user.language.question.answer.push(answer.id)
//     }
//   }
//
// });
