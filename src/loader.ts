import server from "./Config/server";

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log("Server is running on port 3333");
});
