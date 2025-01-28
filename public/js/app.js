// Chat System Enhancements
let isChatOpen = false;
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const nicknameInput = document.getElementById('nickname');
const charCount = document.getElementById('charCount');

// Load saved messages and nickname
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
const savedNickname = localStorage.getItem('chatNickname') || '';

function initChat() {
    nicknameInput.value = savedNickname;
    loadMessages();
    messageInput.addEventListener('input', updateCharCount);
    messageInput.addEventListener('keypress', handleTyping);
}

function toggleChat() {
    isChatOpen = !isChatOpen;
    document.querySelector('.chat-body').style.display = isChatOpen ? 'block' : 'none';
    document.querySelector('.chat-input').style.display = isChatOpen ? 'flex' : 'none';
    if (isChatOpen) messageInput.focus();
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    const nickname = nicknameInput.value.trim();

    if (messageText && nickname) {
        const newMessage = {
            nickname,
            text: filterMessage(messageText),
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);
        if (messages.length > 100) messages.shift(); // Keep only last 100 messages
        
        saveMessages();
        appendMessage(newMessage);
        messageInput.value = '';
        updateCharCount();
        playNotificationSound();
    }
}

function filterMessage(text) {
    const blockedWords = ['badword1', 'badword2', 'badword3'];
    return text.replace(new RegExp(blockedWords.join('|'), 'gi'), '****');
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
        <strong style="color: ${getUserColor(message.nickname)}">
            ${message.nickname}:
        </strong> 
        ${message.text}
        <small style="opacity:0.7">${new Date(message.timestamp).toLocaleTimeString()}</small>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function loadMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(appendMessage);
}

function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    localStorage.setItem('chatNickname', nicknameInput.value);
}

function getUserColor(username) {
    const colors = ['#7d5fff', '#00f3ff', '#ff6b6b', '#4ecdc4'];
    return colors[username.length % colors.length];
}

function updateCharCount() {
    charCount.textContent = `${messageInput.value.length}/200`;
}

function handleTyping(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function playNotificationSound() {
    const audio = new Audio('/sounds/notification.mp3');
    audio.play().catch(() => { /* Handle audio play restrictions */ });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);
