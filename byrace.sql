CREATE TABLE IF NOT EXISTS data (
household_data VARCHAR(28) NULL,
total_workers_2017 INT NULL,
total_workers_2018 INT NULL,
median_weekly_earnings_2017 INT NULL,
median_weekly_earnings_2018 INT NULL
);

INSERT INTO data VALUES
("Total",113272,115567,860,886),
("Men",62980,64142,941,973),
("Women",50291,51425,770,789),
("White",87730,88953,890,916),
("Men",50003,50570,971,1002),
("Women",37727,38384,795,817),
("Black or African American",14521,15041,682,694),
("Men",6928,7282,710,735),
("Women",7593,7760,657,654),
("Asian",7320,7643,1043,1095),
("Men",4014,4169,1207,1241),
("Women",3306,3474,903,937),
("Hispanic or Latino ethnicity",19615,20297,655,680),
("Men",11896,12226,690,720),
("Women",7719,8071,603,617);