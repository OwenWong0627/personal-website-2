import React, { useState, useEffect, useRef } from "react";

interface VolumeControlProps {
    isVirtualRoomEntered: boolean;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
    isVirtualRoomEntered,
}) => {
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const targetVolume = 0.2;
    const fadeDuration = 3000;
    const fadeSteps = 30;

    useEffect(() => {
        const audio = new Audio("/audio/lofi-music-1.mp3");
        audio.loop = true;
        audio.volume = 0; // Start with muted volume
        audioRef.current = audio;

        if (isVirtualRoomEntered) {
            setIsMuted(false);
            audio
                .play()
                .catch((error) => console.error("Error playing audio:", error));
            graduallyIncreaseVolume(
                audio,
                targetVolume,
                fadeDuration,
                fadeSteps
            );
        }

        return () => {
            audio.pause();
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current); // Clear any ongoing intervals
            }
        };
    }, [isVirtualRoomEntered]);

    const graduallyIncreaseVolume = (
        audio: HTMLAudioElement,
        targetVolume: number,
        duration: number,
        steps: number
    ) => {
        const stepDuration = duration / steps;
        const volumeIncrement = targetVolume / steps;
        let currentStep = 0;

        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
        }

        fadeIntervalRef.current = setInterval(() => {
            if (audio.volume < targetVolume && currentStep < steps) {
                audio.volume += volumeIncrement;
                currentStep++;
            } else {
                clearInterval(fadeIntervalRef.current!);
                fadeIntervalRef.current = null;
            }
        }, stepDuration);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            setIsMuted((prevMute) => {
                if (!prevMute) {
                    // If unmuting, stop any ongoing fade-in and mute immediately
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current);
                        fadeIntervalRef.current = null;
                    }
                    audioRef.current!.volume = 0;
                } else {
                    graduallyIncreaseVolume(
                        audioRef.current!,
                        targetVolume,
                        fadeDuration,
                        fadeSteps
                    );
                }
                return !prevMute;
            });
        }
    };

    const volumeOnSvg = {
        __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 300 375" style="enable-background:new 0 0 300 300;" xml:space="preserve"><g><g><g><path d="M283.7,150.5c0,31.6-11.2,62.2-31.7,86.1c-1.5,1.7-3.5,2.7-5.7,2.8c-2.3,0.1-4.4-0.7-6-2.3l-14.2-14.2     c-2.9-2.9-3.2-7.5-0.5-10.7c14.5-17.5,22.1-38.8,22.1-61.6s-7.7-44.1-22.1-61.6c-2.6-3.2-2.4-7.8,0.5-10.7L240.3,64     c1.6-1.6,3.7-2.4,6-2.3c2.2,0.1,4.3,1.1,5.7,2.8C272.4,88.3,283.7,118.9,283.7,150.5z"/></g></g><g><g><path d="M227.5,150.5c0,16.6-5.2,32.4-15.1,45.6c-1.4,1.9-3.6,3.1-5.9,3.3c-2.3,0.2-4.6-0.7-6.2-2.3L186,182.7     c-2.7-2.7-3.1-6.8-1.1-10c4.3-6.6,6.6-14.3,6.6-22.3c0-8-2.3-15.7-6.6-22.3c-2-3.1-1.6-7.3,1.1-10l14.4-14.4     c1.6-1.6,3.9-2.5,6.2-2.3c2.3,0.2,4.5,1.4,5.9,3.3C222.3,118.1,227.5,133.9,227.5,150.5z"/></g></g><path d="M84.1,83.5L84.1,83.5l-52.8,0c-8.3,0-15,6.7-15,15v102.9c0,8.3,6.7,15,15,15h52.8v0l42.2,42.2c9.4,9.4,25.6,2.8,25.6-10.6   V51.8c0-13.4-16.2-20.1-25.6-10.6L84.1,83.5z"/></g></svg>`,
    };

    const volumeOffSvg = {
        __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 300 375" style="enable-background:new 0 0 300 300;" xml:space="preserve"><g><path d="M84.1,83.5L84.1,83.5l-52.8,0c-8.3,0-15,6.7-15,15v102.9c0,8.3,6.7,15,15,15h52.8v0l42.2,42.2c9.4,9.4,25.6,2.8,25.6-10.6   V51.8c0-13.4-16.2-20.1-25.6-10.6L84.1,83.5z"/><path d="M280.3,123.4l-14.1-14.1c-3.9-3.9-10.2-3.9-14.1,0l-20.3,20.3l-20.3-20.3c-3.9-3.9-10.2-3.9-14.1,0l-14.1,14.1   c-3.9,3.9-3.9,10.2,0,14.1l20.3,20.3l-20.3,20.3c-3.9,3.9-3.9,10.2,0,14.1l14.1,14.1c3.9,3.9,10.2,3.9,14.1,0l20.3-20.3l20.3,20.3   c3.9,3.9,10.2,3.9,14.1,0l14.1-14.1c3.9-3.9,3.9-10.2,0-14.1l-20.3-20.3l20.3-20.3C284.2,133.6,284.2,127.3,280.3,123.4z"/></g></svg>`,
    };

    return (
        <div
            onClick={toggleMute}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-300 to-blue-200 cursor-pointer shadow-md absolute bottom-5 right-5 z-10 p-2 pt-4"
            dangerouslySetInnerHTML={isMuted ? volumeOffSvg : volumeOnSvg}
        />
    );
};

export default VolumeControl;
