document.addEventListener('DOMContentLoaded', function() {
    // Function to send a message and receive a response
    var sendMessage = function() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return; // Avoid sending empty messages
        document.getElementById('message-input').value = ''; // Clear input after sending
        var chatOutput = document.getElementById('chat-output');
        // Append the user message to the chat output
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';

        // Make an API call to your backend to send the user message and get a response from GPT
        fetch('
https://vester-on-gpt-4-granthamblen.replit.app', { // Replace with your actual Replit backend URL
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

        scrollChatToBottom(); // Ensure the latest message is visible
    };

    // Event listener for the send message button
    var sendButton = document.getElementById('send-message');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Event listener for pressing the Enter key within the message input
    var messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the default action to avoid submitting the form (if any)
                sendMessage();
            }
        });
    }

    // Financial document upload functionality will be implemented here in the future

    // Function to scroll chat to the bottom
    function scrollChatToBottom() {
        var chatOutput = document.getElementById('chat-output');
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Function to toggle the collapse state of sections
    window.toggleCollapse = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const isCollapsed = section.classList.toggle('collapsed');
            // Update button label based on the collapsed state
            const button = section.querySelector('.collapse-btn');
            if (button) {
                if (isCollapsed) {
                    button.textContent = sectionId === 'chat-history-section' ? 'Open History' : 'Open Uploads';
                } else {
                    button.textContent = sectionId === 'chat-history-section' ? 'Close History' : 'Close Uploads';
                }
            }
        }
    };
});
