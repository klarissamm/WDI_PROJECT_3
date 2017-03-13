#CodeFund

**A MEAN Stack application by Team Undefined**

Group project for Web Development Immersive course at General Assembly.

See it here: [CodeFund](https://codefund.herokuapp.com/).

![image](http://i.imgur.com/Ag752Xu.jpg) 


##Background

This group project was inspired by our experience in the tech world. We wanted to create a space for asking coding-related questions to fellow web developers. However, it was important to us that the app was more than just a question and answer forum, and the idea was very much rooted in the idea of charitable donations being rewarded to successful answers. This is because my teammates and I wanted to explore how to use tech for good; how to contribute in a small way whilst still providing a service. 

##Technology overview

The app used JWT authentication and was built using the MEAN stack, with Bootstrap v4 as a CSS framework to make the site mobile responsive. 

Within our team of 5, I predominantly worked with AngularJS on the front-end, as well as seeding data using Bluebird and async waterfall in the back-end. I also implemented the design and branding that would be used throughout the website and ensured that the team merged on Git without conflict - as much as possible anyway!

We used the JustGiving external API in order to populate information about a user's chosen chairty.


##Planning: models and design

We spent a couple of days carefully planning our Mongoose models, as they needed to be embedded within each other so that we could link and reference the right data on the front-end.

<li>The 'User' model references the 'Question' model as an array 
<li>The 'Question' model references the 'Language' model, and also the 'Answer' model as an array 
<li>The 'Language' model references the 'Question' model as an array 
<li>The 'Answer' model references the 'Question' model

We also collaborated on the Balsamiq wireframes before starting to code, so that everyone approved the look of the app. We followed the mobile-first design method.

![image](http://i.imgur.com/fbajwtn.jpg) 
![image](http://i.imgur.com/JMVAHaY.jpg) 
![image](http://i.imgur.com/rsCDrYr.jpg) 

Tasks were organised and delegated using a Trello board. We had three stand-ups and Git merges a day to ascertain what had to be achieved and what still needed to be done.

![image](http://i.imgur.com/eVCJ75s.jpg) 


##How it works

When registering, a user can search for the charity of their choice. If they manage to help another user by giving the most helpful answer to a question, they will win the reward money for the charity they choose here.

We used the JustGiving API to serve the data to the front-end. A user types in a search word to the charities search bar and the top 5 most relevant charities are returned in a selection box.

![image](http://i.imgur.com/DwlzKdQ.jpg) 

The user can then select one and add it as their chosen charity.

![image](http://i.imgur.com/zLCbvSQ.jpg) 

Once a user has logged in, they land on the "technologies" page, where they can choose the technology that they would like to explore or to answer a question.

![image](http://i.imgur.com/1PZ32At.jpg) 

To ask a new question, the user clicks on 'Post your question' in the nav bar. They can then select the relevant technology for that question, for example, HTML5, set a number for the reward amount and then post it to the site. It will be found in the HTML5 technology question page.

![image](http://i.imgur.com/sosjkM4.jpg) 

We used textAngular so that users could input code easily to the site. Any edits can then be made to that block of code, to make user experience and functionality as easy and seemless as possible.

![image](http://i.imgur.com/uvByYys.jpg) 

In the user's profile page, they can see which questions they have asked, as well as information about their chosen charity, populated by the JustGiving API.

![image](http://i.imgur.com/U2PT8BH.jpg) 

Any other user is now able to answer that question, and the questioner can select the best answer and donate to the chosen charity.  

##Challenges

This was my first experience working with a team. On the first day we found that we had some conflicts because we had not been merging frequently enough over the weekend. From then on, we made sure that we were all on the same page and as up-to-date as possible, with multiple merges per day and many commits.

Seeding our data was difficult because of our complicated embedded model system. We had to use Promises and async waterfall in order to make sure the data saved in an order that made sense. 


##What's next?

In the future, we would love to implement a mentorship scheme through the app, connecting experienced developers with newbies like ourselves.

##Technnology used

<li>HTML5
<li>SASS
<li>AngularJS
<li>Node.js
<li>Express.js
<li>MongoDB
<li>Gulp
<li>Bower
<li>Bootstrap and UI Bootstrap
<li>Just Giving API
<li>textAngular
