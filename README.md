# WDI PROJECT 3
A team project for WDI London consisted of creating a MEAN stack app alongside 4 of my peers. This utilised MongoDB, ExpressJS, AngularJS and Node.js. 

The group decided to create an app that acted like Stack Overflow in its regards to answering questions( Code based) but with the addition of a charity aspect. This concept would let a user post a question which could be answered by any registered member. Then by trying the different solutions to the posted question the user would pick an answer accordingly and then donate a desired amount to a charity of his/her choice. 

With the concept decided we brain stormed wireframes and decided what models would be appropriate in order to get an MVP adding further functionality down the line. Below is the wireframe for both the browser and responsive scss within a mobile platform.

# Browser

---

<img width="755" alt="screen shot 2017-03-13 at 02 40 04" src="https://cloud.githubusercontent.com/assets/23128874/23839571/ea9123ac-0796-11e7-99a6-585da0af00a7.png">

<img width="758" alt="screen shot 2017-03-13 at 02 40 22" src="https://cloud.githubusercontent.com/assets/23128874/23839580/f96de400-0796-11e7-9c37-70ac240ed12b.png">

<img width="757" alt="screen shot 2017-03-13 at 02 40 36" src="https://cloud.githubusercontent.com/assets/23128874/23839583/01f2c064-0797-11e7-99c7-0aaefca2027e.png">

<img width="756" alt="screen shot 2017-03-13 at 02 41 16" src="https://cloud.githubusercontent.com/assets/23128874/23839590/103e9260-0797-11e7-8585-42f4679a9769.png">

<img width="757" alt="screen shot 2017-03-13 at 02 41 29" src="https://cloud.githubusercontent.com/assets/23128874/23839605/2d0796ee-0797-11e7-8152-2f3c5bd1ae92.png">

---

# Mobile Responsive
---

<img width="786" alt="screen shot 2017-03-13 at 02 47 41" src="https://cloud.githubusercontent.com/assets/23128874/23839666/9e93b586-0797-11e7-911c-f33e4d6602d2.png">

<img width="794" alt="screen shot 2017-03-13 at 02 48 03" src="https://cloud.githubusercontent.com/assets/23128874/23839673/a9766430-0797-11e7-89ff-1da7351a2e45.png">

---

As the project was collaborative, we would all be pushing to one git repositry and as such we made use of Trello in order to not overlap pieces of code resulting in git conflicts. Below is an example of the Trello board all my peers and I used to make the project as smooth going as possible.

---
<img width="1266" alt="screen shot 2017-03-13 at 02 53 38" src="https://cloud.githubusercontent.com/assets/23128874/23839797/5c68be1c-0798-11e7-8547-95a8ec1c969c.png">

---

With the basic concept sorted, models were looked at in a greater amount of detail to understand the relationship that each reference had to each other. As such we came to the conclusion that we would need 4 models. These models included answer, language, question and user. As with my previous project the user model remained somewhat identical except with the addition of a few new fields for registration. 

With Angular we need to state resources we need for our module in order for the app to have access to various frameworks for the app to function.
Also angular have to be specified within every JavaScript file for it to be recognised as well as having several depencies injected within various functions in order for them to execute properly/

---

<img width="1022" alt="screen shot 2017-03-13 at 03 27 52" src="https://cloud.githubusercontent.com/assets/23128874/23840438/1a0cbadc-079d-11e7-8234-55e32ff33114.png">

---

The question model was a reference to language, answer and user. The language model was a reference to question only and the answer model was a reference to both user and question.

---

<img width="1081" alt="screen shot 2017-03-13 at 03 04 43" src="https://cloud.githubusercontent.com/assets/23128874/23840028/e2c5bb62-0799-11e7-84b7-c4bf540585f8.png">

---

With the relationship sorted, using Trello tasks were delegated within the group. I alongside another peer were tasked with creating the Angular front end authentication which we accomplished via pair programming. We also had to create the user validation through using the npm package jsonwebtoken to ensure that the user recieve a token to local storage within the browser during their logged in session whereby it's removed through logging out. 

In order to get the Angular authentication to work within the src/js file a configs an interceptor.config.js is created to make sure the header has a token. This is conjunction with user controllers, factories, services utilising angular states with view pages make the authentication system possible. With regards to angular verbs for posting data, it is already a predefined however as for update it needs to be defined within the user factory.

---

<img width="1023" alt="screen shot 2017-03-13 at 03 24 30" src="https://cloud.githubusercontent.com/assets/23128874/23840391/ab4d6056-079c-11e7-8f56-ae99c33fbbcc.png">

---

With the Angular authenticatons sorted, we went on to create the angular states via view pages setting them to a url, templateUrl, controller and then a controllerAs. This made is so that each angular state would be loaded whenever a /url to a defined template was clicked upon. The view pages were created using basic HTML incorporating Angular syntax to request data from the database. 

---

<img width="1023" alt="screen shot 2017-03-13 at 03 33 46" src="https://cloud.githubusercontent.com/assets/23128874/23840536/ecbb589e-079d-11e7-864c-d69689b7ecbd.png">

---

With regards to the authentication system, the Just Giving Charity API was implemented on the registration form via a drop down selector whereby the could enter a desired charity. Upon completion of the search, a selector would become active and list a number of choice based on priority. The charity chosen upon registration wasn't permanet, it could later be changed when you wanted to update your profile. Another thing to note is the implementation of the user delete function. As one would guess a user should only be able to delete themselves and as such a function was created to just do that removing the users data from the database. 

---

<img width="976" alt="screen shot 2017-03-13 at 04 23 02" src="https://cloud.githubusercontent.com/assets/23128874/23841397/e209c26c-07a4-11e7-8a7c-7e90abff3850.png">

---

Factories were created first and then controllers in regards to how we wanted each page to interact with each other. 

--- 

<img width="988" alt="screen shot 2017-03-13 at 03 41 39" src="https://cloud.githubusercontent.com/assets/23128874/23840668/0906e8fa-079f-11e7-8b82-81bcb9e2bde0.png">

---

The same approach was maintained for both langauges and questions in regards to creating individual controllers and views. For language as it was a list of JavaScript icons, the controllers/views needed an index and a show page. For the questions controllers/views need a new and show page. 

---

<img width="970" alt="screen shot 2017-03-13 at 03 52 18" src="https://cloud.githubusercontent.com/assets/23128874/23840846/8883748a-07a0-11e7-864a-1f09a75af33f.png">

---

One clever aspect of the app is how answers were being submitted and as to why they didn't need a model. This is as they were intergrated within the question show controller and persisted through the database through that manner. Logic was also added so that the user who posted the question could choose an answer, once the answer was picked the div element would become flagged preventing any other answers from being selected. 

---

<img width="1171" alt="screen shot 2017-03-13 at 04 30 05" src="https://cloud.githubusercontent.com/assets/23128874/23841524/d328e3b2-07a5-11e7-98bd-f1bc02b46523.png">

---

By melding all the JavaScript using Angular directives in conjunction with SCSS to make the app look more production worthy, a functioning app that functioned much like Stack Overflow was created. Below are a few screenshots of the final app.

---

<img width="1279" alt="screen shot 2017-03-13 at 03 58 53" src="https://cloud.githubusercontent.com/assets/23128874/23840963/a65575b6-07a1-11e7-834c-62e75564ddd8.png">

---

<img width="1279" alt="screen shot 2017-03-13 at 03 59 11" src="https://cloud.githubusercontent.com/assets/23128874/23840969/b3a82f38-07a1-11e7-9b76-fe0804a1e033.png">

---

<img width="1280" alt="screen shot 2017-03-13 at 03 59 26" src="https://cloud.githubusercontent.com/assets/23128874/23840972/bc99d60a-07a1-11e7-8384-393029f5b5e8.png">

---

<img width="1280" alt="screen shot 2017-03-13 at 03 59 41" src="https://cloud.githubusercontent.com/assets/23128874/23840979/caa5bb60-07a1-11e7-92f1-7f67be089add.png">


---

A fully functioning version of the app can be found with the linked provided: https://codefund.herokuapp.com/


# Further implementations for the future.
As with any piece of code further functionality/styling is always part of its core. As such, additional features I would like to include further down the line are:  

* Implementation of the Stripe API for direct donations to the Charity.
* Create a forum section, where the most upvoted questions/answers get flagged so user can see what problems are being requested the most.
* Usage of Web-Socket to allow two way data binding so a real time chat system can be utilised so users don't have to directly wait for a reply on their posts.
* The introduction of a meetup section where users can arrange/organise meetup events on their favourite languages.















