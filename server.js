<script>
document.addEventListener('DOMContentLoaded', function() {
    // Send message functionality
    function sendMessage() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return; // Avoid sending empty messages
        document.getElementById('message-input').value = ''; // Clear input after sending
        
        var chatOutput = document.getElementById('chat-output');
        // Display user message immediately
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';

        // Make an API call to your backend
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
            chatOutput.innerHTML += '<div class="chatbot-response" style="text-align: left; color: black;"><strong>Vester:</strong> ' + data.message + '</div>';
            chatOutput.scrollTop = chatOutput.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-message" style="color: red;"><strong>Error:</strong> Could not send message</div>';
        });
    }

    // Event listener for the send message button
    document.getElementById('send-message').addEventListener('click', sendMessage);

    // Event listener for pressing the Enter key within the message input
    document.getElementById('message-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action to avoid submitting the form (if any)
            sendMessage();
        }
    });

    // Functionality for example questions
    document.querySelectorAll('.example-question').forEach(function(button) {
        button.addEventListener('click', function() {
            var questionText = this.innerText;
            document.getElementById('message-input').value = questionText;
            sendMessage();
        });
    });
});
</script>
