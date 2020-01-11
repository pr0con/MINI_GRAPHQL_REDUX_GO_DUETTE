package main

import(
	//Native
	"fmt"
	"flag"
	"net/http"
	
	//3rd Party Packages
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	
	//Our Packages
	"procon_data"
	"procon_rest"	
)

var addr = flag.String("addr", "0.0.0.0:1200", "http service address")
var upgrader = websocket.Upgrader{}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("WTF @HandleAPI Ws Upgrade Error>", err)
		return
	}
	
	id, err := uuid.NewRandom() 
	if err != nil { fmt.Println(err) }
	
	c.Uuid = "ws-"+id.String()
	procon_data.SendMsg("^vAr^", "client-websocket-id", c.Uuid, c);

	Loop:
		for {
			in := procon_data.Msg{}	
			
			err := c.ReadJSON(&in)
			if err != nil {
				c.Close()
				break Loop
			}
			
			
			switch(in.Type) {
				case "get-jwt-token":
					fmt.Println(in.Data);				
					break;
				default:
					break;								
			}
		}				
	
}

func main() {
	r := mux.NewRouter()
	
	//Weboscket Route
	r.HandleFunc("/ws", handleAPI)
	
	//Rest Route
	r.HandleFunc("/rest/get/{what}", procon_rest.HandleRest)
	
	
	//System Boot
	fmt.Println("Server Running")
	http.ListenAndServeTLS(*addr,"/etc/letsencrypt/live/ICORUMBA/cert.pem", "/etc/letsencrypt/live/ITSDOLLYFNPARTON/privkey.pem", r)	
	//this kid is weird....??? .... i am an easter egg....
}