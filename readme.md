<!--
Original project forked from: Louis3797/awesome-readme-template
-->
<div align="center">

  <img src="./amazon-solution/src/assets/Syncall_logo.png" alt="logo" width="auto" height="auto" />
  <h1>SynCall</h1>
  
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/SynCallServices/AmazonSolutionTC3005B" alt="contributors" />
  </a>
  <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/SynCallServices/AmazonSolutionTC3005B?color=lightgrey" alt="license" />
  </a>
  <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/stargazers">
    <img src="https://img.shields.io/github/stars/SynCallServices/AmazonSolutionTC3005B" alt="stars" />
  </a>
  <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/issues">
    <img src="https://img.shields.io/github/issues/SynCallServices/AmazonSolutionTC3005B" alt="open issues" />
  </a>
  <!-- <a href="https://github.com/Louis3797/awesome-readme-template/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/github/license/PrimeBIue/mini-AmazonSolution" alt="license" />
  </a> -->
</p>
   
<h4>
    <!-- <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
  <span> · </span> -->
    <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/wiki">Documentation</a>
  <span> · </span>
    <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/issues">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/SynCallServices/AmazonSolutionTC3005B/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#about-the-project)
  * [Color Reference](#color-reference)
- [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Run Locally](#run-locally)
  * [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
  

<!-- About the Project -->
## :star2: About the Project
This project was made by students of Tecnologico de Monterrey Campus Santa Fe.
The purpose of it is to make a platform for call centers that use Amazon Connect and hosting everything using Amazon Web Services: Amplify, S3, DyanamoDB, Cognito CloudFront, API Gateway, and Lambda.
By using these technologies, our project can have both: administrators and agents. Where agents can record their calls through Amazon Connect, and their screens using RTC. And administrators can review their recordings and assign these recordings to other agents in order to train them by watching how to correctly solve client issues.

<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en/">Node.js</a></li>
    <li><a href="https://graphql.org/">GraphQL</a></li>
    <li><a href="https://aws.amazon.com/amplify/">Amazon Amplify</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://aws.amazon.com/dynamodb/">DynamoDB</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://aws.amazon.com/amplify/">Amazon Amplify</a></li>
  </ul>
</details>

<!-- Color Reference -->
### :art: Color Reference

| Element             | Color   |
|---------------------|---------|
| Buttons             | #00abba |
| Icons               | #00abba |
| Card                | #4078a3 |
| Search Bar          | #ffffff |
| Main Background     | #6084a0 |
| Side Bar Background | #00274b |
| Other               | #3e688f |
| Text                | #ffffff |
| Hover               | #00abba |

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

Have Node.Js installed.

- [Node.Js](https://nodejs.org/en/)

Use npm for installing the amplify cli

```bash
  npm install -g @aws-amplify/cli
```

<!-- Installation -->
### :gear: Installation

**Our poject cannot yet be installed using a package manager**

After installing Amplify Cli, get on the proyect folder where your frontend is created. 

```bash 
amplify init
```

Amplify will guide you through the process, then you will need to add other AWS to the amplify project, these are:

```bash 
amplify add api
amplify add auth
amplify add storage 
```

For adding the api, you'll need to select GraphQl and use our schema (located in amazon-solution/amplify/backend/api/syncallapi/)

<!-- Run Locally -->
### :running: Run Locally

Start the server

```bash
  npm start
```

<!-- Deployment -->
### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  amplify push
  amplify publish
```

<!-- License -->
## :warning: License

Distributed under the [MIT License](https://choosealicense.com/licenses/mit/).

<!-- Contact -->
## :handshake: Contact

[Open a discussion](https://github.com/SynCallServices/AmazonSolutionTC3005B/discussions)

[Project Link](https://github.com/SynCallServices/AmazonSolutionTC3005B)


<!-- Acknowledgments -->
## :gem: Acknowledgements

 - [Shields.io](https://shields.io/)
 - [Readme Template](https://github.com/matiassingers/awesome-readme)
 