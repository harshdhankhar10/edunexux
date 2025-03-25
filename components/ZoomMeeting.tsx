"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ZoomMtg } from "@zoomus/websdk";

// Configure Zoom JS Library
ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

interface ZoomMeetingProps {
  meetingNumber: string;
  studentId: string;
  passcode?: string;
  onMeetingEnd?: () => void;
  onError?: (error: Error) => void;
}

type ZoomJoinParams = {
  signature: string;
  sdkKey: string;
  meetingNumber: string;
  password: string;
  userName: string;
  userEmail: string;
  tk?: string;
  success: (data: any) => void;
  error: (error: Error) => void;
};

export default function ZoomMeeting({
  meetingNumber,
  studentId,
  passcode = "",
  onMeetingEnd = () => {},
  onError = (error) => console.error("Zoom Error:", error),
}: ZoomMeetingProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meetingNumber || !studentId) {
      onError(new Error("Meeting number or student ID is missing"));
      return;
    }

    if (!isInitialized) {
      initializeZoom();
    }

    return () => {
      if (isInitialized) {
        leaveMeeting();
      }
    };
  }, [meetingNumber, studentId, isInitialized]); // Added isInitialized

  const leaveMeeting = () => {
    try {
      ZoomMtg.leaveMeeting({
        success: () => {
          console.log("Left meeting successfully");
          onMeetingEnd();
        },
        error: (error: Error) => {
          console.error("Leave meeting error", error);
          onError(error);
        },
      });
    } catch (error) {
      onError(error as Error);
    }
  };

  const initializeZoom = async () => {
    setIsLoading(true);
    try {
      // Verify student and meeting first
      const verificationResponse = await axios.post("/api/verify-meeting", {
        meetingNumber,
        studentId,
      });

      if (!verificationResponse.data.valid) {
        throw new Error("Invalid meeting or student credentials");
      }

      // Get Zoom signature
      const signatureResponse = await axios.post("/api/zoom", {
        meetingNumber,
        studentId,
        role: 0, // Participant role
      });

      const { signature } = signatureResponse.data;

      // Preload WebAssembly and prepare SDK
      await ZoomMtg.preLoadWasm();
      await ZoomMtg.prepareWebSDK();
      
      // Initialize Zoom
      ZoomMtg.init({
        leaveUrl: window.location.origin,
        disablePreview: false,
        success: () => {
          const sdkKey = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID || "";
          if (!sdkKey) {
            throw new Error("Missing Zoom SDK Key");
          }

          const joinParams: ZoomJoinParams = {
            signature,
            sdkKey,
            meetingNumber,
            password: passcode,
            userName: `Student ${studentId}`,
            userEmail: `${studentId}@school.edu`,
            tk: "",
            success: () => {
              console.log("Joined meeting successfully");
              setIsLoading(false);
            },
            error: (error: Error) => {
              console.error("Join meeting error", error);
              onError(error);
              setIsLoading(false);
            },
          };

          ZoomMtg.join(joinParams);
        },
        error: (error: Error) => {
          console.error("Init error", error);
          onError(error);
          setIsLoading(false);
        },
      });

      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing Zoom:", error);
      onError(error as Error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white text-xl">
            Loading Zoom meeting...
          </div>
        </div>
      )}
      <div
        ref={meetingContainerRef}
        id="zoom-meeting-container"
        className="w-full h-full"
      />
    </div>
  );
}
