import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req,res) => {
    const usuario = {
         username: req.body.username,
         avatar: req.body.avatar
    }
    usuarios.push(usuario);
    res.send({message: "OK", usuarios})

} );

app.post("/tweets", (req,res) => {
    const username = req.body.username;
    const tweet = req.body.tweet;
	const newTweet = { username, tweet }
	const cadastrado = usuarios.find(item => item.username === username)

	if (cadastrado) {
		tweets.push(newTweet);
		res.send({message: "OK"});

	} else { res.send({message: "UNAUTHORIZED"}) }
})

app.get("/tweets", (req, res) => {

	if (tweets.length === 0) {
		res.send([])
	} else {
		const todosTweets = tweets.slice(-10)
		const tweetsPage = todosTweets.map((item) => {
			const usuario = usuarios.find(usuario => usuario.username == item.username)
			return {
				...item,
				avatar: usuario.avatar
			}
		})
		res.send(tweetsPage)
	}
	
})



app.listen(5000, () => console.log("Servidor rodando"))