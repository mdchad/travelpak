// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Hocuspocus } from "@hocuspocus/server";

export default function handler(req, res) {
  const {
    query,
  } = req;

  const server = new Hocuspocus({
    name: "hocuspocus-fra1-01",
    port: 1234,
    timeout: 30000,
    debounce: 5000,
    maxDebounce: 30000,

    async onConnect() {
      console.log("connect", server.getConnectionsCount())
    },

    async connected() {
      console.log("connections:", server.getConnectionsCount());
    },

    async onDestroy(data) {
      // Output some information
      console.log(`Server was shut down!`);
    },
  });

// … and run it!
  server.listen().then((res) => {
    console.log(res)
  })

  if (query.connection === 'destroy') {
    // server.closeConnections()
    server.destroy().then((res) => {
      console.log('destroy')
      console.log(res)
    })
  }

  res.status(200).json({ name: 'John Doe' })
}
