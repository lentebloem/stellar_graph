# stellar_graph

##Inspiration
As technology advances, our society is harnessing technology to make people’s life better. However, there are still two billion unbanked people in the world and many facing obstacles to financial access. As one of the most innovative and revolutionary non-profit organizations, Stellar (https://www.stellar.org/) is an open platform for building financial products that connect people everywhere. As Stellar, we feel compelled to use our learning to introduce this people to easier accesses to finance and make their world a better place. 

##What it does
For unbanked people who might not know much about finance and banking, or people who are more comfortable with traditional banks, StellarVista introduces them to online financial transactions by providing sweet graph representations that help people visualize the impact Stellar has, the number of people on the platform, and the number of transactions happening every day. StellarVista introduces the users to this innovative way of trading by convincing them that Stellar is a convenient and reliable platform to use. Thereby more we can raise financial literacy and promote financial awareness in more people. Joining Stellar might change their life! By also showing the awesome impacts the Stellar has, we hope to attract more organizations who are willing to work with or support Stellar to make the world a better place.
StellarVista also provides entries to micro-financing and Stellar community, which helps beginners in Stellar familiarize with basic operations and enable people to share tips in regards to financial transactions, thus making the platform educational.
##How we built it
* Fetch data using Horizon APIs 
* Graphic representations with D3.js
* Bootstrap, jQuery, AngularJS, and ion fonts
* Python server running locally
* Data are provided in Stellar API’s test data

## Challenges we ran into
Stellar was also a new platform for us, and the concepts they used are pretty abstract. We had to read the descriptions and developer guide many times to understand them and make sense of the data. This is also why graphic representations can be super helpful. People can learn about Stellar much easier from the graphic than from plain texts.
Also, both of the team members were not familiar with D3.js before the hackathon, and we spent less than 24 hours to learn it, which was pretty challenging. We were able to successfully make a force-dragging tree of lineage for account creation history, a zoomable sunburst pie chart for users’ transaction visualization, and a line chart of ledger header info over time showing transaction count, operation count, ledger close times, and fee pool. Finally we incorporated them into a large dashboard, which makes Stellar more visually impactful.
##Accomplishments that we're proud of
* Well-designed: The UI is elegant, helpful, and clean. The data visualization is intuitive.
* Personalized: Users can choose to minimize or close panels that they don’t need
* Responsive: Responsive web design allows users to see the website on different devices with good experiences
* Sustainable: Once put into place, it can run on the data provided by Stellar Core and Horizon API smoothly.
* Interactive: People can actually see themselves making an impact through our visualizations. The user experience is intimate and delightful.
* Flexible: Both organizations and users of Stellar can see the impact it is making. Therefore StellarVista is able to attract different kinds of people.
##What we learned
* Get it done mentality. There is always a way to make novel innovations, it just takes perseverance
* Some problems stumped us for many hours but in the end we did not need to compromise on functionality

## What's next for StellarVista
* Implement Stellar Community where users can help each other and get helped.
* Provide more data visualization and allow users to customize their dashboard.
* Build smooth entries for microfinancing projects by incorporating other APIs.
* Make the dashboard more personalized by providing more individual-related data display.
