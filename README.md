# GOT_Battle_API
A practice assignment to setup a basic node express server.


Steps to follow
1. After cloning, do a npm install.
2. If using my mlab connection, that's fine and API's should work great.  But in case experimenting with own remote database or 
   local conection do modify the conection string and importantly, please uncomment the line 

       require('./loadCSV')(app); 
       
   from index.js file. This helps in loading the CSV file data for the battles in Game of thrones and stores in database
   
 3. Run the project by `node index` or `nodemon index` on cmd / terminal. 
   
