import fs from "fs/promises";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use((req, res, next) => {
	const requestIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
	const requestProtocol = req.headers["x-forwarded-proto"] || req.protocol;
	console.log(`[REQUEST]: ${requestIp}: (${requestProtocol}) ${req.originalUrl}`);
	next();
});
app.get("/home", (request, response) => {
	response.write("Halo!");
	response.end();
});
app.put("/add-data", bodyParser.urlencoded({ extended: true }), async (request, response) => {
	console.log(request.body);
	const randomId = Math.random().toString(36).substring(2, 7);
	await fs.writeFile(`test-${randomId}.json`, JSON.stringify(request.body), "utf-8");
	response.write(`Data ditambahkan dengan id: ${randomId}`);
	response.end();
});
app.get("/get-data/:id", async (request, response) => {
	const filePath = `test-${request.params.id}.json`;
	const fileContent = await fs.readFile(filePath, "utf-8");
	const fileData = JSON.parse(fileContent);
	response.json(fileData);
});
app.delete("/delete-data/:id", async (request, response) => {
	const filePath = `test-${request.params.id}.json`;
	await fs.rm(filePath, { force: true });
	response.write(`Data berhasil dihapus!`);
	response.end();
});
// Patch updates are left for the readers' excercise

app.listen(3000, () => {
	console.log("Server started at port 3000");
});