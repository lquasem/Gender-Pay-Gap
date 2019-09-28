DELETE FROM  pay_gap_by_race;
SELECT * from pay_gap_by_race
CREATE TABLE pay_gap_by_race(
    ID INT PRIMARY KEY     NOT NULL,
    CategoryIndex VARCHAR(50) NOT NULL,
    Category VARCHAR(50) NULL,
    Total_Workers INT NULL,
    Median_Weekly_Earnings INT NULL,
    Year INT NULL)
	
Drop table pay_gap_by_education;

CREATE TABLE pay_gap_by_education(
    ID INT PRIMARY KEY     NOT NULL,
    Education_level VARCHAR(50) NOT NULL,
    Median_weekly_earnings_in_2018 INT NULL,
    Median_weekly_earnings_in_2017 INT NULL,
    Median_weekly_earnings_in_2016 INT NULL,
    Gender VARCHAR(50) NULL)
	
SELECT * from pay_gap_by_education

drop table pay_gap_by_country
CREATE TABLE pay_gap_by_country(
    ID INT PRIMARY KEY NOT NULL,
    Country VARCHAR(50) NOT NULL,
	Latitude TEXT NOT NULL,
	Longitude TEXT NOT NULL,
    Sex VARCHAR(20) NOT NULL,
    Occupation VARCHAR(50) NOT NULL,
	Currency text Not NULL,
    Survey text NULL,
	Type_of_Source text NULL,
    Year_2016_Earnings INT NULL) 
	
select * from pay_gap_by_country
delete from pay_gap_by_country