document.addEventListener('DOMContentLoaded', function () {
    var sendMessageButton = document.getElementById('send-message-button');
    var chatOutput = document.getElementById('chat-output');
    
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return;
        document.getElementById('message-input').value = '';

        chatOutput.innerHTML += '<div class="user-message"><strong>You:</strong> ' + userMessage + '</div>';

        fetch('http://localhost:8080/api/chat', { // <-- Make sure this points to your Flask server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json()) // Parses the JSON response
        .then(data => {
            chatOutput.innerHTML += '<div class="gpt-response"><strong>GPT:</strong> ' + data.message + '</div>';
            scrollChatToBottom();
        })
        .catch(error => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-response"><strong>Error:</strong> Unable to get response</div>';
            scrollChatToBottom();
        });
    }

    function scrollChatToBottom() {
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
