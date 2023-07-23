
# Online Coding Web Application - Mentor-Student Collaboration
This web application aims to facilitate remote coding sessions between mentors and students, focusing on JavaScript (JS) programming. In this scenario, Tom serves as Josh's mentor, guiding him through coding exercises, while preferring remote sessions due to the ongoing Covid situation. The application enables Tom to share a piece of code with Josh, observe him while he writes and modifies the code in real-time, and provide feedback in an interactive manner.

# Features
## Lobby Page - Choosing a Code Block
The Lobby page acts as the gateway to the coding exercises. No authentication is required, making it easily accessible to both mentors and students. It presents a clean interface with the following elements:
## Title: "Choose code block"
Code Blocks: A list of code block items, each representing a different coding exercise. For instance, items like "Async case" can be included.
## Selection:
By clicking on a code block item, the user is redirected to the Code block page, where they can explore the exercise in detail.
# Code Block Page - Interactive Learning
The Code Block page serves as the central platform for both mentors and students to collaborate. The application distinguishes between the two categories as follows:

## Mentor:
When the Code Block page is accessed for the first time, the user is designated as the mentor.

## Read-Only Mode:
The mentor can view the chosen code block in read-only mode, allowing them to assess the student's progress.
Student: Any user who accesses the Code Block page after the mentor is considered a student.

## Code Editing:
The student is granted the ability to modify the code within the chosen code block, providing them with a hands-on learning experience.
## Real-time Code Changes:
The application employs Socket.io to display real-time code changes made by the student, enabling instant feedback from the mentor.
## Syntax Highlighting:
 To improve code readability, Highlight.js (or an equivalent library) highlights the syntax of the JavaScript code.

# General Guidelines
## Manual Code Blocks:
Code blocks are manually created, requiring no API or UI. This simplifies the process, making it more flexible to accommodate various exercises.
## Code Block Structure:
Each code block consists of two essential fields:
title: Represents the title or name of the code block exercise.
code: Contains a string representation of the JavaScript code, providing the basis for the coding exercises.
## Clear Comments:
In the code blocks, clear comments are added strategically to enhance comprehension and understanding of the exercises.
Technical Implementation
Client-Server and Database: The application incorporates both client-server and database functionalities. It grants the freedom to use any preferred framework or programming language, ensuring the development process aligns with the team's expertise and needs.
Bonus Feature - Encouraging Success
To add an element of motivation, an optional bonus feature can be implemented:

# Solution Verification:
Introduce a "solution" field to each code block exercise (manually inserted by the mentor).
Smiley Face Reward: When a student successfully modifies the code to match the solution, a big smiley face is displayed on the screen, celebrating their achievement and fostering a positive learning environment.