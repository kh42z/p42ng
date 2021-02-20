package main

import (
	"bufio"
	"encoding/json"
	"flag"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
)

type Message struct {
	Command    string            `json:"command"`
	Data       string   `json:"data,omitempty"`
	Identifier string			 `json:"identifier"`
	errc       chan error
}

type Command struct {
	Channel string `json:"channel"`
	RoomID int `json:"room_id"`
}

type Event struct {
	Type string `json:"type"`
	Message    json.RawMessage    `json:"message"`
	Data       json.RawMessage    `json:"data"`
	Identifier *Command `json:"identifier"`
}

type Data struct {
	Message string `json:"message"`
	Action  string `json:"action"`
}

func subscribe(channel string, roomID int) *Message {
	data, err := json.Marshal(Command{
		Channel: channel,
		RoomID: roomID,

	})
	if err != nil {
		log.Fatal("Unable to marshal")
	}
	return &Message{
		Command: "subscribe",
		Identifier: string(data),
	}
}

func receive(ws *websocket.Conn) {
	for {
		_, message,  err := ws.ReadMessage()
		if err != nil {
			log.Fatal(err)
		}
		e := Event{}
		err = json.Unmarshal(message, &e)
		if err != nil {
			log.Println("Unable to unmarshal rcv")
		}
		if e.Type != "ping" {
			log.Println("rcv:", string(message))
		}
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
	go receive(ws)
	if err := ws.WriteJSON(subscribe("ChatChannel", 2)); err != nil {
			log.Fatal(err)
	}
	for {
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Enter text: ")
		text, _ := reader.ReadString('\n')
		d := Data{Message: text, Action: "received"}
		data, err := json.Marshal(d)
		if err != nil {
			log.Println("Unable to marshal")
		}
		id, err := json.Marshal(Command{
			Channel: "ChatChannel",
			RoomID: 2,

		})
		if err != nil {
			log.Fatal("Unable to marshal")
		}
		cmd := &Message{
			Command: "message",
			Identifier: string(id),
			Data: string(data),
		}
		if err := ws.WriteJSON(cmd); err != nil {
			log.Fatal(err)
		}

	}

	ws.Close()
}