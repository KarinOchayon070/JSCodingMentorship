
# Online Coding Web Application - "Coding Mentorship" - frontend 💻
- The web application serves as a platform to facilitate remote coding sessions between mentors and students, focusing on JavaScript programming.
- It enables mentors to share code snippets with their mentees, observe their real-time coding process, and provide interactive feedback during the coding exercises.
- The application is particularly useful in situations where remote interactions are preferred, such as during ongoing Covid situations, ensuring a convenient and safe learning experience for both parties involved.
## Features 🌿
- Lobby Page - Choosing a Code Block 
    - The Lobby page acts as the gateway to the coding exercises, accessible without authentication to both mentors and students.
      When mentors enter the website, they are placed in read-only mode, allowing them to observe the coding exercises but not make any modifications.
      On the other hand, students have the ability to edit and work with the provided code snippets during the coding sessions.
      This read-only mode for mentors ensures that they can effectively monitor and guide students while they actively engage with the code and receive hands-on learning experiences.
    - It presents a clean interface with the following elements:
        - Title: "Choose code block"
        - Code Blocks: A list of code block items, each representing a different coding exercise. For instance, items like "Array" can be       included.
        - Selection: By clicking on a code block item, the user is redirected to the Code block page, where they can explore the exercise in detail.
- Code Block Page - Interactive Learning
    - The Code Block page serves as the central platform for both mentors and students to collaborate.
      The application distinguishes between the two categories as follows:
        - Mentor: When the Code Block page is accessed for the first time, the user is designated as the mentor.
        - Read-Only Mode: The mentor can view the chosen code block in read-only mode, allowing them to assess the student's progress.
        - Student: Any user who accesses the Code Block page after the mentor is considered a student.
        - Code Editing: The student is granted the ability to modify the code within the chosen code block, providing them with a hands-on learning experience.
        - Real-time Code Changes: The application employs Socket.io to display real-time code changes made by the student, enabling instant feedback from the mentor. 
        - Syntax Highlighting: To improve code readability, "codeMirror" highlights the syntax of the JavaScript code.
        - Solution Verification: Introduce a "solution" field to each code block exercise (manually inserted by the mentor to DB).
        Smiley Face Reward: When a student successfully modifies the code to match the solution, a big smiley face is displayed on the screen, celebrating their achievement and fostering a positive learning environment.

## See more 👁️
- Link to the backend repository - https://github.com/KarinOchayon070/JSCodingMentorshipBackend.
- Link to YouTube explanatory video - https://www.youtube.com/watch?v=5OzKGoF__4o&ab_channel=KarinOchayon.

Thank you for checking out the frontend of the Online Coding Web Application.
If you have any questions or need further assistance, please don't hesitate to contact me. Happy coding!