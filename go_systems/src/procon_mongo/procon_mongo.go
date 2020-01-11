package procon_mongo

import (
	"fmt"
	"context"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"	

	"procon_config"	
)

type key string

const (
	HostKey     = key("hostKey")
	UsernameKey = key("usernameKey")
	PasswordKey = key("passwordKey")
	DatabaseKey = key("databaseKey")	
)

var ctx context.Context;
var client *mongo.Client;

func init()  {
	ctx = context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	
	ctx = context.WithValue(ctx, HostKey, procon_config.MongoHost)
	ctx = context.WithValue(ctx, UsernameKey, procon_config.MongoUser)
	ctx = context.WithValue(ctx, PasswordKey, procon_config.MongoPassword)
	ctx = context.WithValue(ctx, DatabaseKey, procon_config.MongoDb)

	uri := fmt.Sprintf(`mongodb://%s:%s@%s/%s`,
		ctx.Value(UsernameKey).(string),
		ctx.Value(PasswordKey).(string),
		ctx.Value(HostKey).(string),
		ctx.Value(DatabaseKey).(string),
	)
	clientOptions := options.Client().ApplyURI(uri)
	
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	
	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil { fmt.Println(err); } else { fmt.Println("Mongo Connected"); }
}

func GetDocument(db string, col string, key string, value string) (map[string]interface{}, bool) {
	var xdoc map[string]interface{}
	filter := bson.D{{key, value}}
	
	collection := client.Database(db).Collection(col);
	err := collection.FindOne(ctx, filter).Decode(&xdoc);
	if (err != nil && xdoc == nil) { 
		fmt.Println("Document Doesn't Exist @ Mongo: w/ ", err)
		return nil, false
	}else {
		return xdoc, true
	}
}
