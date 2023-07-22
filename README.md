# Project-Football
Bootcamp Project 1
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

Each team member was responsible for gather, cleaning, merging, and concatinating the data for thier specific league and writing the 2 csv files to the data folder

12 csv files were combined into 2 final DataFrames representing Team Summary for all leagues and 5 seasons and Match Summary for all leagues and 5 seasons

DataFrames were analyzed for null rows and consistence.

Analysis was perfomred on win percentage vs if fans were in attendance.  There were a number of games with no fans in attendance during COVID.  

Average Team Age was compare across leagues assuming a younger team would win more games.  The teams all had simialr ages

Wages across the leages were compared in terms of total wages for the 5 seasons as will as year wages for the 5 years.

We then compared the number of points verse Possession, Annual Wages, Acutal and Expected Goals Scored and Actual and Expected Goals Conceded.  Linear regression was done on each of these scatter plots and was found the wages had the least correlation with points while goals scored had the best correlation.

Some of the implications inlcuded weather was not taken into account and as the European leagues are all of similar elevation, it can be expected that results where the evelation changes (South Ammerica) results may be different.  It was also determined that high wages doesn't produce a more successful team.
