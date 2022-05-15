const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

const playerPosition = {};

describe("my awesome project", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test("joinRoom", (done) => {
        serverSocket.on("joinRoom", (arg) => {
            expect(arg).toBe("RoomCode");
            serverSocket.emit("errorMessage", "Wrong CODE!");
            done();
        });
        clientSocket.emit("joinRoom", "RoomCode");
        clientSocket.on("errorMessage", (arg) => {
            expect(arg).toBe("Wrong CODE!");
            done();
        })
    });

    test("newRoom", (done) => {
        const room = {};
        serverSocket.on("newRoom", (arg) => {
            room[arg] = {id: "lol"};
            expect(arg).toBe("RoomCode");
            serverSocket.emit("createRoom", room);
            done();
        });
        clientSocket.emit("newRoom", "RoomCode");
        clientSocket.on("createRoom", (arg) => {
            expect(arg["RoomCode"].id).toBe("lol");
            done();
        })
    });

    test("newGame", (done) => {
        serverSocket.on("joinRoom", (arg) => {
            expect(arg).toBe("RoomCode");
            serverSocket.emit("errorMessage", "Wrong CODE!");
            done();
        });
        clientSocket.emit("joinRoom", "RoomCode");
        clientSocket.on("errorMessage", (arg) => {
            expect(arg).toBe("Wrong CODE!");
            done();
        })
    });



    test("playerFinished", (done) => {
        serverSocket.on("playerFinished", (arg) => {
            expect(arg).toBe("RoomCode");
            serverSocket.emit("Finished", "Finished");
            done();
        });
        clientSocket.emit("playerFinished", "RoomCode");
        clientSocket.on("Finished", (arg) => {
            expect(arg).toBe("Finished");
            done();
        })
    });

});