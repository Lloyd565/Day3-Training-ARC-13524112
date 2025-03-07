import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

function getRandomWeather() {
    const temperatures = [20, 21, 22, 23, 24, 25,26,27, 28, 30, 32, 35];
    const conditions = ["Cerah", "Mendung", "Hujan", "Badai", "Berkabut"];
    const humidity = Math.floor(Math.random() * 51) + 50;

    return {
        temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity
    };
}

app.use((request, response, next) => {
    console.log(`[REQUEST]: ${request.method} ${request.originalUrl}`);
    next();
});


app.get("/weather/:city", (request, response) => {
    const city = request.params.city;
    const weather = getRandomWeather();
    
    response.json({ city, ...weather });
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
