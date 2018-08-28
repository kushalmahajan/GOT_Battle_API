# GOT_Battle_API
A basic demonstration to build some stats by parsing a CSV file in Express.js


Steps to follow
1. After cloning, do a npm install.
2. If using my mlab connection, that's fine and API's should work great.  But in case experimenting with own remote database or 
   local conection do modify the conection string and importantly, please uncomment the line 

       require('./loadCSV')(app); 
       
   from index.js file. This helps in loading the CSV file data for the battles in Game of thrones and stores in database
   
 3. Run the project by `node` or `nodemon` on cmd / terminal. 
   
4. APIs available at http://localhost:9001/api/battle/

     a. http://localhost:9001/api/battle/list

     b. http://localhost:9001/api/battle/count

     c. http://localhost:9001/api/battle/stats

     d. http://localhost:9001/api/battle/search?king=Robb Stark
