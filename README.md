# Client Interaction 

## Record all interactions with your client in a diary format

<i>30/5/2017</i>
I met the client in evening and discussed the problems he was facing as a music producer. The interaction was heavily skewed on enquiring and deconstructing the problem my client was facing. Both parties pitched our solutions and analysed the advantages and disadvantages of the solution. At the end of the interaction, we came to a conclusion on the ideal solution.

<i>2/6/2017</i>
With a basic understanding of the needs of the client, this interaction focused more on the project scope - we began by developing user stories to understand the basic necessities of the project. After detailing the user stories, we narrowed the stories down to it’s basic features (MVP features). This interaction focused on the outlining the differences between the features that are required and features that are desired; furthermore expectation handling was done within this interaction.

<i>7/6/2017</i>
A basic functional prototype was presented to the client, client was overall satisfied with the functionality however had some issues with the styling of the application. This interaction focused on the review process of the client interaction. All the changes were made and reviewed through messaging applications after this interaction.

<i>12/6/2017</i>
The final project made to the needs of the client was presented, within this interaction IT support plans and maintenance documents were handed to the client. Furthermore, a questionnaire was given to review the work done by myself.

## Plan information gathering activities to determine project requirements, constraints and risks

Project requirements:
- Uploading Files to a node server
- Accessing files through API calls in react User Authentication through node and react
- Uploading Files to a Node Server

## Project Requirements

The project requires the client to be able to upload music files (WAV and MP3) files from react to the node server. The process involves an upload form on the client side which appends the uploaded file to the URI (Using SuperAgent), on the server side the application needs to access the appended file and convert the file into a Buffer to store it in the mongoose database.

<b>Accessing Files Through API calls in REACT</b>

Project Requirements

The project requires the customers to be able to access the MP3/WAV files from the node server in the react client. Customers should be able to listen to the music before purchasing. The client side will be doing a GET call to access all the beats that are available for sale, whenever a new beat is submitted through the client side - a POST request is made to the server.

Constraints

As the client needs to receive all the files from the server side, it will take a long time for it receive all the necessary information. A streaming method needs to be considered however for this project a basic functionality of the application will be prioritised.

<b> User Authentication through NODE and REACT </b>

Project Requirements

Users are able to sign up and login through the REACT client, there are two types of users: 
- Clients: When the client logs in, the client is given authority to upload beat files and access the admin dashboard which contains data about recent transactions.
- Customers: When customers sign up and login, the customers are given authority to purchase beat files and the rights to download the file.

The client and server authentication methods will be set using passport and JWT.

Risk

Without a proper authentication method set up, customers may be able to access the beats using curl methods.

# Application Design

## One page summary of your application including problem definition and solution
<b>Problem</b>: With how saturated the music industry is, the client was having a hard time distinguishing themselves from the competitor. However, in the rare chances that his music was found he had no tools to funnel the traffic into conversion.

For example:
One of the client’s work was featured on a viral youtube video which had over 2 million views and created a traffic of over 100, 000 views onto his youtube channel. However, despite the surplus of attention on his work - the client was no able to funnel the views into conversion. The client sells his beats at $500 - $700 AUD; assuming he made a 1% conversion: it equates to a loss of potentially $500,000 - $700,000. He was unable to create conversion as he had no form of website showcasing both his current and past works or a platform to sell his work.

<b>Solution</b>: The solution was to create an application that would represent the client’s brand - the application main purpose is to showcase the client’s work. The client should be able to upload his work directly through the client side and be accessible by the public through the application. Furthermore, users who are interested to purchase the client’s work should be able to purchase directly through the application.

Due the nature of the client’s occupation and saturation of the market, the client required a way to distinguish himself from his competitor. Our solution was to embed a media player with visuals that match his branding of “Blade Runner”.

<img src="http://i.imgur.com/Oc5EMNl.png" >

## Determine the appropriate client technology, development tools, and platform for writing the UI

The back end was created with Express Js (Node) The Front end was created with React
The database used MLab.

## A workflow diagram of the user journey

<img src="http://i.imgur.com/dO2kMcu.png" >

## Wireframes for at least 5 screens

<img src="http://i.imgur.com/OFcSW3G.png" >

## User stories for the whole application

As a user, I want to be able to listen the music producers current and previous works.
As a user, I want to be able to sign up to purchase the work.
As a customer, I want to be able to purchase beats and be entitled for private ownership.
As a customer, I want to be able to access beats that I have purchased previously.
As an admin, I want to be able to upload media files directly through the client side to the server side.

## Entity Relationship Diagram 

<img src="http://i.imgur.com/FWiRN6o.png" >

# Tools and Methodologies 

## Trello or similar project management tools to be used to track progress of build

<img src="http://i.imgur.com/dO2kMcu.png" >

## Code review. Demonstrate that you have had your code reviewed by other students and that you have provided a code review for others

<img src="http://i.imgur.com/kvZrSx1.png" >
