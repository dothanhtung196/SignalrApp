using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalrApp.Hubs
{
    public class ChatHub : Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
        public Task SendMessageStart(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessageStart", user, message);
        }
        public Task SendMessageToAll(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessageFromGroup", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessageFromGroup", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public Task SendMessageToGroup(string groupName, string user, string message)
        {
            return Clients.Group(groupName).SendAsync("ReceiveMessageFromGroup", user, message);
        }

        public Task SendMessageToUser(string connectionId, string message)
        {
            return Clients.Client(connectionId).SendAsync("ReceiveMessageFromUser", message);
        }
    }
}