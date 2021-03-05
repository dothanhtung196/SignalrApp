var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").configureLogging(signalR.LogLevel.Information).build();

connection.on("ReceiveMessageStart", function (user, message) {
    console.log(`Hi ${user}, you said: ${message}`)
});

connection.on("ReceiveMessageFromGroup", function(message){
    console.log(message);
});

connection.on("ReceiveMessage", function(user, message){
    console.log(`${user}: ${message}`)
})

connection.start().then(function () {
    // connection.invoke("GetConnectionId").then((connectionId)=>console.log("ConnectionId: " + connectionId));
    console.log("ConnectionId: " + this.connection.connection.connectionId);
    connection.invoke("SendMessageStart", 'Will', 'Hello World').catch(function (err) {
        return console.error(err.toString());
    });
    connection.invoke("AddToGroup", "Group1").catch(function (error) { 
        return console.error(error.toString())
    });
}).catch(function (err) {
    return console.error(err.toString());
});


// Form
$("#chat-button").click(function(){
    var username = $("#username").val();
    var content = $("#content").val();
    connection.invoke("SendMessageToAll", username, content).catch(function(error){
        return console.error(error.toString());
    });
})