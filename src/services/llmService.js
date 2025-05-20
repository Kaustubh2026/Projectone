/**
 * llmService.js
 * 
 * Service for handling AI-powered activity recommendations using the Groq API.
 * This service manages the communication with the Groq API and processes
 * the responses for the activity planner feature.
 * 
 * Key Features:
 * - Integration with Groq API (llama-3.1-8b-instant model)
 * - Activity recommendation generation
 * - Error handling and response processing
 * - API key management
 * 
 * Dependencies:
 * - Groq API
 * - Fetch API
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

const GROQ_API_KEY = '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';

export const getActivityRecommendations = async (childAge, location, interest) => {
    const prompt = `Suggest 3 nature-based activities for a ${childAge}-year-old child who is interested in ${interest} and prefers ${location} environments. For each activity, include the name and a one-sentence description.`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that suggests nature-based activities for children.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get recommendations');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error getting activity recommendations:', error);
        throw error;
    }
}; 