
-- query to return all agents for a given theme id
SELECT 
	avg(f.song_raw_score) as ThemeScore, 
    dt.theme_name,
    f.theme_id,
    IF(dt.theme_id = 10,1,0) AS ThisThemeFlag

FROM 		factscores 	f
LEFT JOIN 	dimthemes 	dt on f.theme_id = dt.theme_id

WHERE 
	1 = 1
    AND f.valid_vote = 1
    -- AND f.theme_id = 10 
    
GROUP BY 
	dt.theme_name, 
    f.theme_id;



    
