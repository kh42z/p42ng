package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

func readMsg(ws *websocket.Conn) {
	_, message,  err := ws.ReadMessage()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Received: %s.\n", message)

}

type Command struct {
	Command    string            `json:"command"`
	Data       json.RawMessage   `json:"data,omitempty"`
	Identifier string			 `json:"identifier"`
	errc       chan error
}

type CommandIdentifier struct {
	Channel string
}

func subscribe(channel string) *Command{
	data, err := json.Marshal(CommandIdentifier{
		Channel: channel,
	})
	if err != nil {
		log.Fatal("Unable to marshal")
	}
	return &Command{
		Command: "subscribe",
		Identifier: string(data),
	}
}

func main() {

	var token, uid, client string

	flag.StringVar(&token, "t", "", "access-token")
	flag.StringVar(&client, "c", "", "client")
	flag.StringVar(&uid, "u","69891", "uid")
	flag.Parse()

	url := "ws://localhost:3000/cable?access-token=" + token + "&client=" + client + "&uid=" + uid
	log.Printf("connecting to %s", url)

	req,_ := http.NewRequest("GET", url, nil)
	req.Header.Add("Origin", "http://localhost:3000/")
	ws, _, err := websocket.DefaultDialer.Dial(url, req.Header)
	if err != nil {
		log.Fatal("dial:", err)
	}
	readMsg(ws)

	if err := ws.WriteJSON(subscribe("1")); err != nil {
			log.Fatal(err)
	}
	readMsg(ws)
	ws.Close()
}