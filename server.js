document.addEventListener('DOMContentLoaded', function() {
    // Function to send a message
    var sendMessage = function() {
        var userMessage = document.getElementById('message-input').value;
        if (!userMessage.trim()) return; // Avoid sending empty messages
        document.getElementById('message-input').value = ''; // Clear input after sending
        var chatOutput = document.getElementById('chat-output');
        // Append the user message to the chat output
        chatOutput.innerHTML += '<div class="user-message" style="text-align: right; color: black;"><strong>You:</strong> ' + userMessage + '</div>';
        scrollChatToBottom(); // Ensure the latest message is visible
    };
    // Event listener for the send message button
    document.getElementById('send-message').addEventListener('click', sendMessage);
    // Event listener for pressing the Enter key within the message input
    document.getElementById('message-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action to avoid submitting the form (if any)
            sendMessage();
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
