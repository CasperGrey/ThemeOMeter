package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"google.golang.org/api/googleapi/transport"
	"google.golang.org/api/youtube/v3"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

var (
	query = flag.String("query", "David Bowie Space", "Search term")
	maxResults = flag.Int64("max-results", 1, "Max YouTube results")
)

const developerKey = "AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc"

func main() {
	flag.Parse()

	client := &http.Client{
		Transport: &transport.APIKey{Key: developerKey},
	}

	service, err := youtube.New(client)
	if err != nil {
		log.Fatalf("Error creating new YouTube client: %v", err)
	}


	db, err := sql.Open("mysql", "b720e1666c8258:b65e5b60@tcp(us-cdbr-azure-southcentral-f.cloudapp.net:3306)/thegreys_weekly_music")
	rows, err := db.Query("SELECT s.song_id,s.song_name,a.artist_name FROM dimsongs s JOIN dimartists a ON s.artist_id=a.artist_id WHERE song_name is not null and video_id is null")
	if err != nil {
		db.Close()
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id string
		var song string
		var artist string
		if err := rows.Scan(&id, &song, &artist); err != nil {
			db.Close()
			log.Fatal(err)
		}
		video := youtubeQuery(service, song+" "+artist)
		fmt.Printf("%s, %s - %s : %s\n", id, song, artist, video)
		insert, err := db.Query("UPDATE dimsongs s SET video_id = ? WHERE song_id = ?", video, id)
		insert.Close()
		if err != nil {
			db.Close()
			log.Fatal(err)
		}

	}
	if err := rows.Err(); err != nil {
		db.Close()
		log.Fatal(err)
	}

	db.Close()




	//printIDs("Channels", channels)
	//printIDs("Playlists", playlists)
}


func youtubeQuery(service *youtube.Service, searchTerms string) string {
	// Make the API call to YouTube.
	call := service.Search.List("id,snippet").
		Q(searchTerms).
		MaxResults(1)
	response, err := call.Do()
	if err != nil {
		log.Fatalf("Error making search API call: %v", err)
	}

	// Iterate through each item and add it to the correct list.
	for _, item := range response.Items {
		switch item.Id.Kind {
		case "youtube#video":
			return item.Id.VideoId
		case "youtube#channel":
		case "youtube#playlist":
			// Ignore
		}
	}
	return ""
}

// Print the ID and title of each result in a list as well as a name that
// identifies the list. For example, print the word section name "Videos"
// above a list of video search results, followed by the video ID and title
// of each matching video.
func printIDs(sectionName string, matches map[string]string) {
	fmt.Printf("%v:\n", sectionName)
	for id, title := range matches {
		fmt.Printf("[%v] %v\n", id, title)
	}
	fmt.Printf("\n\n")
}