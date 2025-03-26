"use client";

import { useEffect, useRef, useState } from "react";
import { generateZegoToken } from "@/lib/zego";
import { toast } from "sonner";
import { CircleSlash2 } from "lucide-react";

interface VideoRoomProps {
  userID: string;
  roomID: string;
  role: "host" | "participant";
  onLeave?: () => void;
}

const VideoRoom = ({ userID, roomID, role, onLeave }: VideoRoomProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [zego, setZego] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const initializeZego = async () => {
      try {
        setIsLoading(true);
        
        // Dynamically import the Zego SDK
        const ZegoExpressEngine = (await import("zego-express-engine-webrtc")).default;
        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

        if (!appId || !serverSecret) {
          throw new Error("Missing Zego credentials");
        }

        const zg = new ZegoExpressEngine(appId, serverSecret);
        setZego(zg);

        // Check browser compatibility
        const result = await zg.checkSystemRequirements();
        if (!result.webRTC) {
          throw new Error("Browser doesn't support WebRTC");
        }

        // Login room
        const token = await generateZegoToken(userID, roomID, role);
        await zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true });

        // Create and publish local stream
        const localStream = await zg.createStream({
          camera: {
            video: true,
            audio: true,
          },
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        await zg.startPublishingStream(`stream_${userID}`, localStream);
        setIsConnected(true);

        // Handle stream updates
        zg.on("roomStreamUpdate", async (roomID:any, updateType:any, streamList:any) => {
          if (updateType === "ADD") {
            for (const stream of streamList) {
              if (stream.streamID !== `stream_${userID}`) {
                const remoteStream = await zg.startPlayingStream(stream.streamID);
                if (remoteVideoRef.current) {
                  remoteVideoRef.current.srcObject = remoteStream;
                }
              }
            }
          }
        });

      } catch (error) {
        console.error("Error initializing Zego:", error);
        toast.error("Failed to initialize video call");
        if (onLeave) onLeave();
      } finally {
        setIsLoading(false);
      }
    };

    initializeZego();

    return () => {
      if (zego) {
        zego.logoutRoom(roomID);
        zego.destroyEngine();
      }
    };
  }, [userID, roomID, role]);

  const leaveRoom = () => {
    if (zego) {
      zego.logoutRoom(roomID);
    }
    if (onLeave) onLeave();
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-room-container p-4 bg-white rounded-lg shadow-lg pt-24">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Live Class: {roomID}</h2>
      <button 
        onClick={leaveRoom}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <CircleSlash2 className="h-4 w-4" />
        End Class
      </button>
    </div>
    
    <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="video-container bg-gray-200 rounded-lg overflow-hidden">
        <h3 className="text-sm font-medium p-2 bg-gray-800 text-white">You ({role})</h3>
        <video 
          ref={localVideoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-auto"
        />
      </div>
      
      <div className="video-container bg-gray-200 rounded-lg overflow-hidden">
        <h3 className="text-sm font-medium p-2 bg-gray-800 text-white">Remote Stream</h3>
        <video 
          ref={remoteVideoRef} 
          autoPlay 
          playsInline 
          className="w-full h-auto"
        />
      </div>
    </div>
    
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-600">
        {isConnected ? (
          <span className="flex items-center gap-2 text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-600"></span>
            Connected
          </span>
        ) : (
          <span className="flex items-center gap-2 text-yellow-600">
            <span className="h-2 w-2 rounded-full bg-yellow-600"></span>
            Connecting...
          </span>
        )}
      </div>
    </div>
  </div>
  );
};

export default VideoRoom;