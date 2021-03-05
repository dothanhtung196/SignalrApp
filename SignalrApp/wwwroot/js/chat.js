var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").configureLogging(signalR.LogLevel.Information).build();

connection.on("ReceiveMessageStart", function (user, message) {
    console.log(`Hi ${user}, you said: ${message}`)
});

connection.on("ReceiveMessageNotificationGroup", function(message){
    console.log(message);
});

connection.on("ReceiveMessageFromGroup", function(user, message){
    console.log(`${user}: ${message}`);
});

connection.on("ReceiveMessage", function(user, message){
    console.log(`${user}: ${message}`)
})

connection.on("ReceiveMessageFromUser", function(connection_id, message){
    console.log(`${connection_id}: ${message}`);
});

connection.start().then(function () {
    connection.invoke("GetConnectionId").then((connectionId)=>$("#my-connection-id").val(connectionId));
    
    // console.log("ConnectionId: " + this.connection.connection.connectionId);
    connection.invoke("SendMessageStart", 'Will', 'Hello World').catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});

// Jquery Form
$("#chat-button").click(function(){
    var username = $("#username").val();
    var content = $("#content").val();
    connection.invoke("SendMessageToAll", username, content).catch(function(error){
        return console.error(error.toString());
    });
});

$("#add-group-button").click(function(){
    var group_name = $("#name-group").val();
    connection.invoke("AddToGroup", group_name).catch(function(error){
        return console.error(error.toString());
    });
});

$("#remove-group-button").click(function(){
    var group_name = $("#name-group").val();
    connection.invoke("RemoveFromGroup", group_name).catch(function(error){
        return console.error(error.toString());
    });
});

$("#chat-group-button").click(function(){
    var group_name = $("#name-group").val();
    var username = $("#username-group").val();
    var content = $("#content-group").val();
    connection.invoke("SendMessageToGroup", group_name, username, content).catch(function(error){
        return console.error(error.toString());
    });
});

$("#chat-single-button").click(function(){
    var connection_id = $("#connection-id").val();
    var content = $("#content-single").val();
    connection.invoke("SendMessageToUser", connection_id, content).catch(function(error){
        return console.error(error.toString());
    });
});


