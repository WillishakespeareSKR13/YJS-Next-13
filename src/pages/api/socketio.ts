import { Server, Socket } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";

const host = process.env.HOST ?? "localhost";
const port = parseInt(`${process.env.PORT ?? 1234}`);

const ioHandler = (req, res) => {
  const io = new Server(res.socket.server);
  const ysocketio = new YSocketIO(io, {
    // authenticate: (auth) => auth.token === 'valid-token',
    // levelPersistenceDir: './storage-location',
    // gcEnabled: true,
  });

  ysocketio.initialize();

  io.on("connection", (socket: Socket) => {
    console.log(`[connection] Connected with user: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[disconnect] Disconnected with user: ${socket.id}`);
    });

    socket.on('form',(data)=>{
      console.log(data);
    })

  });

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
