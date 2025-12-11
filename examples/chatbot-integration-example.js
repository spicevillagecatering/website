/**
 * Example: Chatbot Integration
 * 
 * This file demonstrates how to integrate various chatbots
 * with the Spice Village Catering website.
 */

// Example 1: Initialize Dialogflow Chatbot
function initDialogflowExample() {
    const AI = require('../scripts/ai-integration');
    
    AI.initializeChatbot({
        type: 'dialogflow',
        options: {
            projectId: 'your-dialogflow-project-id',
            languageCode: 'en',
            sessionId: 'spicevillage-session-' + Date.now()
        },
        onMessage: (userMessage, botResponse) => {
            console.log('User:', userMessage);
            console.log('Bot:', botResponse);
            // Update UI with bot response
            displayMessage(botResponse);
        },
        onError: (error) => {
            console.error('Chatbot error:', error);
        }
    });
}

// Example 2: Initialize OpenAI Chatbot
function initOpenAIExample() {
    const AI = require('../scripts/ai-integration');
    
    AI.initializeChatbot({
        type: 'openai',
        options: {
            apiKey: 'your-openai-api-key',
            model: 'gpt-3.5-turbo',
            systemPrompt: 'You are a helpful assistant for Spice Village Catering, a South Indian catering service in Dublin, Ireland. Help customers with menu inquiries, bookings, and general questions.'
        },
        onMessage: (userMessage, botResponse) => {
            displayMessage(botResponse);
        }
    });
}

// Example 3: Initialize Tawk.to Chatbot
function initTawkExample() {
    const AI = require('../scripts/ai-integration');
    
    AI.initializeChatbot({
        type: 'tawk',
        options: {
            propertyId: 'your-tawk-property-id',
            widgetId: 'your-tawk-widget-id'
        }
    });
}

// Example 4: Initialize Intercom Chatbot
function initIntercomExample() {
    const AI = require('../scripts/ai-integration');
    
    AI.initializeChatbot({
        type: 'intercom',
        options: {
            appId: 'your-intercom-app-id'
        }
    });
}

// Example 5: Custom Chatbot Implementation
function initCustomChatbotExample() {
    const AI = require('../scripts/ai-integration');
    
    AI.initializeChatbot({
        type: 'custom',
        options: {
            apiEndpoint: 'https://your-api.com/chat',
            apiKey: 'your-api-key'
        },
        onMessage: async (userMessage, botResponse) => {
            // Custom message handling
            const response = await fetch('https://your-api.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();
            displayMessage(data.response);
        }
    });
}

// Example 6: Using AI Service for Content Generation
function initAIServiceExample() {
    const AI = require('../scripts/ai-integration');
    
    // Initialize AI service
    AI.initializeAIService({
        type: 'openai',
        options: {
            apiKey: 'your-openai-api-key',
            model: 'gpt-3.5-turbo'
        }
    });
    
    // Generate menu descriptions
    async function generateMenuDescription(dishName) {
        const prompt = `Write a brief, appetizing description for ${dishName}, a South Indian dish. Keep it under 50 words.`;
        const description = await AI.generateContent(prompt);
        return description;
    }
    
    // Generate blog post ideas
    async function generateBlogIdeas() {
        const prompt = 'Generate 5 blog post ideas for a South Indian catering service in Ireland.';
        const ideas = await AI.generateContent(prompt);
        return ideas;
    }
}

// Example 7: Browser-side Integration
function browserIntegrationExample() {
    // Include the script in your HTML:
    // <script src="/scripts/ai-integration.js"></script>
    
    // Then use it:
    window.addEventListener('DOMContentLoaded', () => {
        // Initialize chatbot
        window.AIIntegration.initializeChatbot({
            type: 'openai',
            options: {
                apiKey: 'your-api-key',
                model: 'gpt-3.5-turbo'
            },
            onMessage: (userMessage, botResponse) => {
                // Display in chatbot UI
                addMessageToChat('user', userMessage);
                addMessageToChat('bot', botResponse.response);
            }
        });
        
        // Setup send button
        document.getElementById('chatbot-send').addEventListener('click', async () => {
            const input = document.getElementById('chatbot-input');
            const message = input.value;
            input.value = '';
            
            if (message.trim()) {
                await window.AIIntegration.sendMessage(message);
            }
        });
    });
}

// Helper function to display messages (customize for your UI)
function displayMessage(message) {
    const chatContainer = document.getElementById('chatbot-messages');
    if (chatContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message';
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Helper function to add messages to chat
function addMessageToChat(sender, message) {
    const chatContainer = document.getElementById('chatbot-messages');
    if (chatContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message chatbot-message-${sender}`;
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// Export examples
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDialogflowExample,
        initOpenAIExample,
        initTawkExample,
        initIntercomExample,
        initCustomChatbotExample,
        initAIServiceExample,
        browserIntegrationExample
    };
}

