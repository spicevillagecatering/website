/**
 * AI & Chatbot Integration Helper
 * 
 * This module provides easy-to-use functions for integrating
 * chatbots and AI applications with the Spice Village Catering website.
 * 
 * Usage:
 *   const AI = require('./scripts/ai-integration');
 *   AI.initializeChatbot(config);
 */

class AIIntegration {
    constructor() {
        this.chatbot = null;
        this.aiService = null;
        this.isInitialized = false;
    }

    /**
     * Initialize Chatbot
     * @param {Object} config - Chatbot configuration
     * @param {string} config.type - Type of chatbot ('custom', 'dialogflow', 'openai', 'tawk', etc.)
     * @param {Object} config.options - Configuration options specific to chatbot type
     * @param {Function} config.onMessage - Callback function for handling messages
     * @param {Function} config.onError - Error handler callback
     */
    initializeChatbot(config = {}) {
        const {
            type = 'custom',
            options = {},
            onMessage = null,
            onError = null
        } = config;

        try {
            switch (type.toLowerCase()) {
                case 'dialogflow':
                    this.chatbot = this._initDialogflow(options);
                    break;
                case 'openai':
                    this.chatbot = this._initOpenAI(options);
                    break;
                case 'tawk':
                    this.chatbot = this._initTawk(options);
                    break;
                case 'intercom':
                    this.chatbot = this._initIntercom(options);
                    break;
                case 'custom':
                default:
                    this.chatbot = this._initCustomChatbot(options);
                    break;
            }

            // Setup message handler
            if (onMessage) {
                this.onMessage = onMessage;
            }

            // Setup error handler
            if (onError) {
                this.onError = onError;
            }

            this.isInitialized = true;
            console.log(`✅ Chatbot initialized: ${type}`);
            return this.chatbot;
        } catch (error) {
            console.error('❌ Chatbot initialization failed:', error);
            if (this.onError) {
                this.onError(error);
            }
            return null;
        }
    }

    /**
     * Initialize Dialogflow Chatbot
     * @param {Object} options - Dialogflow options
     */
    _initDialogflow(options) {
        const {
            projectId,
            languageCode = 'en',
            sessionId = 'spicevillage-session'
        } = options;

        if (!projectId) {
            throw new Error('Dialogflow projectId is required');
        }

        // Example implementation - replace with actual Dialogflow SDK
        return {
            type: 'dialogflow',
            projectId,
            languageCode,
            sessionId,
            sendMessage: async (message) => {
                // Implement Dialogflow message sending
                console.log('Sending to Dialogflow:', message);
                // Return response
            }
        };
    }

    /**
     * Initialize OpenAI Chatbot
     * @param {Object} options - OpenAI options
     */
    _initOpenAI(options) {
        const {
            apiKey,
            model = 'gpt-3.5-turbo',
            systemPrompt = 'You are a helpful assistant for Spice Village Catering.'
        } = options;

        if (!apiKey) {
            throw new Error('OpenAI API key is required');
        }

        return {
            type: 'openai',
            apiKey,
            model,
            systemPrompt,
            sendMessage: async (message) => {
                // Implement OpenAI API call
                console.log('Sending to OpenAI:', message);
                // Return response
            }
        };
    }

    /**
     * Initialize Tawk.to Chatbot
     * @param {Object} options - Tawk options
     */
    _initTawk(options) {
        const { propertyId, widgetId } = options;

        if (!propertyId || !widgetId) {
            throw new Error('Tawk propertyId and widgetId are required');
        }

        // Load Tawk.to script
        const script = document.createElement('script');
        script.innerHTML = `
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();
            (function() {
                var s1 = document.createElement("script"),
                    s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/${propertyId}/${widgetId}';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
            })();
        `;
        document.head.appendChild(script);

        return {
            type: 'tawk',
            propertyId,
            widgetId,
            show: () => {
                if (window.Tawk_API) {
                    window.Tawk_API.showWidget();
                }
            },
            hide: () => {
                if (window.Tawk_API) {
                    window.Tawk_API.hideWidget();
                }
            }
        };
    }

    /**
     * Initialize Intercom Chatbot
     * @param {Object} options - Intercom options
     */
    _initIntercom(options) {
        const { appId } = options;

        if (!appId) {
            throw new Error('Intercom appId is required');
        }

        // Load Intercom script
        const script = document.createElement('script');
        script.innerHTML = `
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        `;
        document.head.appendChild(script);

        return {
            type: 'intercom',
            appId,
            show: () => {
                if (window.Intercom) {
                    window.Intercom('show');
                }
            },
            hide: () => {
                if (window.Intercom) {
                    window.Intercom('hide');
                }
            }
        };
    }

    /**
     * Initialize Custom Chatbot
     * @param {Object} options - Custom chatbot options
     */
    _initCustomChatbot(options) {
        return {
            type: 'custom',
            options,
            sendMessage: async (message) => {
                // Implement your custom chatbot logic here
                console.log('Custom chatbot message:', message);
                return { response: 'This is a custom chatbot response' };
            }
        };
    }

    /**
     * Send Message to Chatbot
     * @param {string} message - User message
     * @returns {Promise} Chatbot response
     */
    async sendMessage(message) {
        if (!this.isInitialized || !this.chatbot) {
            throw new Error('Chatbot not initialized. Call initializeChatbot() first.');
        }

        try {
            let response;
            
            if (this.chatbot.sendMessage) {
                response = await this.chatbot.sendMessage(message);
            } else {
                response = { error: 'Chatbot does not support sendMessage' };
            }

            // Call message handler if provided
            if (this.onMessage) {
                this.onMessage(message, response);
            }

            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            if (this.onError) {
                this.onError(error);
            }
            throw error;
        }
    }

    /**
     * Initialize AI Service (for non-chatbot AI features)
     * @param {Object} config - AI service configuration
     */
    initializeAIService(config = {}) {
        const {
            type = 'openai',
            options = {}
        } = config;

        try {
            switch (type.toLowerCase()) {
                case 'openai':
                    this.aiService = this._initOpenAI(options);
                    break;
                case 'anthropic':
                    this.aiService = this._initAnthropic(options);
                    break;
                case 'custom':
                default:
                    this.aiService = this._initCustomAI(options);
                    break;
            }

            console.log(`✅ AI Service initialized: ${type}`);
            return this.aiService;
        } catch (error) {
            console.error('❌ AI Service initialization failed:', error);
            throw error;
        }
    }

    /**
     * Initialize Anthropic Claude
     * @param {Object} options - Anthropic options
     */
    _initAnthropic(options) {
        const {
            apiKey,
            model = 'claude-3-sonnet-20240229'
        } = options;

        if (!apiKey) {
            throw new Error('Anthropic API key is required');
        }

        return {
            type: 'anthropic',
            apiKey,
            model,
            generateText: async (prompt) => {
                // Implement Anthropic API call
                console.log('Generating text with Anthropic:', prompt);
            }
        };
    }

    /**
     * Initialize Custom AI Service
     * @param {Object} options - Custom AI options
     */
    _initCustomAI(options) {
        return {
            type: 'custom',
            options,
            generateText: async (prompt) => {
                // Implement your custom AI logic
                console.log('Custom AI prompt:', prompt);
            }
        };
    }

    /**
     * Generate AI Content
     * @param {string} prompt - AI prompt
     * @param {Object} options - Additional options
     * @returns {Promise} Generated content
     */
    async generateContent(prompt, options = {}) {
        if (!this.aiService) {
            throw new Error('AI Service not initialized. Call initializeAIService() first.');
        }

        try {
            if (this.aiService.generateText) {
                return await this.aiService.generateText(prompt, options);
            } else {
                throw new Error('AI Service does not support generateText');
            }
        } catch (error) {
            console.error('Error generating content:', error);
            throw error;
        }
    }

    /**
     * Show Chatbot Widget
     */
    showChatbot() {
        if (this.chatbot && this.chatbot.show) {
            this.chatbot.show();
        } else {
            // Default: show custom chatbot window
            const chatbotWindow = document.getElementById('chatbot-window');
            if (chatbotWindow) {
                chatbotWindow.classList.add('active');
            }
        }
    }

    /**
     * Hide Chatbot Widget
     */
    hideChatbot() {
        if (this.chatbot && this.chatbot.hide) {
            this.chatbot.hide();
        } else {
            // Default: hide custom chatbot window
            const chatbotWindow = document.getElementById('chatbot-window');
            if (chatbotWindow) {
                chatbotWindow.classList.remove('active');
            }
        }
    }
}

// Export singleton instance
const aiIntegration = new AIIntegration();

// For Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aiIntegration;
}

// For browser/ES6 modules
if (typeof window !== 'undefined') {
    window.AIIntegration = aiIntegration;
}

