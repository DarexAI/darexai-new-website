import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Download,
  Share2,
  Heart,
  Eye,
  Headphones,
  Film,
  Image as ImageIcon,
  Mic
} from 'lucide-react';
import { useGamification } from '../gamification/GamificationSystem';

interface MediaItem {
  id: string;
  type: 'video' | 'audio' | 'image' | 'interactive';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: number;
  category: string;
  likes: number;
  views: number;
}

interface MultimediaExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

const mediaLibrary: MediaItem[] = [
  {
    id: '1',
    type: 'video',
    title: 'AI Automation in Action',
    description: 'See how our AI platform transforms business operations in real-time',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop',
    duration: 120,
    category: 'Demo',
    likes: 1247,
    views: 15632
  },
  {
    id: '2',
    type: 'audio',
    title: 'AI Success Stories Podcast',
    description: 'Listen to real customer success stories and transformation journeys',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 180,
    category: 'Podcast',
    likes: 892,
    views: 8934
  },
  {
    id: '3',
    type: 'image',
    title: 'AI Architecture Diagram',
    description: 'Interactive visualization of our AI automation architecture',
    url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Technical',
    likes: 567,
    views: 4521
  },
  {
    id: '4',
    type: 'interactive',
    title: '3D AI Workflow Simulator',
    description: 'Explore AI workflows in an interactive 3D environment',
    url: '',
    category: 'Interactive',
    likes: 2341,
    views: 12847
  }
];

const MediaPlayer: React.FC<{ media: MediaItem; onClose: () => void }> = ({ media, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { addPoints } = useGamification();

  useEffect(() => {
    // Award points for viewing media
    addPoints(10, `Viewing ${media.type}: ${media.title}`);
  }, [media, addPoints]);

  const togglePlay = () => {
    const element = videoRef.current || audioRef.current;
    if (element) {
      if (isPlaying) {
        element.pause();
      } else {
        element.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const element = videoRef.current || audioRef.current;
    if (element) {
      element.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    const element = videoRef.current || audioRef.current;
    if (element) {
      const progress = (element.currentTime / element.duration) * 100;
      setProgress(progress);
      setCurrentTime(element.currentTime);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = videoRef.current || audioRef.current;
    if (element) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * element.duration;
      element.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      addPoints(5, 'Liking media content');
    }
  };

  const handleShare = () => {
    navigator.share?.({
      title: media.title,
      text: media.description,
      url: window.location.href
    });
    addPoints(10, 'Sharing content');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          ×
        </button>

        {/* Media Content */}
        <div className="bg-black rounded-xl overflow-hidden">
          {media.type === 'video' && (
            <video
              ref={videoRef}
              src={media.url}
              className="w-full aspect-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleTimeUpdate}
              poster={media.thumbnail}
            />
          )}

          {media.type === 'audio' && (
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
              <audio
                ref={audioRef}
                src={media.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
              />
              <div className="text-center">
                <Headphones className="w-24 h-24 text-white/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{media.title}</h3>
                <p className="text-white/70">{media.description}</p>
              </div>
              
              {/* Audio Visualizer */}
              <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center space-x-1 p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-purple-400 rounded-full"
                    animate={{
                      height: isPlaying ? [4, 32, 4] : 4,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {media.type === 'image' && (
            <div className="aspect-video relative">
              <img
                src={media.url}
                alt={media.title}
                className="w-full h-full object-cover"
              />
              {/* Interactive Hotspots */}
              <motion.div
                className="absolute top-1/4 left-1/3 w-4 h-4 bg-purple-400 rounded-full cursor-pointer"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.5 }}
                onClick={() => addPoints(5, 'Exploring interactive hotspot')}
              />
              <motion.div
                className="absolute top-2/3 right-1/4 w-4 h-4 bg-cyan-400 rounded-full cursor-pointer"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.5 }}
                onClick={() => addPoints(5, 'Exploring interactive hotspot')}
              />
            </div>
          )}

          {media.type === 'interactive' && (
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-8">
                  {/* 3D-like visualization */}
                  <motion.div
                    className="w-32 h-32 mx-auto relative"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg transform rotate-12"></div>
                    <div className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg transform -rotate-12"></div>
                    <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                      <Film className="w-8 h-8 text-purple-600" />
                    </div>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{media.title}</h3>
                <p className="text-white/70 mb-6">{media.description}</p>
                <button
                  onClick={() => addPoints(20, 'Interacting with 3D simulator')}
                  className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-glow-purple transition-all duration-300"
                >
                  Launch Simulator
                </button>
              </div>
            </div>
          )}

          {/* Media Controls */}
          {(media.type === 'video' || media.type === 'audio') && (
            <div className="p-4 bg-black/80">
              {/* Progress Bar */}
              <div
                className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                  </button>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(media.duration || 0)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Info */}
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{media.title}</h2>
          <p className="text-white/70 mb-4">{media.description}</p>
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{media.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{media.likes.toLocaleString()} likes</span>
            </div>
            <span className="px-2 py-1 bg-white/20 rounded-full">{media.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MultimediaExperience: React.FC<MultimediaExperienceProps> = ({ isOpen, onClose }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState('all');
  const { addPoints } = useGamification();

  const categories = ['all', 'Demo', 'Podcast', 'Technical', 'Interactive'];
  const filteredMedia = filter === 'all' 
    ? mediaLibrary 
    : mediaLibrary.filter(item => item.category === filter);

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return Film;
      case 'audio': return Headphones;
      case 'image': return ImageIcon;
      case 'interactive': return Mic;
      default: return Film;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {selectedMedia ? (
        <MediaPlayer
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      ) : (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Media Library */}
          <motion.div
            className="relative w-full max-w-6xl glass-card rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Media Experience</h2>
                  <p className="text-gray-400">Explore our interactive multimedia content</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2 mt-6">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-gradient-primary text-white'
                        : 'glass text-gray-300 hover:text-white'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Grid */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedia.map((media, index) => {
                  const MediaIcon = getMediaIcon(media.type);
                  
                  return (
                    <motion.div
                      key={media.id}
                      className="glass-card rounded-xl overflow-hidden cursor-pointer hover-lift group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => {
                        setSelectedMedia(media);
                        addPoints(5, 'Opening media content');
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
                        {media.thumbnail ? (
                          <img
                            src={media.thumbnail}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MediaIcon className="w-12 h-12 text-white/50" />
                          </div>
                        )}
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        {media.duration && (
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                            {Math.floor(media.duration / 60)}:{(media.duration % 60).toString().padStart(2, '0')}
                          </div>
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 rounded text-white text-xs flex items-center space-x-1">
                          <MediaIcon className="w-3 h-3" />
                          <span>{media.type.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 line-clamp-2">
                          {media.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {media.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{media.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{media.likes.toLocaleString()}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-gray-700 rounded">{media.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};