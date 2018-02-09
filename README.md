# auto-fill-files
Coding assessment

# Checkin-1
Analysis of the assignment.
Choice of package for pdf filling is made.(Trade off and reasoning mentioned in Thought process)
Facebook Boilerplate for React (frontend) and file structure.

# Checkin-2
A Node.js service using Express.js is created that can accept an address is created.(TODO: Error scenarios handling)

# Checkin-3
Frontend React app is submitted for Part-1 of the assignment.
API updated to allow CORS requests.

#Thought process
Part-1:
- Out of all the pdffiller packages mentioned, pdf-fill-form is the best since it supports checkbox and radio buttons too over pdffiller. 
  A tradeoff is made due to windows development and choose pdffiller, which suffices the requirement.

#Instructions to run the solution.The list do not contain trivial installations like node, React boiler plate(create-react-app).
- This solution requires a windows system.
- Install pdftk software before installing pdffiller package at https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/.
- Clone the code to local machine.
- Navigate to the downloaded path in a command prompt.
- Run Node.js service first using the command "node fillService.js". Now the service will be up and running on port 5000
- Open a new command prompt and navigate to fronend folder
- Run React app using command "npm start"


