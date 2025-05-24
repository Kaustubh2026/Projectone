/**
 * llmService.js
 * 
 * Service for handling AI-powered activity recommendations using the Google Gemini API.
 * This service manages the communication with the Gemini API and processes
 * the responses for the activity planner feature.
 * 
 * Key Features:
 * - Integration with Google Gemini API
 * - Activity recommendation generation
 * - Error handling and response processing
 * - API key management
 * 
 * Dependencies:
 * - Google Gemini API
 * - Fetch API
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

// Use environment variable for API key, with fallback for development
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyB8DZiswlSWuvbdGPoWAyRLA7mc6bcSk9A';

// Fallback recommendations for development/testing
const fallbackRecommendations = [
    "Nature Scavenger Hunt: Create a list of natural items for children to find in the park.",
    "Leaf Rubbing Art: Collect different leaves and create art by rubbing them with crayons.",
    "Bird Watching: Observe and identify different birds in your local area."
].join('\n');

export const getActivityRecommendations = async (childAge, location, interest) => {
    const prompt = `Suggest 3 nature-based activities for a ${childAge}-year-old child who is interested in ${interest} and prefers ${location} environments. For each activity, include the name and a one-sentence description.`;

    // If no API key is set, return fallback recommendations
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
        console.log('Using fallback recommendations (no API key set)');
        return fallbackRecommendations;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) {
            console.error('API Error:', await response.text());
            throw new Error('Failed to get recommendations');
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
    } catch (error) {
        console.error('Error getting activity recommendations:', error);
        // Return fallback recommendations if API call fails
        return fallbackRecommendations;
    }
}; 