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

# Checkin-4
API created to read custom fillable files.
API to fill files is updated to support custom fillable files.

#Thought process
Part-1:
- Out of all the pdffiller packages mentioned, pdf-fill-form is the best since it supports checkbox and radio buttons too over pdffiller. 
  A tradeoff is made due to windows development and choose pdffiller, which suffices the requirement.

Part-2:
Backend API:
- New API has to be created to extract fields from custom fillable files and upload the file on server so it can be used again to fill. 
  File name is appended in the response of the service to use it when user fills the document.
- API created for filling default(address)  field has to be reused to fill custom files too.
Frontend:
- Separate Components created for filling fields and extracting fields.
- Post extraction of fields from API, filling fields component is reused.
- Filling fields and extraction components communication is done via Grandparent component (avoided Redux doing this)
- Main component handles only routing and a messanger between Grandparent(App) and grandchildren components(Fillfile and FillCustomFile)
- Handling states is tricky.

What could have been done better?(Tradeoffs to adhere to the timeline)
- pdf-fill-form package could have been used to support OSX too.
- Better error handling could have been done.
- Multiple custom files scenario could be developed.(Marked blocks in the code that has to be updated for this)
- Elegant UI.

#Instructions to run the solution.The list do not contain trivial installations like node, React boiler plate(create-react-app).
- This solution requires a windows system.
- Install pdftk software before installing pdffiller package at https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/.
- Clone the code to local machine.
- Navigate to the downloaded path in a command prompt.
- Run "npm install" command to install all dependencies.
- Run Node.js service first using the command "node fillService.js". Now the service will be up and running on port 5000
- Open a new command prompt and navigate to fronend folder.
- Run "npm install" command to install all dependencies.
- Run React app using command "npm start".
- All uploaded and complete files will be found under assets folder.



