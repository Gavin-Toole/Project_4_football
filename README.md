# Project_4_football
Final Project for Data Analytics and Visualization Bootcamp

Our projects built the previous projects. Summary of each project/stage are provided below with each final data on its own branch


Bootcamp Project 1 - Analysis-and-Visualizaition Branch
Team Members are: Mauricio Avila, Doran Rainford, Jeremy Mallory, Gurpreet Chugh, Anthony Verma, Gavin Toole
Do fans affect a teams winning percentage?
What statistic best predicts team success?
Which league is them most competitive?
The 6 major European Leagues were analyzed:
    EPL – English Premier League  
    Serie A – Italian League
    La Liga – Spanish League
    Bundesliga -- German League
    La Ligue – France League
    UEFA Champions League

Data was retrieved from: https://fbref.com/en

5 seasons of data were retrieved, cleaned and analyzed for each league and then combined to 2 DataFrames: Team Summary and Match Summary

Each team member was responsible for gather, cleaning, merging, and concatenating the data for their specific league and writing the 2 csv files to the data folder

12 csv files were combined into 2 final DataFrames representing Team Summary for all leagues and 5 seasons and Match Summary for all leagues and 5 seasons

DataFrames were analyzed for null rows and consistence.

Analysis was performed on win percentage vs if fans were in attendance.  There were a number of games with no fans in attendance during COVID.  

Average Team Age was compare across leagues assuming a younger team would win more games.  The teams all had similar ages

Wages across the leagues were compared in terms of total wages for the 5 seasons as will as year wages for the 5 years.

We then compared the number of points verse Possession, Annual Wages, Actual and Expected Goals Scored and Actual and Expected Goals Conceded.  Linear regression was done on each of these scatter plots and was found the wages had the least correlation with points while goals scored had the best correlation.

Some of the implications included weather was not taken into account and as the European leagues are all of similar elevation, it can be expected that results where the evaluation changes (South America) results may be different.  It was also determined that high wages doesn't produce a more successful team.

Project 2 - ETL Branch

During this project we add all our data files to Elephant SQL in preparation to project 3

Project 3 - Flash App Branch
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

Project 4 Machine Learning Branch

