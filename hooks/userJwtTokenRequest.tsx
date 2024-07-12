
type Payload = {
    uid: string | null;
    email: string | null;
};

export const createJwtTokenRequest = async (payload: Payload) => {

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data;

    } catch (e) {
        // Handle error
        console.error('Error during API call:', e);
        throw e;
    }
};
