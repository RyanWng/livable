# Livable
### Making New Zealand more livable with data and API! #SoTHackfest17

In today's fast moving world, there is an ever-increasing focus on productivity, leaving many of us living a lifestyle we are unable to live in comfortably. Auckland's housing crisis is a perfect example of this- many young professionals want to live in Auckland due to the job prospects, but are unable to due to the ridiculous cost of housing. 

Livable seeks to combine the existing data sets on the housing markets and the job market to determine a smart location for young professionals, people who are just moving to a new city (or even a new country!) and have few contacts, to find the best place for them to set up their new home. 

#### Usage
Livable displays the location of rental properties within the area of the map on your screen, and the job prospects within districts of the region you're currently looking at. The rental properties would contain a short description, address, weekly price and photographs, available from hovering over the pin on the map. The job prospects would in an ideal and open world show the amount of jobs available, the industry of these jobs, and the average salaries. Public data sets are not that generous. Livable displays the physical amount of jobs within a district, a great representation of the workforce prospects within an area of the country - many job offerings is indicative of large economic growth. 

#### Business Value 
A combination of data sets often provides market value for the owners of all data sets, and Livable is no exception. Trademe would be the main benefit from Livable, as not only do job prospects in lesser known parts of countries get fullfilled, when they previously wouldn't, but so would properties located around the aforementioned job prospects. Since Trademe takes a cut of all these transactions, Livable is in a prime position to increase Trademe's profits by increasing transaction amounts. 

#### Demo
Note: this assumes you already have npm installed. If you do not, see https://www.npmjs.com/get-npm for installation instructions.

For a demo of our product, download or clone the github repository, and navigate to the src folder contained within. 

To run, use the following commands  
npm install

on Mac or Linux, use  
npm start

on Windows, use  
& npm start

then go to  
http://localhost:3000/

Livable doesn't currently contain offline support, as rental opportunities are by their nature limited and accurate only to the date and time of the last extraction. Adding offline support for memory of job opportunities within previously viewed areas is a future consideration. 
