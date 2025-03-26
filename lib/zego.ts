interface ZegoTokenResponse {
    token: string;
    error?: {
      code: number;
      message: string;
    };
  }
  
  export async function generateZegoToken(
    userID: string,
    roomID: string,
    role: 'host' | 'participant'
  ): Promise<string> {
    const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
  
    // Validate required environment variables
    if (!appId || !serverSecret) {
      throw new Error('Zego Cloud App ID or Server Secret is missing');
    }
  
    // Validate input parameters
    if (!userID || !roomID || !role) {
      throw new Error('Missing required parameters: userID, roomID, or role');
    }
  
    try {
      // In a production environment, you would typically call your backend service
      // Here's an example implementation for both development and production
  
      // Option 1: For development/testing - generate token locally (not recommended for production)
      if (process.env.NODE_ENV === 'development') {
        const effectiveTime = 3600; // 1 hour
        const payload = {
          app_id: appId,
          user_id: userID,
          room_id: roomID,
          privilege: {
            [roomID]: {
              publish: role === 'host',
              play: true,
            }
          },
          exp: Math.floor(Date.now() / 1000) + effectiveTime,
        };
  
        // Note: In a real implementation, you should NEVER expose serverSecret in client-side code
        // This is just for demonstration purposes in development
        const token = require('zego-server-sdk').generateToken04(
          appId,
          userID,
          serverSecret,
          effectiveTime,
          payload
        );
        return token;
      }
  
      // Option 2: For production - call your backend token generation endpoint
      const response = await fetch('/api/zego/generate-token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
        },
        body: JSON.stringify({ 
          userID, 
          roomID, 
          role,
          appId: appId.toString() 
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate token');
      }
  
      const data: ZegoTokenResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      if (!data.token) {
        throw new Error('Invalid token received from server');
      }
  
      return data.token;
    } catch (error) {
      console.error('Error generating Zego token:', error);
      throw new Error(`Failed to generate token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }