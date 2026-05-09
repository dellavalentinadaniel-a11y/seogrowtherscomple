import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Rewind, FastForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return '00:00';
};

const CustomAudioPlayer = ({ src, title, subtitle }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFloating, setIsFloating] = useState(false);
  const [userClosedFloating, setUserClosedFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Activar flotante si bajamos en la página y ya reprodujo algo
      if (window.scrollY > 400 && (isPlaying || currentTime > 0) && !userClosedFloating) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, currentTime, userClosedFloating]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onScrub = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
      
      {/* Decorative gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* Cover Art / Icon */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
          <Music className={`w-8 h-8 text-cyan-400 ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
              {subtitle && <p className="text-emerald-400 text-sm">{subtitle}</p>}
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <button onClick={skipBackward} className="text-gray-400 hover:text-white transition-colors" aria-label="Retroceder 10 segundos">
                <Rewind size={20} />
              </button>
              
              <button 
                onClick={togglePlayPause} 
                className="w-12 h-12 flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black rounded-full transition-transform active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
              >
                {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current translate-x-0.5" />}
              </button>
              
              <button onClick={skipForward} className="text-gray-400 hover:text-white transition-colors" aria-label="Avanzar 10 segundos">
                <FastForward size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar Area */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-mono tabular-nums">{formatTime(currentTime)}</span>
            
            <input
              type="range"
              value={currentTime}
              step="1"
              min="0"
              max={duration || 0}
              className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
              onChange={onScrub}
              style={{
                 background: `linear-gradient(to right, #22d3ee ${(currentTime / (duration || 1)) * 100}%, #1e293b ${(currentTime / (duration || 1)) * 100}%)`
              }}
            />
            
            <span className="text-xs text-gray-400 font-mono tabular-nums">{formatTime(duration)}</span>
            
            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                style={{
                  background: `linear-gradient(to right, #94a3b8 ${(isMuted ? 0 : volume) * 100}%, #1e293b ${(isMuted ? 0 : volume) * 100}%)`
               }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mini Player */}
      <AnimatePresence>
        {isFloating && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/90 backdrop-blur-xl border border-slate-700 hover:border-cyan-500/50 p-2 pr-4 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(34,211,238,0.15)] group/mini"
          >
             <button 
                onClick={togglePlayPause} 
                className="w-10 h-10 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex items-center justify-center shrink-0 shadow-lg transition-transform active:scale-95"
             >
                 {isPlaying ? <Pause size={18} className="fill-current" /> : <Play size={18} className="fill-current translate-x-0.5" />}
             </button>
             
             <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
                 <span className="truncate text-xs font-bold text-white leading-tight">{title}</span>
                 <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 cursor-pointer relative" onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const pos = (e.clientX - rect.left) / rect.width;
                     audioRef.current.currentTime = pos * duration;
                     setCurrentTime(pos * duration);
                 }}>
                     <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }} />
                 </div>
             </div>

             <button 
                 onClick={() => setUserClosedFloating(true)} 
                 className="ml-2 p-1 text-gray-500 hover:text-white transition-colors border border-transparent hover:border-slate-700 rounded-full sm:opacity-0 group-hover/mini:opacity-100"
                 title="Cerrar reproductor flotante"
             >
                 <X size={14} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CustomAudioPlayer;
