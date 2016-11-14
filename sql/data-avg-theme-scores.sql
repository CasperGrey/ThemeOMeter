
-- query to return all agents for a given theme id
SELECT 
	da.*, 
    receivedScores.ReceivedScore,     
    givenScores.GivenScore,
    receivedScores.theme_id

FROM dimagents da

LEFT JOIN (
	-- average score received for theme
	SELECT avg(f.song_raw_score) as ReceivedScore, da.agent_name, f.theme_id 
	FROM thegreys_weekly_music.factscores f
	LEFT JOIN dimagents da on f.song_picker_id = da.agent_id
	WHERE 
		1 = 1
        AND f.valid_vote = 1
        AND f.theme_id = 10 
	GROUP BY da.agent_name, f.theme_id
) AS receivedScores ON da.agent_name = receivedScores.agent_name

LEFT JOIN (
	-- average score given for theme
	SELECT avg(f.song_raw_score) as GivenScore, da.agent_name, f.theme_id 
	FROM thegreys_weekly_music.factscores f
	LEFT JOIN dimagents da on f.agent_id = da.agent_id
	WHERE 
		1 = 1
		AND f.valid_vote = 1
        AND f.theme_id = 10 
	GROUP BY da.agent_name, f.theme_id
) AS givenScores ON da.agent_name = givenScores.agent_name

WHERE 
	1 = 1
	AND da.agent_valid = 1
    
