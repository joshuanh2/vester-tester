document.addEventListener('DOMContentLoaded', function () {
    var sendMessageButton = document.getElementById('send-message-button'); // Assuming you have a button with this ID for sending messages
    if (sendMessageButton) {
        sendMessageButton.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return; // Avoid sending empty messages
        document.getElementById('message-input').value = ''; // Clear input after sending

        // Display user message immediately (if needed)
        var chatOutput = document.getElementById('chat-output');
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';

        // Make an API call to your backend
        fetch('https://vester-on-gpt-4-granthamblen.replit.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the GPT response in the chat
            chatOutput.innerHTML += '<div class="gpt-response" style="text-align: left; color: blue;"><strong>GPT:</strong> ' + data.message + '</div>';
            scrollChatToBottom(); // Ensure the latest message is visible
        })
        .catch((error) => {
            console.error('Error:', error);
            chatOutput.innerHTML += '<div class="error-response" style="text-align: left; color: red;"><strong>Error:</strong> Unable to get response</div>';
            scrollChatToBottom();
        });
    }

    // Function to scroll chat to the bottom
    function scrollChatToBottom() {
        var chatOutput = document.getElementById('chat-output');
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});


    // Financial document upload functionality
    document.querySelector('button[type="button"]').addEventListener('click', function() {
        var fileInput = document.getElementById('financial-doc-upload');
        var file = fileInput.files[0]; // Get the file from the input
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        // Implement the file upload logic here
        console.log('Uploading:', file.name);
        // Here, you would typically use FormData and XMLHttpRequest or fetch to send the file to your server
    });

    // Function to scroll chat to the bottom
    function scrollChatToBottom() {
        var chatOutput = document.getElementById('chat-output');
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    // Function to toggle the collapse state of sections
    window.toggleCollapse = function(sectionId) {
        const section = document.getElementById(sectionId);
        const isCollapsed = section.classList.toggle('collapsed');

        // Update button label based on the collapsed state
        const button = section.querySelector('.collapse-btn');
        if (isCollapsed) {
            button.textContent = sectionId === 'chat-history-section' ? 'Open History' : 'Open Uploads';
        } else {
            button.textContent = sectionId === 'chat-history-section' ? 'Close History' : 'Close Uploads';
        }
    };
});
