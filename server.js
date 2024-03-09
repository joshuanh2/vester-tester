document.addEventListener('DOMContentLoaded', function() {
    // Directly using the Replit backend URL in the fetch call
    var backendUrl = 'https://vester-on-gpt-4-granthamblen.replit.app';

    function sendMessage() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return; // Avoid sending empty messages
        document.getElementById('message-input').value = ''; // Clear input after sending
        
        var chatOutput = document.getElementById('chat-output');
        // Append the user message to the chat output
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';
        
        // Use the backend URL in the fetch call to send the user message
        fetch('https://vester-on-gpt-4-granthamblen.replit.app/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage })
})
        .then(response => response.json())
        .then(data => {
            // Display the GPT response in the chat
            chatOutput.innerHTML += '<div class="gpt-response" style="text-align: left; color: blue;"><strong>GPT:</strong> ' + data.message + '</div>';
            scrollChatToBottom(); // Ensure the latest message is visible
        })
        .catch(error => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-message" style="color: red;"><strong>Error:</strong> Could not get response from GPT</div>';
            scrollChatToBottom();
        });
    }

    document.getElementById('send-message').addEventListener('click', sendMessage);

    document.getElementById('message-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action to avoid submitting the form
            sendMessage();
        }
    });

    // Implement additional functionalities like document upload and section toggling as needed

    function scrollChatToBottom() {
        var chatOutput = document.getElementById('chat-output');
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});
