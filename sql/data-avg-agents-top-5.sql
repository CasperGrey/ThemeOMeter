
-- query to return an agents top 5 songs picked
SELECT 
	da.agent_name,    
    givenScores.TopScore,
	givenScores.song_name
    
FROM dimagents da

LEFT JOIN (
	SELECT * FROM (	
		SELECT avg(f.song_raw_score) as TopScore, da.agent_id, f.theme_id, ds.song_id, ds.song_name 
		FROM factscores f
		LEFT JOIN dimagents da on f.song_picker_id = da.agent_id
		LEFT JOIN dimsongs ds on f.song_id = ds.song_id
		WHERE 
			1 = 1
			AND f.valid_vote = 1
			AND f.song_picker_id = 7
			-- AND f.theme_id = 10 
		GROUP BY da.agent_name, f.theme_id
    ) AllScores
    ORDER BY TopScore DESC
	LIMIT 5
) AS givenScores ON da.agent_id = givenScores.agent_id

WHERE 
	1 = 1
    AND da.agent_id = 7
    
ORDER BY TopScore DESC
    
