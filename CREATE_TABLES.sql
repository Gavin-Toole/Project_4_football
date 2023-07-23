-- Table: public.matches_data

-- DROP TABLE IF EXISTS public.matches_data;

CREATE TABLE IF NOT EXISTS public.matches_data
(
    id integer NOT NULL DEFAULT nextval('matches_data_id_seq'::regclass),
    tableindex integer,
    season character varying(255) COLLATE pg_catalog."default",
    wk double precision,
    date character varying(255) COLLATE pg_catalog."default",
    match_time character varying(255) COLLATE pg_catalog."default",
    home character varying(255) COLLATE pg_catalog."default",
    away character varying(255) COLLATE pg_catalog."default",
    home_score integer,
    away_score integer,
    xg_home double precision,
    xg_away double precision,
    attendance double precision,
    venue character varying(255) COLLATE pg_catalog."default",
    referee character varying(255) COLLATE pg_catalog."default",
    xg_diff double precision,
    actual_diff double precision,
    league character varying(255) COLLATE pg_catalog."default",
    team_data_id_home integer DEFAULT 0,
    team_data_id_away integer DEFAULT 0,
    CONSTRAINT idx_id PRIMARY KEY (id)
)





-- Table: public.player_data

-- DROP TABLE IF EXISTS public.player_data;

CREATE TABLE IF NOT EXISTS public.player_data
(
    id integer NOT NULL DEFAULT nextval('player_data_id_seq'::regclass),
    player character varying(255) COLLATE pg_catalog."default",
    squad character varying(255) COLLATE pg_catalog."default",
    mp integer,
    starts integer,
    mins character varying(255) COLLATE pg_catalog."default",
    Per_90 double precision,
    goals integer,
    goals_per90 double precision,
    seasons character varying(255) COLLATE pg_catalog."default",
    league character varying(255) COLLATE pg_catalog."default"
    
)

    
-- Table: public.seasons_data

-- DROP TABLE IF EXISTS public.seasons_data;

CREATE TABLE IF NOT EXISTS public.seasons_data
(
    id integer NOT NULL DEFAULT nextval('seasons_data_id_seq'::regclass),
    tableindex integer,
    season character varying(255) COLLATE pg_catalog."default",
    league_rank integer,
    squad character varying(255) COLLATE pg_catalog."default",
    num_players integer,
    avg_age double precision,
    avg_poss double precision,
    mp integer,
    w integer,
    d integer,
    l integer,
    gf integer,
    ga integer,
    gd integer,
    pts integer,
    pts_mp double precision,
    xg double precision,
    xga double precision,
    xgd double precision,
    xgd_90 double precision,
    attendance integer,
    annual_wages double precision,
    league character varying(255) COLLATE pg_catalog."default",
    team_data_id integer DEFAULT 0
    
)


-- Table: public.team_data

-- DROP TABLE IF EXISTS public.team_data;

CREATE TABLE IF NOT EXISTS public.team_data
(
    id integer NOT NULL DEFAULT nextval('team_data_id_seq'::regclass),
    season character varying(255) COLLATE pg_catalog."default",
    squad character varying(255) COLLATE pg_catalog."default",
    league character varying(255) COLLATE pg_catalog."default"

)
CREATE TABLE IF NOT EXISTS public.sunburst_data
(
    league character varying(255) COLLATE pg_catalog."default",
    league_total_goals double precision,
    squad character varying(255) COLLATE pg_catalog."default",
    squad_total_goals double precision,
    squad_rank bigint,
    player character varying(255) COLLATE pg_catalog."default",
    player_total_goal double precision,
    player_rank bigint
   
)

)
-- Table: public.stadiums_data

-- DROP TABLE IF EXISTS public.stadiums_data;

CREATE TABLE IF NOT EXISTS public.stadiums_data
(
    city character varying(255) COLLATE pg_catalog."default",
    club character varying(255) COLLATE pg_catalog."default",
    stadium character varying(255) COLLATE pg_catalog."default",
    cap character varying(255) COLLATE pg_catalog."default",
    country character varying(255) COLLATE pg_catalog."default",
    longitude double precision,
    latitude double precision,
    trivia_page_link text COLLATE pg_catalog."default",
    trivia text COLLATE pg_catalog."default",
    league character varying(255) COLLATE pg_catalog."default"
 
)

-- Table: public.league_pts

-- DROP TABLE IF EXISTS public.league_pts;

CREATE TABLE IF NOT EXISTS public.league_pts
(
    league character varying(255) COLLATE pg_catalog."default",
    avg_pts double precision,
    squad character varying(255) COLLATE pg_catalog."default",
    pts_rank integer
    
)


CREATE TABLE IF NOT EXISTS public.league_wages
(
    league character varying(255) COLLATE pg_catalog."default",
    avgofannual_wages double precision,
    squad character varying(255) COLLATE pg_catalog."default",
    wages_rank integer
    
)


ALTER TABLE sunburst add column ID serial Primary Key;
COPY persons TO 'C:\tmp\persons_db.csv' DELIMITER ',' CSV HEADER;