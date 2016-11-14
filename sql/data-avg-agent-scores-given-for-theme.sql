
-- query to return how agent scored everyone else on a given theme
SELECT 
	agentscoring.agent_name AS Scorer,
    agentpicking.agent_name AS Picker,
    dt.theme_name AS ThemeName,
    avg(f.song_raw_score) as ThemeScore 
    -- IF(dt.theme_id = 10,1,0) AS ThisThemeFlag,

FROM 		factscores 	f
LEFT JOIN 	dimthemes 	dt 				on f.theme_id = dt.theme_id
LEFT JOIN 	dimagents 	agentscoring 	on f.agent_id = agentscoring.agent_id
LEFT JOIN 	dimagents 	agentpicking 	on f.song_picker_id = agentpicking.agent_id

WHERE 
	1 = 1
    AND f.valid_vote = 1
    AND f.theme_id = 20	-- given theme
    AND f.agent_id = 7	-- given user
    
GROUP BY 
	agentscoring.agent_name, 
    agentpicking.agent_name,
	dt.theme_name;
    


    
