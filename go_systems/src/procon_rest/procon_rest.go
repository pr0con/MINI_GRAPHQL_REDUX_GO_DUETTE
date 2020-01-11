package procon_rest

import(
	"fmt"
	"net/http"
	"encoding/json"
	
	"github.com/gorilla/mux"
	
	"procon_data"
	"procon_mongo"
)

func addHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*");
	(*w).Header().Set("Content-Type", "application/json");
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func sendRestMsgResp(w *http.ResponseWriter, jwt string, msg_type string, data string) {
	m := procon_data.Msg{jwt,msg_type,data}
	
	mm, err := json.Marshal(m)
	if err != nil { fmt.Println(err) } else {
		(*w).Write(mm)	
	} 	
}


func HandleRest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	get_what := params["what"]
	
	
	addHeaders(&w)
	
	switch(get_what) {
		case "slider-one":
			xdoc, res := procon_mongo.GetDocument("api","slider","sid", get_what);
			
			if res == true {
				jsonStr, err := json.Marshal(xdoc)
				if err != nil { fmt.Println(err) }else {
					m := procon_data.Msg{"^vAr^","got-something", string(jsonStr)};
					mm, err := json.Marshal(m)
					if err != nil { fmt.Println(err) } else {
						w.Write(mm)	
					} 						
				}		
			}
			break
		default:
			break
	}
	
		
}