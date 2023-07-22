# Project-3---Football-App

A Flask app was developed to show:
	European football stadiums on a leaflet map.  A custom marker was added to the map.
	A bar and line plot to compare total points(bar) and salary(line) for the top 6 teams
	A starburst chart to show league goals, team goals(top 6) and player goals(top 2)
Flask was received data from elephant SQL where our previous tables on season and match data were loaded

2 new datasets were prepared
	Stadium data showing, league, city, stadium name, squad name, capacity and a stadium fact
	Player goals table containing player, league, season, total goals

Stadium data was scraped from Stadiumguide.com.  Getting the stadium fact involved using beautiful soup.  There were 2 loops need to get the website for the stadium fact and then 2nd loop to gather the fact.

Player data used beautiful soup to scrap the data although this data was a simple format to the previous project we could not use the pd.read_html.

The Flask app also has a drop down to move between the the league.

We were not able to full functionality of the app but got the leaflet map to load with markers and the bar line plot to populate.  

A custom background was created for the webapp.

A fly.io app was created to display this project.

https://projectball.fly.dev/




