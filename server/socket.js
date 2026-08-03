export default function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User Connected", socket.id);
    
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send_message", (message) => {

  io.to(message.conversation_id).emit(
    "receive_message",
    message
  );

});

    socket.on("disconnect", () => {

      console.log("Disconnected");

    });

  });
}