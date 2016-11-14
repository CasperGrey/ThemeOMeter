
-- query to return all scores for a given agent so can compare how they went
-- use where agent_id to choose who
SELECT 
	avg(f.song_raw_score) as ThemeScore, 
    dt.theme_name,
    f.theme_id,
    da.agent_id,
    da.agent_name,
    IF(dt.theme_id = 10,1,0) AS ThisThemeFlag

FROM 		factscores 	f
LEFT JOIN 	dimthemes 	dt on f.theme_id = dt.theme_id
LEFT JOIN 	dimagents 	da on f.agent_id = da.agent_id

WHERE 
	1 = 1
    AND f.valid_vote = 1
    AND da.agent_id = 7
    -- AND f.theme_id = 10 
    
GROUP BY 
	dt.theme_name, 
    f.theme_id, 
    da.agent_id;



    
