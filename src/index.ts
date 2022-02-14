import Fastify from 'fastify';
import pointOfView from 'point-of-view';
import Mustache from 'mustache';
import axios from 'axios';
import {Client} from 'pg';
require('dotenv').config();

const client = new Client();

async function getUserInfos(userId: string) {
    try {
        const result = await axios.get(`https://discord.com/api/v10/users/${userId}`, {
            headers: {
                'authorization' : `Bot ${process.env.BOT_TOKEN}`,
                'Content-Type' : 'application/json'
            }
        });

        //le résultat est dans result.data
        console.log(result.data);
    }
    catch(error) {
        console.error('Erreur');
    }
}

const server = Fastify({logger: true});
server.register(pointOfView, {
    engine: {
        mustache: Mustache
    }
});

interface guildParams {
    guildId : string
}

server.get<{Params: guildParams}>('/:guildId', async (req, res) => {
    const guildId = req.params.guildId;
    return res.view('rank.mustache', {name: req.params.guildId});
});

const start = async () => {
    await server.listen(8081);
};

start();
