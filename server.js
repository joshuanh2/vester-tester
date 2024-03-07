document.addEventListener('DOMContentLoaded', function() {
    var sendMessageButton = document.getElementById('send-message-button');
    var chatOutput = document.getElementById('chat-output');
    var messageInput = document.getElementById('message-input'); // Get the message input element

    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }

    // Event listener for the Enter key in the message input
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action (form submission)
            sendMessage();
        }
    });

    function sendMessage() {
        var userMessage = messageInput.value; // Use the messageInput variable
        if (!userMessage.trim()) return; // Avoid sending empty messages
        messageInput.value = ''; // Clear input after sending

        // Display user message immediately
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';

        // Make an API call to your backend
        fetch('https://your-backend-url/api/chat', { // <-- Replace with your actual backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Display the GPT response in the chat
            chatOutput.innerHTML += '<div class="gpt-response" style="text-align: left; color: blue;"><strong>GPT:</strong> ' + data.message + '</div>';
            scrollChatToBottom();
        })
        .catch((error) => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-response" style="text-align: left; color: red;"><strong>Error:</strong> Unable to get response</div>';
            scrollChatToBottom();
        });
    }

    // Function to scroll chat to the bottom
    function scrollChatToBottom() {
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
