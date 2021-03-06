// const http = require("http");
// const express = require("express");
// const Websocket = require("ws");

// const app = express();
// const server = http.createServer(app);
// const wss = new Websocket.Server({ server });

// class DancerSocket {
//     constructor(ws, dancerName, dancerAgent) {
//         this.ws = null;
//         this.clientIp = null;
//         this.dancerName = dancerName;
//         this.init(ws);
//         this.dancerAgent = dancerAgent;
//     }
//     init = (ws) => {
//         this.ws = ws;
//     };
//     handleMessage = () => {
//         this.ws.onmessage = (message) => {
//             const [task, payload] = JSON.parse(message.data);
//             console.log("Client response: ", task, "\nPayload: ", payload);

//             switch (task){
//                 case "boardInfo":{
//                     this.dancerAgent.addDancerClient(this.dancerName, this);
//                     return;
//                 }
//             }

//             this.dancerAgent.socketRecieveData(this.dancerName, {
//                 task: task,
//                 payload: payload,
//                 type: "dancer"
//             })
//         };
//     };
//     handleDisconnect = () => {
//         this.ws.onclose = (mes) => {
//             this.dancerAgent.deleteDancerClient(this.dancerName, this);
//         }
//     }
//     sendDataToRpiSocket = (data) => {
//         if (this.ws !== null) this.ws.send(JSON.stringify(data));
//     };
//     getClientIp = () => {
//         if (this.ws !== null) {
//             console.log(this.ws._socket.remoteAddress);
//             this.clientIp = this.ws._socket.remoteAddress;
//         }
//     };
//     //below are functions for editor server to use
//     start = () => {
//         this.sendDataToRpiSocket(["start"]);
//     };
//     play = (startTime = 0, whenToPlay = 0) => {
//         this.sendDataToRpiSocket([
//             "play",
//             {
//                 startTime: startTime,
//                 whenToPlay: whenToPlay,
//             },
//         ]);
//     };
//     pause = () => {
//         this.sendDataToRpiSocket(["pause"]);
//     };
//     stop = () => {
//         this.sendDataToRpiSocket(["stop"]);
//     };
//     load = () => {
//         this.sendDataToRpiSocket(["load"]);
//     };
//     terminate = () => {
//         this.sendDataToRpiSocket(["terminate"]);
//     };
//     kick = () => {
//         this.sendDataToRpiSocket(["kick"]);
//     };
//     uploadControl = (controlFile) => {
//         //needs to be json file
//         this.sendDataToRpiSocket(["uploadControl", controlFile]);
//     };
//     uploadLED = (LEDPic) => {
//         this.sendDataToRpiSocket(["uploadLED", LEDPic]);
//     };
//     shutDown = () => {
//         this.sendDataToRpiSocket(["shutDown"]);
//     };
//     reboot = () => {
//         this.sendDataToRpiSocket(["reboot"]);
//     };
//     lightCurrentStatus = (currentStatus) => {
//         this.sendDataToRpiSocket(["lightCurrentStatus", currentStatus]);
//     };
//     getBoardInfo = () => {
//         this.sendDataToRpiSocket(["boardInfo"]);
//     }
// }

// //below are for testing
// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// //above are for testing

// wss.on("connection", (ws) => {
//     const routerSocket = new DancerSocket(ws);
//     routerSocket.handleMessage();
//     routerSocket.handleDisconnect();
//     //below are for testing
//     rl.on("line", (input) => {
//         console.log(`Your input: ${input}`);
//         switch (input) {
//             case "start":
//                 routerSocket.start();
//                 break;
//             case "play":
//                 routerSocket.play();
//                 break;
//             case "pause":
//                 routerSocket.pause();
//                 break;
//             case "stop":
//                 routerSocket.stop();
//                 break;
//             case "load":
//                 routerSocket.load();
//                 break;
//             case "terminate":
//                 routerSocket.terminate();
//                 break;
//             case "kick":
//                 routerSocket.kick();
//                 break;
//             case "uploadControl":
//                 routerSocket.uploadControl({
//                     //testing json file
//                     testing: 1,
//                     filename: "test",
//                     currenttime: 1111111,
//                     data: "asdfasdfasdfa",
//                 });
//                 break;
//             case "uploadLed":
//                 routerSocket.uploadLED();
//                 break;
//             case "shutDown":
//                 routerSocket.shutDown();
//                 break;
//             case "reboot":
//                 routerSocket.reboot();
//                 break;
//             case "boardInfo":
//                 routerSocket.getBoardInfo();
//                 break;
//         }
//     });
//     //above are for testing
// });

// const PORT = 8080;

// server.listen(PORT, () => {
//     console.log(`Listening on http://localhost:${PORT}`);
// });
class DancerSocket {
    constructor(ws, dancerName, dancerAgent) {
        this.ws = null;
        this.clientIp = null;
        this.dancerName = dancerName;
        this.dancerAgent = dancerAgent;
        this.init(ws);
    }
    init = (ws) => {
        this.ws = ws;
        this.dancerAgent.addDancerClient(this.dancerName, this);
    };
    handleMessage = () => {
        this.ws.onmessage = (message) => {
            const [task, payload] = JSON.parse(message.data);
            console.log(`${this.dancerName} response: `, task, "\nPayload: ", payload);

            this.dancerAgent.socketReceiveData(this.dancerName, {
                task: task,
                payload: payload,
                type: "dancer"
            })
        };
    };
    handleDisconnect = () => {
        this.ws.onclose = (mes) => {
            this.dancerAgent.deleteDancerClient(this.dancerName, this);
        }
    }
    sendDataToRpiSocket = (data) => {
        if (this.ws !== null) this.ws.send(JSON.stringify(data));
    };
    getClientIp = () => {
        if (this.ws !== null) {
            console.log(this.ws._socket.remoteAddress);
            this.clientIp = this.ws._socket.remoteAddress;
        }
    };
    //below are functions for editor server to use
    start = () => {
        this.sendDataToRpiSocket(["start"]);
    };
    play = (startTime = 0, whenToPlay = 0) => {
        this.sendDataToRpiSocket([
            "play",
            {
                startTime: startTime,
                whenToPlay: whenToPlay,
            },
        ]);
    };
    pause = () => {
        this.sendDataToRpiSocket(["pause"]);
    };
    stop = () => {
        this.sendDataToRpiSocket(["stop"]);
    };
    load = () => {
        this.sendDataToRpiSocket(["load"]);
    };
    terminate = () => {
        this.sendDataToRpiSocket(["terminate"]);
    };
    kick = () => {
        this.sendDataToRpiSocket(["kick"]);
    };
    uploadControl = (controlFile) => {
        //needs to be json file
        this.sendDataToRpiSocket(["uploadControl", controlFile]);
    };
    uploadLED = (LEDPic) => {
        this.sendDataToRpiSocket(["uploadLED", LEDPic]);
    };
    shutDown = () => {
        this.sendDataToRpiSocket(["shutDown"]);
    };
    reboot = () => {
        this.sendDataToRpiSocket(["reboot"]);
    };
    lightCurrentStatus = (currentStatus) => {
        this.sendDataToRpiSocket(["lightCurrentStatus", currentStatus]);
    };
    getBoardInfo = () => {
        this.sendDataToRpiSocket(["boardInfo"]);
    }
}

module.exports = DancerSocket;