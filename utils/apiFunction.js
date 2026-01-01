

export async function registerUser({ name, email, password,phone }) {
  try {
    const response = await fetch('/api/signupapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password,phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register');
    }

    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
}
