/**
 * Client-side Chatbot Integration
 * 
 * This file provides easy-to-use functions for integrating
 * chatbots in the browser.
 */

// Wait for AI Integration script to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot if AIIntegration is available
    if (typeof window.AIIntegration !== 'undefined') {
        initializeSpiceVillageChatbot();
    } else {
        // Load the AI integration script if not already loaded
        const script = document.createElement('script');
        script.src = '/scripts/ai-integration.js';
        script.onload = () => {
            initializeSpiceVillageChatbot();
        };
        document.head.appendChild(script);
    }
});

/**
 * Initialize Spice Village Catering Chatbot
 * Configure this function with your chatbot settings
 */
function initializeSpiceVillageChatbot() {
    // Example: Initialize with OpenAI
    // Uncomment and configure when ready:
    
    /*
    window.AIIntegration.initializeChatbot({
        type: 'openai',
        options: {
            apiKey: 'your-api-key-here', // Use environment variable in production
            model: 'gpt-3.5-turbo',
            systemPrompt: `You are a helpful assistant for Spice Village Catering, 
                          a South Indian catering service in Dublin, Ireland. 
                          Help customers with:
                          - Menu inquiries
                          - Booking information
                          - Event planning
                          - Dietary requirements
                          - Pricing questions
                          
                          Be friendly, professional, and informative.`
        },
        onMessage: (userMessage, botResponse) => {
            displayChatbotMessage('bot', botResponse.response || botResponse);
        },
        onError: (error) => {
            console.error('Chatbot error:', error);
            displayChatbotMessage('bot', 'Sorry, I encountered an error. Please contact us directly at 085 818 9052.');
        }
    });
    */

    // Setup chatbot UI interactions
    setupChatbotUI();
}

/**
 * Setup Chatbot UI Event Handlers
 */
function setupChatbotUI() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-input-area button');

    // Toggle chatbot window
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            const chatbotWindow = document.getElementById('chatbot-window');
            if (chatbotWindow) {
                chatbotWindow.classList.toggle('active');
                if (chatbotWindow.classList.contains('active')) {
                    chatbotInput?.focus();
                }
            }
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            const chatbotWindow = document.getElementById('chatbot-window');
            if (chatbotWindow) {
                chatbotWindow.classList.remove('active');
            }
        });
    }

    // Send message
    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', handleSendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
}

/**
 * Handle Sending Chatbot Message
 */
async function handleSendMessage() {
    const input = document.querySelector('.chatbot-input');
    const message = input?.value.trim();

    if (!message) return;

    // Display user message
    displayChatbotMessage('user', message);
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Send message to chatbot
        if (window.AIIntegration && window.AIIntegration.isInitialized) {
            const response = await window.AIIntegration.sendMessage(message);
            hideTypingIndicator();
            displayChatbotMessage('bot', response.response || response.message || 'I received your message.');
        } else {
            // Fallback: redirect to WhatsApp
            hideTypingIndicator();
            displayChatbotMessage('bot', 'Chatbot is not configured yet. Please contact us on WhatsApp: 085 818 9052');
            setTimeout(() => {
                window.open('https://wa.me/353858189052?text=' + encodeURIComponent(message), '_blank');
            }, 2000);
        }
    } catch (error) {
        hideTypingIndicator();
        console.error('Error sending message:', error);
        displayChatbotMessage('bot', 'Sorry, I encountered an error. Please contact us directly at 085 818 9052.');
    }
}

/**
 * Display Message in Chatbot
 */
function displayChatbotMessage(sender, message) {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;

    // Remove placeholder content
    const placeholder = messagesContainer.querySelector('.text-center');
    if (placeholder) {
        placeholder.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message-${sender}`;
    messageDiv.innerHTML = `
        <div class="flex items-start gap-2 ${sender === 'user' ? 'justify-end' : 'justify-start'}">
            ${sender === 'bot' ? '<i class="fas fa-robot text-primary mt-1"></i>' : ''}
            <div class="max-w-[80%] rounded-lg p-3 ${
                sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-800'
            }">
                ${message}
            </div>
            ${sender === 'user' ? '<i class="fas fa-user text-primary mt-1"></i>' : ''}
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Show Typing Indicator
 */
function showTypingIndicator() {
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (!messagesContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'chatbot-message chatbot-message-bot';
    typingDiv.innerHTML = `
        <div class="flex items-start gap-2">
            <i class="fas fa-robot text-primary mt-1"></i>
            <div class="bg-gray-200 rounded-lg p-3">
                <div class="flex gap-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Hide Typing Indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.SpiceVillageChatbot = {
        initialize: initializeSpiceVillageChatbot,
        sendMessage: handleSendMessage,
        displayMessage: displayChatbotMessage
    };
}

