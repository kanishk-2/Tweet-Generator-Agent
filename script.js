// IIFE for encapsulation
(async function() {
    // Function to handle API calls with exponential backoff
    async function callApi(prompt, retries = 3, delay = 1000) {
        const apiKey = " Enter your Gemini API key here "; // Replace with your actual API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.status === 429) {
                    console.warn(`Rate limit exceeded. Retrying in ${delay / 1000}s...`);
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2; // Exponential backoff
                    continue;
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API call failed with status ${response.status}: ${JSON.stringify(errorData)}`);
                }

                const data = await response.json();
                const result = data.candidates[0].content.parts[0].text;
                return result;

            } catch (error) {
                console.error('API call error:', error);
                if (i === retries - 1) throw error;
                await new Promise(res => setTimeout(res, delay));
                delay *= 2;
            }
        }
    }

    // UI Elements
    const topicInput = document.getElementById('topic');
    const toneSelect = document.getElementById('tone');
    const audienceInput = document.getElementById('audience');
    const hashtagsInput = document.getElementById('hashtags');
    const generateButton = document.getElementById('generate-button');
    const generateHashtagsButton = document.getElementById('generate-hashtags-button');
    const summarizeButton = document.getElementById('summarize-button');
    const expandButton = document.getElementById('expand-button');
    const clearButton = document.getElementById('clear-button');
    const outputContainer = document.getElementById('output-container');
    const tweetOutput = document.getElementById('tweet-output');

    // Spinner and button text elements
    const generateButtonText = document.getElementById('generate-button-text');
    const generateSpinner = document.getElementById('generate-spinner');
    const hashtagsButtonText = document.getElementById('hashtags-button-text');
    const hashtagsSpinner = document.getElementById('hashtags-spinner');
    const summarizeButtonText = document.getElementById('summarize-button-text');
    const summarizeSpinner = document.getElementById('summarize-spinner');
    const expandButtonText = document.getElementById('expand-button-text');
    const expandSpinner = document.getElementById('expand-spinner');

    // Helper function to toggle loading state
    function setLoading(button, textSpan, spinnerSpan, isLoading) {
        if (isLoading) {
            // Store original width and set a fixed width to prevent shrinking
            button.style.width = `${button.offsetWidth}px`;
            textSpan.classList.add('hidden');
            spinnerSpan.classList.remove('hidden');
            button.disabled = true;
        } else {
            // Restore original width and hide the spinner
            button.style.width = '';
            textSpan.classList.remove('hidden');
            spinnerSpan.classList.add('hidden');
            button.disabled = false;
        }
    }
    
    // Event Listeners
    generateButton.addEventListener('click', async () => {
        const topic = topicInput.value;
        const tone = toneSelect.value;
        const audience = audienceInput.value;
        const hashtags = hashtagsInput.value;

        if (!topic) {
            // Use a custom message box instead of alert
            showMessageBox('Please enter a topic to generate a tweet.');
            return;
        }

        setLoading(generateButton, generateButtonText, generateSpinner, true);

        try {
            const prompt = `Generate a tweet about the topic "${topic}". The tone should be "${tone}" and the audience is "${audience}". Incorporate the following hashtags: ${hashtags}. The tweet should be under 280 characters.`;
            const result = await callApi(prompt);
            tweetOutput.textContent = result;
            outputContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Failed to generate tweet:', error);
            tweetOutput.textContent = 'Failed to generate tweet. Please try again.';
        } finally {
            setLoading(generateButton, generateButtonText, generateSpinner, false);
        }
    });
    
    generateHashtagsButton.addEventListener('click', async () => {
        const topic = topicInput.value;
        if (!topic) {
            // Use a custom message box instead of alert
            showMessageBox('Please enter a topic to generate hashtags.');
            return;
        }
    
        setLoading(generateHashtagsButton, hashtagsButtonText, hashtagsSpinner, true);
    
        try {
            const prompt = `Generate a list of 5 to 10 popular and relevant hashtags for the topic "${topic}". Provide only the hashtags, separated by spaces.`;
            const result = await callApi(prompt);
            hashtagsInput.value = result.trim();
        } catch (error) {
            console.error('Failed to generate hashtags:', error);
            showMessageBox('Failed to generate hashtags. Please try again.');
        } finally {
            setLoading(generateHashtagsButton, hashtagsButtonText, hashtagsSpinner, false);
        }
    });

    summarizeButton.addEventListener('click', async () => {
        const tweetText = tweetOutput.textContent;
        if (!tweetText || tweetText.includes('Failed to generate tweet')) {
            // Use a custom message box instead of alert
            showMessageBox('No tweet to summarize.');
            return;
        }
        
        setLoading(summarizeButton, summarizeButtonText, summarizeSpinner, true);
        
        try {
            const prompt = `Summarize the following tweet into a shorter version. The summary should be concise and retain the core message: "${tweetText}"`;
            const result = await callApi(prompt);
            tweetOutput.textContent = result;
        } catch (error) {
            console.error('Failed to summarize tweet:', error);
            showMessageBox('Failed to summarize tweet. Please try again.');
        } finally {
            setLoading(summarizeButton, summarizeButtonText, summarizeSpinner, false);
        }
    });

    expandButton.addEventListener('click', async () => {
        const tweetText = tweetOutput.textContent;
        if (!tweetText || tweetText.includes('Failed to generate tweet')) {
            // Use a custom message box instead of alert
            showMessageBox('No tweet to expand.');
            return;
        }

        setLoading(expandButton, expandButtonText, expandSpinner, true);

        try {
            const prompt = `Expand the following short tweet into a more detailed version, adding more context and information: "${tweetText}"`;
            const result = await callApi(prompt);
            tweetOutput.textContent = result;
        } catch (error) {
            console.error('Failed to expand tweet:', error);
            showMessageBox('Failed to expand tweet. Please try again.');
        } finally {
            setLoading(expandButton, expandButtonText, expandSpinner, false);
        }
    });

    clearButton.addEventListener('click', () => {
        tweetOutput.textContent = '';
        outputContainer.classList.add('hidden');
    });

    // Message Box implementation to replace alert()
    function showMessageBox(message) {
        // Check if a message box already exists and remove it to prevent duplicates
        const existingMessageBox = document.getElementById('custom-message-box');
        if (existingMessageBox) {
            existingMessageBox.remove();
        }
    
        const messageBox = document.createElement('div');
        messageBox.id = 'custom-message-box';
        messageBox.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
        
        messageBox.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
                <p class="text-gray-800 text-center mb-4">${message}</p>
                <button id="close-message-box" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">OK</button>
            </div>
        `;
    
        document.body.appendChild(messageBox);
    
        document.getElementById('close-message-box').addEventListener('click', () => {
            messageBox.remove();
        });
    }

})();
