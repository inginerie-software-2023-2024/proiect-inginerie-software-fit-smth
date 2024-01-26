# Contributin to PowerUp

### The following is a set of guidelines for contributin to PowerUp and its packages. Feel free to propose changes to this document in a pull request.


## What should I know before I get started?
  PowerUp is a software project created in React.js and Node.js that is using many dependencies. To get sense for all the dependences, run the initial project and see how it works. 
     Here is a list of the big ones:
     - nodemailer
     * cookie-parser
     + bcrypt
     bla bla bla

## Design Decisions
  When we make a significant decision in how we maintain the project, we will document it in the [Design-decision.md](https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fit-smth/blob/main/Design-decision) and you can also ask question in the messages section.

## How Can I Contribute?
  ### Reporting Bugs
  This section guides you through submitting a bug report for PowerUp. Before creating bug reports, please test very well the problem, checking a few times. You might be able to find the cause and fix things yourself. Most importantly, if you have problems with dependencies, delete package.json, write npm i and then run the project again. Check if you have the latest version of the project. There are chances that the problem is solved. 
   Anyways, if the problem persists, you can report the bug [here](https://github.com/inginerie-software-2023-2024/proiect-inginerie-software-fit-smth/issues). **Use a clear and descriptive title for the issue to identify the problem and describe the exact steps which reproduce the problem**

## Local development
  Connect to your local database, changint the connection variables in server/database.js
  Server is running on server 3001 and client is running on server 3000. Please Don't change the port.

## Pull Request
   Please follow these steps:

## Styleguides
  ***Git Commit Messages Styleguided***
         + Use the present teste ("Add feature" not "Added feature")
         - Limit the first line to 72 characters or less
        
   ***React.js Styleguided***
   ```   
   const ClassName {
   }
    
   export default ClassName;
   ```
  - Use node modules like *import React from 'react'*
       
   ***Node.js Styleguided***
  - Use routes and controllers 
  - Import node modules like *import bycript from "bcrypt"*
           
   ***Bootstrap Styleguided***
  - Use components for UI/UX
  - Includes the precompiled CSS, JavaScript, and font assets, along with source Less, JavaScript, and documentation
  - Extended with ***React-Bootstrap*** (Components special created for React projects)

## Additional Notes

  ***Report Bugs Issues Labels***
  1. **beginner** - Less complex issues which would be good first issues to work on for users who want to contribute
  2. **package-idea** - Feature request which might be good candidates for new packages
  3. **feedback** - General feedback more than bug reports or feature requests.
  4. **bug** - Confirmed bugs or reports that are very likely to be bugs.
        
  ***Pull Request Labels***
  1. **work-in-progress** - Pull requests which are still being worked on, more changes will follow.
  2. **needs-review** - Pull requests which need code review, and approval from core team.
  3. **needs-testing** - Pull requests which need manual testing.
      
