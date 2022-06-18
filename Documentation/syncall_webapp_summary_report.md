# SynCall WebApp Summary Report

### Team

- Enrique Mondelli - A01379363
- José Salgado - A01023661
- Eduardo Galindo - A01028846
- Jorge Cabiedes - A01024053
- Diego Mejía - A01024228
- Carolina Ortega - A01025254
- Diana Melo - A01023785
- Gabriel Dichi - A01027301
- Mateo González Cosío - A01023938
- Matías Méndez - A01422885
- Miguel Medina - A01023656
- Pablo Yamamoto - A01022382
- Rafael Ríos - A01028722
- Sebastian Juncos - A01022629
- Ximena González - A01028604

### Version:
1.0

### Date:
14/06/2022

### Team Name:
SynCall

### Business / Operations Sponsor:
Amazon & Tecnológico de Monterrey

### Project Number:
1

## Table of Contents
1. [Initial Requirements](#initial-requirements)
2. [Modified Requirements](#modified-requirements)
3. [Component Completion](#component-completion)
4. [Architecture](#architecture)
5. [Web Application System](#web-application-system)
5. [Web Application System](#web-application-system)
6. [Demos](#demos)
7. [Future Work](#future-work)

## Initial Requirements

### Non-Functional Requirements
- Added value to Amazon Connect
- Efficiency in resource management
- Easy to use application
- Facilitate agent training procedures

### Functional Requirements
- Record agent's screen
- Combine pre-existing audio with the recorded screen of the agent
- Save the combined recording on a database
- Create a dashboard of recordings done
- Supervisor assigning recordings to agents
- Record keystrokes
- Agent introduced tags to recording

## Modified Requirements 

### Non-Functional Requirements
- Added value by increasing organizational efficiency
- Be as efficient as possible with resource management
- Develop an easy to use and intuitive application
- Facilitate agent training procedures

### Functional Requirements
- Record agent’s desktop screen
- Combine pre-existing audio with the recorded screen of the agent
- Save the combined recording on a database easily accessible for the supervisor
- Create a screen recording dashboard
- Supervisor recording assignment to agents
- Select call issue with automated pre-call survey

## Component Completion
- [x] Log In
- [x] Sign Out
- [x] Dashboard
- [x] Connect Embed
- [x] Video Recording
- [x] Video Merging
- [x] Video Streaming
- [x] User Creation
- [x] User Listing
- [x] Video Assigning
- [x] Role Update
- [ ] Tag Implementation

## Architecture
![](https://i.imgur.com/fpOmWcu.png)

## Web Application System

### Views

Log in
![](https://i.imgur.com/Q7sCsev.png)

Settings
![](https://i.imgur.com/0KJleI8.png)


#### Supervisor views

Dashboard
![](https://i.imgur.com/4myCvs9.png)

Assign Video
![](https://i.imgur.com/iJYZl0y.png)

#### Admin views

Create User
![](https://i.imgur.com/8Eet5lX.png)


User Management
![](https://i.imgur.com/YikqkYY.png)

#### Agent views

Dashboard
![](https://i.imgur.com/erVsl2N.png)

## Demos

<a href="https://drive.google.com/file/d/1cNKyqlQQj3csztVfbfKqxpJq0UAEpDeV/view?usp=sharing">User Management</a>

<a href="https://drive.google.com/file/d/1sFs_23dNd9ixfLaHdUI55jtSUPP_Mlp6/view?usp=sharing">Call Managing<a/>

<a href="https://drive.google.com/file/d/1yvtLj37n4MS7SOzY_mKjxlxsbiSwWdzu/view?usp=sharing">Video Assigning<a/>

## Future Work

### Sensible Data Censorship
The goal is to provide an easily accessible button to allow the agent to censor his screen in case sensitive data is being displayed.

### Volume Detection
The goal is to analyze the volume throughout the call and provide insightful knowledge regarding said agent.

### Transactional Blocks
The goal is to constantly retrieve blocks of video and audio from the call, so that in case of an error not everything recorded is lost.

### Tags
The goals is to implement tags within the recording object items within the database in order to better filter them. Not entirely depending on queue titles but rather agent input at the end of the call.