from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from pprint import pprint
import sqlalchemy
from sqlalchemy import inspect
# Database Setup
#################################################
url = "postgresql://skbuqieh:YXm0YsioQnkqxA92fuujM6M9ozp8sLi5@ruby.db.elephantsql.com/skbuqieh"
engine = create_engine(url)

Base = automap_base()
Base.prepare(engine, reflect=True)
Base.metadata.tables  # Check tables, not much useful
Base.classes.keys()  # Get the table names
table_names = Base.metadata.tables.keys()
Stadiums = Base.classes.stadiums_data
Sunburst = Base.classes.sunburst_data
Wages = Base.classes.league_wages
Points = Base.classes.league_pts

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/stadiums/<league>')
def stadiums(league):
    session = Session(engine)
    response = session.query(Stadiums.city, Stadiums.club, Stadiums.stadium, Stadiums.cap, Stadiums.country,
                             Stadiums.longitude, Stadiums.latitude, Stadiums.trivia, Stadiums.league).filter(Stadiums.league == league).all()

    session.close()

    features = []
    for row in response:
        properties = {
            'city': row.city,
            'stadium_name': row.stadium,
            'squad_name': row.club,
            'capacity': row.cap,
            'stadium_fact': row.trivia
        }
        geometry = {
            'type': 'Point',
            'coordinates': [row.latitude, row.longitude]
        }
        feature = {
            'type': 'Feature',
            'geometry': geometry,
            'properties': properties
        }
        features.append(feature)

    geojson_data = {
        'type': 'FeatureCollection',
        'features': features
    }

    return geojson_data


@app.route('/api/wages/points/<league>')
def wages_points(league):
    session = Session(engine)
    response_wages_pts = session.query(Wages.league, Wages.avgofannual_wages, Wages.squad, Points.avg_pts)\
        .join(Points, Wages.squad == Points.squad)\
        .filter(Wages.league == league)\
        .order_by(Wages.league.asc(), Points.avg_pts.desc()).all()

    session.close()

    league_wage_pts = {}
    squad_names = []
    avg_wages = []
    avg_points = []
    for row in response_wages_pts:
        squad_name = row.squad
        wage = round(row.avgofannual_wages/1000000, 2)
        point = row.avg_pts
        squad_names.append(squad_name)
        avg_wages.append(wage)
        avg_points.append(point)

    league_wage_pts['league'] = response_wages_pts[0][0]
    league_wage_pts['squad_name'] = squad_names
    league_wage_pts['avg_wage'] = avg_wages
    league_wage_pts['points'] = avg_points
    return jsonify(league_wage_pts)


@app.route('/api/goals/<league>')
def goals(league):
    session = Session(engine)
    response_sunburst = session.query(Sunburst.league, Sunburst.league_total_goals, Sunburst.squad, Sunburst.squad_total_goals, Sunburst.player, Sunburst.player_total_goal)\
        .filter(Sunburst.league == league)\
        .order_by(Sunburst.squad.asc(), Sunburst.player_total_goal.desc()).all()

    session.close()

    result = {'league_name': response_sunburst[0][0],
              'league_goals': response_sunburst[0][1],
              'teams': []}

    team_dict = {}

    for row in response_sunburst:
        squad_name = row.squad
        squad_goals = row.squad_total_goals
        player_name = row.player
        player_goals = row.player_total_goal

        if squad_name not in team_dict.values():

            team_dict = {'squad_name': squad_name,
                         'squad_goals': squad_goals,
                         'players': []}

            result['teams'].append(team_dict)

        player_dict = {'player_name': player_name,
                       'player_goals': player_goals}

        team_dict['players'].append(player_dict)

    labels = []
    parents = []
    values = []
    labels.append(result['league_name'])
    parents.append('')
    values.append(result['league_goals'])

    try:

        for team in result['teams']:  # [:6]
            team_name = team['squad_name']
            labels.append(team_name)
            parents.append(result['league_name'])
            team_goals = team['squad_goals']
            values.append(team_goals)
            for j in range(2):
                player_name = team['players'][j]['player_name']
                labels.append(player_name)
                parents.append(team_name)
                player_goals = team['players'][j]['player_goals']
                values.append(player_goals)
    except IndexError:
        print(IndexError)

    team_player_goals = {'labels': labels,
                         'parents': parents,
                         'values': values}

    return jsonify(team_player_goals)


if __name__ == '__main__':
    app.run(debug=True)
