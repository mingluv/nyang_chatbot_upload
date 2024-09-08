import fetch from 'node-fetch';

const testChatbot = async () => {
  const apiUrl = 'http://localhost:3000/bot/chat';
  const userMessage = '오늘 점심은 뭐야?';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chatbot Response:', data.response);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testChatbot();

// https://web.postman.co/ -> 포스트 맨에서도 테스트 가능! 