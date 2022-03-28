# Document for Technology Solution: Amazon Connect

![](https://i.imgur.com/gzkJPmi.png)

### Team

- Enrique Mondelli - A01379363
- José Salgado - A01023661
- Eduardo Galindo - A01028846
- Jorge Cabiedes - A01024053
- Diego Mejía - A01024228

### Version:
2.0

### Date:
02/03/2022

### Team Name:
Dream Team

### Business / Operations Sponsor:
Amazon & Tecnológico de Monterrey

### Project Number:
1

## Content Table

1. [Template Change History](#template-change-history)
2. [General Project Information](#general-project-information)
3. [Scope Statement](#scope-statement)
4. [Introduction](#introduction)
5. [Description/Objectives](#description/objectives)
6. [Governance Model](#governance-model)
7. [Budget/Costs](#budget/costs)
8. [S.W.O.T](#s.w.o.t)
9. [Justification](#justification)
10. [Constraints](#constraints)
11. [Dependencies](#dependencies)
12. [Risks](#risks)
13. [Product Acceptance Criteria](#product-acceptance-criteria)
14. [Business Requirements](#business-requirements)
14.1. [System Features](#system-features)
14.2. [Data Requirements](#data-requirements)
14.2.1. [Logical Data Model](#logical-data-model)
14.2.2. [Data Dictionary](#data-dictionary)
14.2.3. [Reports](#reports)
14.2.4. [Data Acquisition, Integrity, Retention, and Disposal](#data-acquisition,-integrity,-retention,-and-disposal)
14.3. [External Interface Requirements](#external-interface-requirements)
14.3.1. [User Interfaces](#user-interfaces)
14.3.2. [Software Interfaces](#software-interfaces)
14.3.3. [Hardware Interfaces](#hardware-interfaces)
14.3.4. [Communication Interfaces](#communication-interfaces)
15. [FlowChart](#flowchart)
16. [Define & Design Solution](#define-&-design-solution)
17. [Proposed Architecture](#proposed-architecture)
18. [Implementation Plan](#implementation-plan)
19. [Test Solution](#test-solution)
19.1. [Objectives](#objectives)
19.2. [Scope](#scope)
19.3. [Testing Requirements](#testing-requirements)
19.4. [Dependencies](#dependencies)
19.5. [Testing Strategy](#testing-strategy)
19.6. [Testing Management Process](#testing-management-process)
19.7. [Testing Environment](#testing-environment)
19.8. [Testing Results](#testing-results)
19.9. [Conclusions](#conclusions)
19.10. [Appendix](#appendix)
20. [Endings](#endings)
21. [Glossary of Term and Acronyms](#glossary-of-term-and-acronyms)

## Template Change History
| Date of Change | Owner of Change | Description |
| - | - | - |
| 02/03/2022 | Jorge Cabiedes | Creation of Document |
| 09/03/2022 | Jorge Cabiedes | Conclusion of first draft |
| 15/03/2022 | Jorge Cabiedes | Conclusion of final deliverable draft |

## General Project Information
**List of Reviewers**
| ID | Role | Name |
| - | - | - |
| 1 | Project Professor | Gilberto Echeverría |
| 2 | Administration Professor | Edgar Alan |
| 3 | Commercial Software Development  & Software Quality Professor | Esteban Castillo |
| 4 | Vision of International Standards Professor Professor | David Iturriaga |
| 5 | Software Requirements Professor | José Eslava |

**List of Approvers**
| ID | Role | Name |
| - | - | - |
| 1 | Amazon Employee | Rosa Thomas |
| 2 | Project Professor | Gilberto Echeverría |
| 3 | Administration Professor | Edgar Alan |
| 4 | Commercial Software Development  & Software Quality Professor | Esteban Castillo |
| 5 | Vision of International Standards Professor Professor | David Iturriaga |
| 6 | Software Requirements Professor | José Eslava |

## Scope Statement
Improve the user experience of amazon connect customers, giving the chance to better understand agent calls and use them as training for future agents, by developing a complementary webapp to Amazon Connect Services that is capable of recording, storing and sorting agent calls within said app for future observation.

## Introduction
Within the following document, the various business aspects and characteristics required for the previously described product will be mentioned and explained in order to show everything necessary to start its respective development.

After having the whole document reviewed and approved by their respective list of people shown in previous sections, the development phase may begin with the full team of members defined.

## Description and Objectives
The developed product will be a webapp, which makes use of the audio and video of Amazon Connect agents in order to facilitate the training of future agents. The app's main functionality is to integrate the recording of an agent's desktop during an Amazon Connect call, as well as having a separate view for supervisors where they are able to view and assign all available recordings.

Apart from that, here are the project's main business objectives: 
- Added value: Provide an added value to Amazon Connect services to provide better efficiency at supporting Amazon Connect customers and increase organizational efficiency
- Resource management: Try to be as efficient as possible with resource management so that it doesn't jeopardize Amazon's current operations
- Easy to use application: Develop an easy to use and understand application so that customers don't feel intimidated by its complex design
- Agent training: Facilitate agent training procedures for Amazon Connect customers

## Governance Model

**Sponsor:** Amazon & Tec de Monterrey
**Supervisors:** All Professors of Software Planning Course
**Project Manager:** Jorge Cabiedes
**Business Analyst:** Enrique Mondelli
**Architect:** José Granger Salgado
**Developer:** Diego Mejía
**Tester:** Eduardo Galindo

## Budget/Costs
**Infrastructure:**
- Web hosting
- Application
- Database
- 3rd Party APIs
- Given 300 AWS Credits per full development team of then course, these are the following costs for the region of US West (N. California) by using the AWS pricing calculator:
    - Amazon API Gateway:
        Considering for HTTPS APIs; 25 thousand requests per month, average size request of 10240 KB per KB, for REST APIs; 25 thousand requests per month, the total monthly cost comes up to ***0.59 USD***.
    - AWS Lambda:
        To be defined, as its cost can't be fully defined yet with the limited technical knowledge of it.
    - AWS Amplify:
        Considering 50 build minutes per month, 100 GB of data storage per month, 100 GB of data served per month, the total monthly cost comes up to ***17.80 USD***.
    - Amazon DynamoDB:
        Considering the features of full backup and restore with 5 GB capacity, as well as an on demand capacity, including a storage capacity of 15 GB, an average item size of 200 KB, 100 thousand writes per month, 500 thousand reads per month, the total monthly cost comes up to ***32.38 USD***.
    - Amazon S3:
        Considering the standard s3 feature, data transfer feature, and 1 TB of storage per month, the total monthly cost comes up to ***23.55 USD***.
        
With all of this said, the total budget used out of the ***300 USD*** is ***74.32 USD*** per month, leaving the team with ***225.68 USD*** to spare for the following months.

## S.W.O.T.
**Strengths:** 
- The UI of the app's design will be intuitive and easy to navigate in order to facilitate the agent training process, aswell as make it more efficient 
- The team has worked with technologies that are applicable for this project in the past

**Weaknesses:** 
- The team has lesser knowledge regarding the way in which Amazon Connect works
- Slow response times regarding processes done by the app.

**Opportunities:**
- Application designs
- The project allows the team to choose new technologies that will improve the user experience
- The project will develop the team’s Amazon Web Services experience

**Threats:** 
- Communication problems with Amazon could cause dissonances between the final submit and what is expected from us
- Costly software processes if not planned ahead


## Justification
The solution allows the agents working for Amazon to improve their  customer service abilities by providing tools to ease the case solving experience. One example of this would be organizing the video resources by case and identification tags will simplify and accelerate the training process.

## Constraints
- **Time constraints:** in which the schedule is defined in the form of the WBS from the middle of February to the middle of June, spanning through 10 work weeks. However, it is considering average to best case scenarios, where a mistake or bigger problem could arise that slows down the planned times and halts the activities that have been defined
- **Weak communication with sponsor:** in which the development of the project may be either slowed down or sidetracked, as the team can only communicate with its Amazon's stakeholders once a week through Zoom, as well as through chat with the Slack platform
- **Early delivery dates:** because of the nature of the project, that being a school project, the development team is pushed to adapt the deliveries to the course's dates and may be applying a large amount of pressure on the development team

## Dependencies
- **Amazon Connect:** main dependency
- **Amazon API Gateway:** allows communication with the database
- **AWS Lambda:** authenticates users that are trying to connect to the database
- **AWS Amplify:** hosts and deploys the web application
- **Amazon DynamoDB:** stores all of the resulting data
- **Electron:** deploys the application as an executable file for any operating system
- **ReactJS:** frontend Javascript library for bulding user interfaces based on UI components



## Risks
**Low Risk:**

- Lost credentials
- Network error
- Malignant user

**Medium Risk:**

- Losing communication with Amazon
- Video corruption
- Reaching maximum size with database
- Running out of credits
- Interdependency to AWS and their possible malfunctions

**High Risk:**

- Data breach
- Exposed sensitive data
- Bad security configuration

## Product Acceptance Criteria
**Functionality:** The product must have full functionality according to our requirements.
**Documentation:** The project must have complete documentation and instructions.
**Completeness:** The project must have all the features expected in the documentation, both business and functionality related.
**Feedback:** The project should be accepted according to the feedback of Amazon and our professors.

## Business Requirements

### System Requirements
#### System Features
<hr/>

**Voice & Screen Recording**

**Description**

![](https://i.imgur.com/87iWWOe.png)

**Stimulus/Response Sequences**

(Encompasses "Data storage of recordings" as well to avoid repetition)

![](https://i.imgur.com/eI7uOdW.png)

**Functional Requirements**
| **Identifier:** 1|
| - |
| **Essential/Desirable:** Essential | 
| **Priority:** 5 |
| **Use Case Name:** Merge both the audio and video of the agent|
| **Description:** With the audio provided by Amazon Connect, screen record the agent's screen during the call, and merge said video with their provided audio |
| **Main Scene:** <br/> 1. Agent begins call <br/> 2. Call gets recorded <br/> 3. Screen gets recorded automatically <br/> 4. Audio and video get merged <br/> 5. Recording gets stored online|
| **Exception Scenes:** Internet connection gets lost |
| **Pre-conditions:** The agent has logged in within the app|
| **Post-Conditions:** message showing "Call has been recorded and stored succesfully" |
| **Acceptance Criteria:** Message shown |

<hr/>

**Screen Recordings Dashboard**

**Description**

![](https://i.imgur.com/2Qg7nAG.png)

**Stimulus/Response Sequences**

![](https://i.imgur.com/uXHWrhL.png)

**Functional Requirements**
| **Identifier:** 2|
| - |
| **Essential/Desirable:** Essential | 
| **Priority:** 4 |
| **Use Case Name:** Supervisor manages recordings |
| **Description:** Supervisor is able to search recordings and view them according to various parameters.  |
| **Main Scene:** <br>1. Supervisor enters the recordings tab<br>2. Looks up recordings according to chosen parameters <br> 3. Views recordings|
| **Exception Scenes** <br>1. Recording not found <br>2. Error playing recording|
| **Pre-conditions:** Supervisor enters recording tab|
| **Post-Conditions:** Supervisor finishes looking at recordings|
| **Acceptance Criteria:** Recording is found with the correct parameters and is able to be played|

<hr/>

**Recording Assignment**

**Description**

![](https://i.imgur.com/vFcXHS2.png)

**Stimulus/Response Sequences**
(Extends from 'Screen recording dashboard' activity diagram)

![](https://i.imgur.com/fuCSiUT.png)

**Functional Requirements**
| **Identifier:** 3|
| - |
| **Essential/Desirable:** Essential | 
| **Priority:** 3 |
| **Use Case Name:** Recording Assignment|
| **Description:**  Supervisor finds a recording and assigns it to an agent so he can watch it.|
| **Main Scene:** <br>1. Supervisor finds recording they want to share<br>2. Shares recording with agent <br> 3. Agent can now view the recording in their own recording tab|
| **Exception Scenes** <br>1. Error sharing. <br>2. Error playing recording|
| **Pre-conditions:** Supervisor wants to share recording|
| **Post-Conditions:** Agent is able to watch recording|
| **Acceptance Criteria:** The Supervisor is able to share the recording and the Agent is able to find it and watch it afterwards|
 
 <hr/>
 
**Data storage of recordings**

**Description**

![](https://i.imgur.com/ngpTFLS.png)

**Stimulus/Response Sequences**

(Encompasses "Voice and screen recording" to avoid repetition)

![](https://i.imgur.com/S8KRR9x.png)

**Functional Requirements**
| **Identifier:** 4|
| - |
| **Essential/Desirable:** Essential | 
| **Priority:** 5 |
| **Use Case Name:** Use AWS and buckets to store the recording|
| **Description:** With the merge of audio and video we have made previously we will store the recording on a bucket according to preselected tags|
| **Main Scene:** <br>1. Recording is finished being processed<br>2. Tags are selected for recording <br> 3. Recording is sent to storage|
| **Exception Scenes** <br>1. Recording was not able to be processed<br>2. Recording was not able to be sent to storage|
| **Pre-conditions:** Agent has finished call|
| **Post-Conditions:** Agent able to enter new call|
| **Acceptance Criteria:** Recording is sent to the specific bucket according to the selected tags|

<hr/>

**Amazon Connect integration**

**Description**

![](https://i.imgur.com/htj6oN8.png)

**Stimulus/Response Sequences**

![](https://i.imgur.com/loQko7j.png)

**Functional Requirements**
| **Identifier:** 5|
| - |
| **Essential/Desirable:** Essential | 
| **Priority:** 5 |
| **Use Case Name:** Amazon Connect Integration|
| **Description:** Use Amazon Connect's API in order to manage calls and various other features in our APP|
| **Main Scene:** <br>1. Agent logs in and uses the integration to accept a call<br>2. The call is managed by Amazon Connect <br> 3. Amazon connect is used to send the recording to storage|
| **Exception Scenes** <br>1. Call error <br>2. Recording Error|
| **Pre-conditions:** Agent is ready to take call|
| **Post-Conditions:** Agent has taken call|
| **Acceptance Criteria:** The call is made in full and the recording is saved|

<hr/>

### Data Requirements
**Logical Data Model**

![](https://i.imgur.com/Gmz7MXY.png)

**Data Dictionary** 

**User**
| Variable Name | Data Type | Data Format | Field Size | Description | Example |
| - | - | - | - | - | - |
| userId | string | "" | 20 | ID of user | agent_1040 |
| firstName | string | "" | 50 | First name of user | John |
| lastName | string | "" | 50 | Last name of user | Smith |
| email | string | "" | 50 | E-mail of user | test@mail.com |
| phone | string | "" | 15 | Phone number of user | 525588991144 |
| isSupervisor | bool | true / false | - | Determine if user is supervisor | false |

**Recording**
| Variable Name | Data Type | Data Format | Field Size | Description | Example |
| - | - | - | - | - | - |
| recordingId | string | "" | 10 | ID of recording | ABCD123__5 |
| agentId | string | "" | 20 | ID of agent | agent_1040 |
| issue | string | "" | 30 | Issue addressed in the call | Tech Support |
| date | date | YYYY/MM/DD | - | Date of recording | 2022/02/02 |
| tags | array of strings | ["",""] | 10 each | Tags to classify recording | ["tech", "system"] |
| videoName | string | "" | 30 | Name of file recorded | 2022_02_02-24_02_02.mp4 |
| rating | int | 1 - 5 | - | Rating given by client of call | 87 |
| resolved | bool | true / false | - | Determine whether the issue was resolved or not | true |
| notes | array of strings | ["",""] | 100 each | Additional notes added by supervisor | ["This is an example of a note","This is a second example of a second note"]


**Reports** 

- **Procedures and results of testing report:**
    During the process of testing, document each type of test performed, their purpose, their procedure and their results
    
- **Requirement criteria report:**
    Within a document, list all functional and non-functional requirements, their respective descriptions if applicable and if each requirement is either in process, concluded or cancelled
    
- **Retrospective meeting report:**
    At the end of each iteration of the progress of the project, a retrospective meeting is held where everyone reviews what has been accomplished during the said iteration, and documents all aspects developed throughout it.

**Data Acquisition, Integrity, Retention, and Disposal** 

Data will be acquired through the integration of Amazon Connect to the app using AWS DynamoDB, of both the agent / supervisor and the recording of calls done by agents, as described within the above sections. By using a relational database, the application is able to keep track of all recordings without saturating the "recording" object itself by only storing the agentId within it, and keep agent data separate from it.

The necessary techniques to protect the app's data integrity are: backups of database; so that not all information is lost if any fatal error happens regarding the app, mirroring of all compressable software; which should always keep up with the latest release of the application and be used only when the backup fails, checkpointing of application; which provide the progress of the app through the course of the project to the stakeholders via its snapshots of each version released, and data accuracy verification; in order to be able to analyze all data recollected and remove any inconcistency that produces said error so that data quality is consistent.

The policies for retaining data are that the software will record voice and video within its own database for an undetermined amount of time, mainly for training and quality control purposes. Also, the recordings will contain metadata relating to date, name and issue of the call.

The policies for the disposing of data encompass the storage of object classes within the database that have been inactive for too much time. However, the only exception to this characteristic applies if the recording is being actively viewed or assigned but the agent within the call is not. In that case, the recording and agent will not be removed from the database.

### External Interface Requirements
**User Interfaces**

**Login Pages:**

![](https://i.imgur.com/HoWa9Y1.png)

![](https://i.imgur.com/2xHLMrW.png)

On the Login pages, agents and supervisors will be able to log into the app using their Amazon Connect credentials.


**Supervisor Recordigs Dashboard:**

The supervisor screen will allow the user to access the stored recordings, that can be categorized by agent name, date, topic or tag as deemed necessary.

![](https://i.imgur.com/iKjk0Qp.png)

The screen above shows all the video recording stored in the database. This page can be accesed via the box button present in the bottom left corner of the page, with the default results being all the recordings sorted by most recent. 

In this screen the supervisor can browse through all the recordings by sorting and filtering, as well as assign specific videos to agents.

**Assign Video:**

![](https://i.imgur.com/yCVdJcq.png)

If the supervisor clicks the assign button for a video, they will be prompted with this screen where they can choose to assign the video to one or multiple agents.

**Agent Assigned Videos Dashboard:**

![](https://i.imgur.com/HDGLvsc.png)

This screen is similar to the recordings dashboard, the main difference being that agents only have access to the videos that have been assigned to them as well as not having the 'assign' functionality.

**Media Player:**

![](https://i.imgur.com/QPT0Qss.png)

If an agent or a supervisor clicks the play button on the thumbnail of a video, they will be prompted with this media player where they can watch the selected video. In the media player the video can be played and paused, seeked to any second, volume can be adjusted and the video can be set to fullscreen.


**Amazon Connect agent UI integration:**

![](https://i.imgur.com/5I2dwuT.png)

In this screen the agent will be allowed to interact with the amazon connect call manager, which is a direct embedding of the Amazon Connect website where the agent can recieve calls.

**Post Call Information**

![](https://i.imgur.com/zg6Ep64.png)

When the agent ends a call session with a customer, they will be prompted this screen to fill out basic information about the call.



**Software Interfaces**

- **Amazon Connect API:** main dependency used for the solution, which is a cloud-based contact center solution , and obtain all of the information for the calls of the call center

- **Amazon API Gateway:** allows communication with the database, as well as facilitate the development of the complete app's API, disregarding the scale of it, well off for the development of the app

- **AWS Lambda:** authenticates users that are trying to connect to the database, which is a service without server, based on events that allow the execution of code from practically any application

- **AWS Amplify:** used to host and deploy the web application, which is a group of tools created for web development using AWS, with the flexibility to take advantage of the various AWS services

- **Amazon DynamoDB:** stores all of the resulting links for the recordings of the agents, including both voice provided by Amazon and video recorded by the webapp itself

- **Amazon S3:** stores all of the actual recordings mentioned in the previous dependency

- **Amazon Chime:** mainly used with Amazon Chime Voice Connector to migrate telephony workload to AWS, and without any cost, the link of phone systems based on the cloud

**Endpoints for webapp:**

| HTTP verb | Name | Function |
| - | - | - |
| GET | active call getter | gets a list of the current active calls  |
| POST | recording upload | saves the passed recording to the database in DynamoDB |
| GET | all recordings getter | get all available recordings based on permission of the current user |
| POST | assign recording | changes the assignations of a particular recording to include or dismiss the agent specified |

**Hardware Interfaces**

*Not Applicable*

**Communications Interfaces**

- **https:** which is short for *Hypertext Transfer Protocol Secure* used for various amazon connect service endpoints and the main hosting of the application
- **aws lambda:** 50 functions per instance since only one region is used (US east)

**Ports used:**

- **Port 53:** UDP, which is used to access DNS servers
- **Port 80:** UDP and TCP, which is used for initial connections to amazon workspaces
- **Port 443**: UDP and TCP, which is used for registration and authetication using HTTPS
- **Port 4195:** UDP and TCP, which is used for workspaces that are configures for WorkSpaces Streaming Protocol (WSP)

## Flowchart

![](https://i.imgur.com/9Cx3F64.png)

## Define & Design Solution

Highest Priority: 5

| Description | Priority |
| - | - |
| Record agent's screen | 5 |
| Record agent’s mouse and keystrokes | 5 |
| Ability to classify videos with relevant tags | 4 |
| Develop different views for agents and supervisors | 4 |
| Ability for supervisor to assign videos to inexperienced agents | 4 |
| Make execution times quick | 3 |
| Use as few resources as possible on execution | 3 |
| Add possibility for supervisor to handle and assign calls | 2 |
| Develop the app's own database system | 1 |

## Proposed Architecture

![](https://i.imgur.com/g9Ri4sr.png)

Within the proposed architecture, the user interacts directly with an application developed on ReactJs and deployed on either Amazon Amplify or Electron.

>  The two deployment frameworks (Amplify and Electron) have identical versions of the applications and only provide versatility for the user to be able to run it on a web browser or as an executable.

The application then makes use of the Amazon Connect API to get the information required.

It also connects to DynamoDB to store and fetch recordings. In order to gain access to it, the application has to authenticate its credentials through AWS Lambda and it uses the Amazon API Gateway to make its own requests.

Finally, it makes use of S3 to get the audio of the calls and pair it to its screen recording. Said paired recording is then saved on S3, and after that, the link to it is obtained and saved on DynamoDB.

## Implementation Plan

<a href="https://docs.google.com/spreadsheets/d/17n6iVo4Iv3FYx8AABAqwoYfDj7bc_EvtfIBqUduEyhs/edit?usp=sharing" target="_blank">Link to WBS</a>

## Test Solution

### Objectives
Here are the main objectives attempted to achieve within the extensive testing process:
- Finding defects within the software
- Preventing said found defects
- Verify that the project reaches the expected business and technical requirements 
- Be able to supply the client with information about the level of quality of the product

### Scope

- Initial Documentation
    - Create Testing Document
    - Create Bugs Documentation
- Unit Testing
    - Application Structure
        - Test that the basic structure has no functional or design flaws, and that there is no security flaw which can be taken advantage of.
    - User Creation
        - Test the creation of users both as agents and supervisors with their corresponding permissions, while at the same time making sure that everything is imported correctly from Amazon Connect with no possibility of security breaches.
    - Database Structure
        - Make test videos to make sure that they are stored correctly in the database created with DynamoDB. Test the tag system and the groundwork for some stretch goals, all the while making sure that the database is secured and has the right user access settings.
        - We need to make sure that all API keys and sensitive information is correctly encrypted and the connection with the database has no vulnerabilities. 
    - Amazon Connect Integration
        - Make sure the integration with Amazon Connect works correctly within the app.
        - Make various testing calls while testing all aspects (Complete,Partial,Cancelled call,etc...)
        - Make sure assigning calls to agents works according to the predefined plan and no errors can be caused from external variables.
    - Voice & Video
        - Test that Amazon Connect's voice recording works and whether our own video recording is merged without errors and saved in the correct section according to the defined tags.
        - Test the ability of both supervisor and agent to find and view videos.
        - Test Supervisor video sharing.
        - Make sure to set up error messages in case the video or voice can't be recorded.
        - Record videos in various conditions to confirm full functionality and that no corruptions can be created in the recordings.
- White Box Testing
    - Basic Application Usage
        - Test all basic usage features extensively (Agent & Supervisor creation,Log-in,Log-out,UI,UX,Database).
        - Confirm security measures are working correctly and no breaches can be found.
        - Test for full functionality.
    - Amazon Connect Calling
        - Test the complete flow for recieving and ending calls.
        - Confirm security measures are working correctly and no breaches can be found.
        - Test for full functionality.
    - Voice & Video Recording/Storage
        - Confirm the full flow for the recording and storage of both voice and video.(Video Merging,Storage,Tags)
        - Confirm security measures are working correctly and no breaches can be found.
        - Test for full functionality
    - Supervisor & Video Sharing
        - Confirm that videos can be watched and fetched from the database without errors and the feature of video sharing from supervisors.
        - Confirm security measures are working correctly and no breaches can be found.
        - Test for full functionality

### Testing Requirements

- Considering that the base necessity this service will attend is the recording of agents' screens, this will be the first thing to be tested. This includes ensuring a quality of at least 720p for the video aspect to make sure everything on screen is visible and understandable, including whatever the agent types on screen and the position of the mouse at all times. This also includes making sure the audio captured by amazon connect and the screen recording form our end are being correctly merged and time aligned. 

- After testing the quality of video, it would be logical to continue by testing the storing of said video. For this the team will have to ensure that the videos are being stored properly on the proposed database and that they are accessible by the correct users. 

- Subsequent to guaranteeing the video aspects of our application are working properly, testing the ‘assign video functionality’ would begin. This means making sure that a supervisor is able to access every video stored in their database and is able to assign them to any agent selected. And on the agent side, that they have access to the videos that have been assigned to them.

- Another requirement that is integral to the functionality of our application is the agents’ and supervisors’ ability to log in using their amazon connect credentials. Ensuring the correct integration and validation of amazon connect credentials would be imperative for this aspect of the application. 

- All the points mentioned above are considered functional requirements to be prioritized and therefore rigorously tested. Tests for the visual and non functional aspects of the application will not be prioritized and only be done in the case that there is enough time after the ones mentioned before, unless the client deems them a higher priority.

### Dependencies

- The application is capable of recording a selected screen an saves the recording in a file in the computer.
- Agents are capable of specifying their Amazon Connect credentials on the application.
- The application is able to listen when the agent with the specified credentials enters a call and when it ends.
- The application starts the recoding of the screen with the same timing of the call the agent is on.
- The application is able to fetch the audio of the most recent call made by the agent.
- The application is able to combine the audio and video of the most recent call.
- The application is able to upload the combined recording into the cloud database.

### Testing Strategy

These are the steps that will be followed throughout the testing procedure:

**At a component level:**

1. Dynamic tests, which are executed when the code is being executed
2. Black box tests, which check the functionality of the app, ignoring its internal part and only considering input and output
3. Unit tests, which are centered around individual pieces and functions of the app
4. If black box tests don't satisfy, create white box tests using roads, which do analyze the internal processes of each function, as well as their respective input and output

**At an integration level:**

1. Non-functional tests, which test requirements based on the operations of the software, and not the functionality itself
2. Static tests, which don't require the execution of software to be made and are useful for document and manual revisions
3. Integration tests of components in a descending manner

**Acceptance Criteria**
- Every function, module and/or components must execute in their entirety, meaning the have to execute without any errors
- When applicable, output logs should be generated in order to analyze the performance and results of the given test

**Deliverables:**

- **Output logs:** These are files that are automatically generated in order to analyze expected results, as well as performance of every single component that is being tested
- **Testing report:** A full documentation of the functions and components that have been tested, as well as the types of test performed, as well as their expected and given results of each test
- **Functional requirements document:** This is a continuation of the requirements document that describes the requirements that are being worked on, as well as the requirements that have been fulfilled by the development and testing procedures

### Testing Management Process

**Description**

| Testing Strategies | Format | Process | Reason | When to Use | Number of People | Acceptance Criteria | Frequency |
| - | - | - | - | - | - | - | - |
| Informal | Terminal logs and IDE debugging | Analyze executions of single processes | Make use when an individual function is finished | On a function level | 1 to 3 people | Execution of function ends without any single error | every 1 - 3 days |
| Technical | Saving of performance and results within a separate file | Analyze inputs and outputs of whole processes, as well as all the available paths | Make use when a part of a functional requirement is finished | On a module level | 5 to 8 people | Execution of functions ends without errors, as well as all output logs are recollected | weekly |
| Inspection | Analyze separate testing files, as well as a full report of the component analyzed | Analyze a component that satisfies a functional requirement that can be visualized on a user level | Make use when a functional requirement is concluded | On a component level | 10 people to the whole team | Whole component shows the expected results and is consistent with output logs, as well as a full report of what was analyzed is created | bi-weekly |

**Mitigation Plan**

In the case that either any test goes wrong or a bug is found, the following mitigation plan comes in place:

| Risk cause | Risk effect | Likelihood (almost certain, likely, possible, unlikely or rare) | Consequences (negligible, minor, moderate, major or crucial) | Risk ranking (low, moderate, high or very high) | Mitigation strategies |
| - | - | - | - | - | - |
| Network error | Corrupted data | likely | minor | low | 1. Verify connection before testing <br> 2. Include error catchers within code <br> |
| Exposed credentials | Data breach | possible | crucial | high | 1. Implement data encryption <br> 2. Hash all given passwords <br> |
| Slow response times | Performance issues | possible | moderate | moderate | 1. Analyze output logs <br> 2. Analyze time complexity of code <br> |
| Reaching maximum size of database | Storage limitations | unlikely | Moderate | low | 1. Watch database capacities weekly <br> 2. Minimize space complexity of code used <br> |
| Scarcity of AWS credits | Whole software malfunction | unlikely | crucial | high | 1. Plan to use free software as a backup <br> 2. Determine whole software interdependency <br> |

**Roles**

- **Developers - Diego Mejía, Jose Salgado (alongside other 4 people)**
    - These people are tasked with the development of the software in order to fulfill the functional requirements defined in the requirements document, as well as fixing every bug found by the testers.
- **Testers - Eduardo Galindo (alognside other 5 people)**
    - These people are tasked with testing each process of the developed app, as well as analyzing the whole process of each component, and their respective outputs with a full documentation of the analyzed parts.
- **Reviewers - Jorge Cabiedes, Enrique Mondelli (alongside other 1 person)**
    - Evaluate the app on an user interface level, exploring every single available possibility for the app, as well as reading the whole documentation and giving feeadback to the rest of the team on how to continue with the development process.

**Communication Plan**

**Communication Objectives**
- advance the development and testing of the project using the SCRUM agile method
- keep the client and stakeholders informed about activities done for the project
- through weekly online meetings, make questions about the development of the project and any decision made
- ask about the resources that will be used according to the business needs

**Communication Steps**
These are the considerations for the SCRUM process, when the full 13 to 15 people teams are formed:
1. Analyze the team's availability
2. Set up working speed and frequency, which can be seen in WBS
3. Plan sprint planning meetings, which are held weekly, where new updates and feedback is given about the project
4. Determine groups of development members responsible for each specific task

**Stakeholder Information**
| Name | Role | Frequency | Channels of Communication |
| - | - | - | - |
| Rose | Amazon sponsor | weekly | Zoom and Slack |
| Jose Eslava | Software Requirements Professor | daily on work days | Zoom, Slack and presential classes |
| Gilberto Echeverria | Project Professor | daily on work days | Zoom, Slack and presential classes |
| Edgar Alán | Administration Professor | daily on work days | Zoom, Slack and presential classes |
| Esteban Castillo | Commercial Software Development & Software Quality Professor | daily on work days | Zoom, Slack and presential classes |
| David Iturriaga | Vision of International Standards Professor Professor | daily on work days | Zoom, Slack and presential classes |

**Communication Types**
- Weekly calls (elements developed and doubts about the project)
- Weekly discussions about current advancements with course professors
- Slack communication platform
- Weekly sprints that involve planning, implementation and review of new features to add to the app

**Activity Cronogram**

<a href="https://docs.google.com/spreadsheets/d/17n6iVo4Iv3FYx8AABAqwoYfDj7bc_EvtfIBqUduEyhs/edit?usp=sharing" target="_blank">Link to WBS</a>

### Testing Environment

**Software Level**
- NodeJS version LTS 16.4.9
- ReactJS version 17.0.2
- Electron version 17.1.1
- Git version 2.35.1
- VS Code version 1.65
- Any modern web browser (Chrome, Firefox, etc.)
- Amazon Connect API 2017/08/08 version
- As a backup fow AWS DynamoDB, use Back4App which uses Parse Server version 3.7.2 or higher

**Hardware Level**
- **Windows:**
	- Windows 10 or 11 operating system
	- At least 8GB of RAM
	- At least an Intel Core I3 or AMD Ryzen 3
	- At least a 2.0GHz processor
	- At least 1GB of disk space available

- **Apple:**
	- MacOS 10.13.6 or later operating system
	- At least 8GB of RAM
	- At least a 2.0GHz processor
	- At least 1GB of disk space available

### Testing Results
Results can't be achieved, since the development process hasn't started yet.

### Conclusions
Conclusion about the actual results can’t be reached. However, what can be concluded about the testing plan is what can and should be expected of said processes. 

With that said, what can be expected is a full analysis of the performance and components of each single part of the developed software. Apart from that, within the testing process bugs, while not ideal, should appear in order to further improve every element of the web app.

However, problems that could appear relate to what was mentioned in the previous paragraph, the appearance of bugs, and depending on the size and priority of them, could halt the whole development process.

And most important out of it all, either running out of space within the database or running out of credits to use for AWS. However, this has all been accounted for in the mitigation plan defined in previous sections.

### Appendix

Among the things that haven't been included but rather considered are the following:

- While the team can't go in full depth of the white box testing that has to be done as the components for the whole software hasn't been developed, the main plan for them is to follow alternating paths for each concluded component, documenting each branching path taken in order to visualize each possibility.

- Black box tests, while not used as much as the rest of everything else, will be heavily implemented with informal tests as there is an emphasis on inputs and outputs specifically, and then later on analyze the content itself if anything goes wrong.

- While Linux may be a possibility among the operating systems used by the development team, it is quite similar to development in Windows and is not as necessary to specify.

- As general roles have been defined, roles for a technical review are acknowledged (such as decision maker, review leader, recorder, technical reviewer) but can't be determined yet without the full definition of the development teams.

- Use cases for the testing phases are considered to be implemented within the development phase, and not the previous documentation that has been written.

## Endings
In conclusion, the main purpose of this document, as it has been seen throughout its various sections, is to determine and recollect every necessary aspect to be able to begin development of the proposed Amazon Connect solution, where a merge of both video and audio is obtained, as well as a system for supervisors to assign recordings to new agents in a training process, further adding value to the already defined Amazon Connect system itself. 

However, while this is a conclusion to the document, the development team will continue to update it for as long as the product advances within the following months. 

Apart form that, some issues that may arise in the near future and that the development team recognizes is the increase in size of the team itself, as it could lead to disagreement and disorder. Despite that, the original team is prepared to give the new members an introduction to the proposed solution, as well as all the proposed tools to be used in order to start with the development phase.

## Glossary of Term and Acronyms
| Name of Term / Acronym | Description |
| - | - |
| WBS | Work Breakdown Structure, used to define the workflow throughout the development of the project |
| MVP | Minimum Valued Product, which is often presented as the first functional software |
| SCRUM | Project Work Structure for Agile Development |
| AWS | Amazon Web Services, which is the project's main source for web and cloud services |
| API | Application Programming Interface, which is used to connect different technologies |