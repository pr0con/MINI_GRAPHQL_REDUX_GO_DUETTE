var fs = require('fs');
var https = require('https');

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser'); 

const utils = require('./utilz.js');

const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/www/parcel_blueprint/dist/uploads')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

        // You could use the original name
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})


const k3yc3r7  = { 
	key: fs.readFileSync('/etc/letsencrypt/live/delilah.pr0con.com/privkey.pem'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/delilah.pr0con.com/cert.pem'),
	key_path: '/etc/letsencrypt/live/delilah.pr0con.com/privkey.pem',
	cert_path: '/etc/letsencrypt/live/delilah.pr0con.com/cert.pem', 
};

function logData(message) {
 var d = new Date();
 var time = '[' + d.getHours() + ':' + d.getMinutes() + ':' +d.getSeconds() + '] ';
 
 console.log(time + message);
} 


const getReqToken = (req) => {
	const tok = req.headers['gql-auth-token']
	if(jwt) {
		try {
			return jwt.verify(tok, utils.system_configuration['secret']) 
		} catch(error) {
			return "Notta";
		}
	}
	return "Notta";
}

const app = express(); 
app.use(cors());

/* GraphQL Apollo Related */
//let data = require('./data.js');
const data = require('./models/index.js');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');


const apollo = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({
		data,
		secret: utils.system_configuration['secret'],
		who: getReqToken(req)
	})
});
apollo.applyMiddleware({ app })



https.createServer({
  key: k3yc3r7.key,
  cert:k3yc3r7.cert
},		
app).listen(3000, ()=> {
	logData('Express Server Listening...');
	
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	    next();
	});
	
			
	app.get('/', (req,res) => {
		res.send('pr0con.com public access API');
	});
	
	app.post("/upload", upload.single('photo'), (req, res) => {
	    return res.json({
	        image: req.file.path
	    });
	});	
								
});	



