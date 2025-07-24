import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Star,
  Lightbulb
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the primary benefit of AI automation in business?',
    options: [
      'Replacing all human workers',
      'Increasing efficiency and reducing manual tasks',
      'Making decisions without human input',
      'Eliminating the need for strategy'
    ],
    correctAnswer: 1,
    explanation: 'AI automation primarily helps businesses increase efficiency by handling repetitive tasks, allowing humans to focus on strategic work.',
    difficulty: 'easy',
    points: 10
  },
  {
    id: '2',
    question: 'Which of these is NOT a typical use case for AI assistants?',
    options: [
      'Customer support automation',
      'Lead qualification',
      'Physical manufacturing',
      'Content generation'
    ],
    correctAnswer: 2,
    explanation: 'AI assistants excel at digital tasks like customer support, lead qualification, and content generation, but physical manufacturing requires robotics.',
    difficulty: 'medium',
    points: 15
  },
  {
    id: '3',
    question: 'What does ROI stand for in business automation?',
    options: [
      'Return on Investment',
      'Rate of Implementation',
      'Risk of Integration',
      'Robotic Operational Intelligence'
    ],
    correctAnswer: 0,
    explanation: 'ROI (Return on Investment) measures the financial benefit gained from automation investments compared to their cost.',
    difficulty: 'easy',
    points: 10
  },
  {
    id: '4',
    question: 'Which technology is essential for natural language processing in AI?',
    options: [
      'Blockchain',
      'Machine Learning',
      'Quantum Computing',
      'Virtual Reality'
    ],
    correctAnswer: 1,
    explanation: 'Machine Learning, particularly deep learning models, is fundamental for AI systems to understand and process natural language.',
    difficulty: 'medium',
    points: 15
  },
  {
    id: '5',
    question: 'What is the most important factor for successful AI implementation?',
    options: [
      'Having the most advanced technology',
      'Replacing all existing systems',
      'Proper data quality and preparation',
      'Hiring only AI specialists'
    ],
    correctAnswer: 2,
    explanation: 'High-quality, well-prepared data is crucial for AI success. Poor data quality leads to poor AI performance regardless of technology sophistication.',
    difficulty: 'hard',
    points: 20
  }
];

export const InteractiveQuiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Timer logic
  useEffect(() => {
    if (isTimerActive && timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive, showExplanation]);

  // Start timer when quiz opens
  useEffect(() => {
    if (isOpen && !quizCompleted) {
      setIsTimerActive(true);
      setTimeLeft(30);
    }
  }, [isOpen, currentQuestion]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setShowExplanation(true);
    // Auto-select wrong answer when time runs out
    if (selectedAnswer === null) {
      setSelectedAnswer(-1);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowExplanation(true);

    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;

    if (isCorrect) {
      setScore(score + question.points);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      setQuizCompleted(true);
      setIsTimerActive(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const getScoreRating = () => {
    const percentage = (correctAnswers / quizQuestions.length) * 100;
    if (percentage >= 90) return { rating: 'AI Expert', color: 'text-yellow-400', icon: Trophy };
    if (percentage >= 70) return { rating: 'AI Enthusiast', color: 'text-purple-400', icon: Star };
    if (percentage >= 50) return { rating: 'AI Learner', color: 'text-blue-400', icon: Lightbulb };
    return { rating: 'AI Beginner', color: 'text-gray-400', icon: Brain };
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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

        {/* Quiz Modal */}
        <motion.div
          className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {!quizCompleted ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-8 h-8 text-purple-400" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Knowledge Quiz</h2>
                      <p className="text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                    </div>
                  </div>
                  
                  {/* Timer */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                        {timeLeft}s
                      </div>
                      <div className="text-xs text-gray-400">Time Left</div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          quizQuestions[currentQuestion].difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          quizQuestions[currentQuestion].difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {quizQuestions[currentQuestion].difficulty.toUpperCase()}
                        </span>
                        <span className="text-purple-400 text-sm font-medium">
                          {quizQuestions[currentQuestion].points} points
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white leading-relaxed">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                    </div>

                    {/* Answer Options */}
                    <div className="space-y-3 mb-6">
                      {quizQuestions[currentQuestion].options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                        const showResult = showExplanation;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showExplanation}
                            className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                              showResult
                                ? isCorrect
                                  ? 'bg-green-500/20 border-green-500 text-green-400'
                                  : isSelected
                                  ? 'bg-red-500/20 border-red-500 text-red-400'
                                  : 'glass text-gray-300'
                                : isSelected
                                ? 'bg-purple-500/20 border-purple-500 text-white'
                                : 'glass text-gray-300 hover:bg-white/5'
                            }`}
                            whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                            whileTap={{ scale: showExplanation ? 1 : 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showResult && (
                                <div className="flex-shrink-0 ml-3">
                                  {isCorrect ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                  ) : isSelected ? (
                                    <XCircle className="w-5 h-5 text-red-400" />
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="glass p-4 rounded-xl mb-6"
                        >
                          <div className="flex items-start space-x-3">
                            <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-white font-medium mb-2">Explanation</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {quizQuestions[currentQuestion].explanation}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Next Button */}
                    {showExplanation && (
                      <motion.button
                        onClick={handleNextQuestion}
                        className="w-full px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Quiz Completed */
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-8"
              >
                {(() => {
                  const { rating, color, icon: Icon } = getScoreRating();
                  return (
                    <div className="flex flex-col items-center">
                      <Icon className={`w-16 h-16 ${color} mb-4`} />
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Quiz Complete!
                      </h2>
                      <p className={`text-xl font-semibold ${color}`}>{rating}</p>
                    </div>
                  );
                })()}
              </motion.div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">{score}</div>
                  <div className="text-gray-400 text-sm">Total Points</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{correctAnswers}</div>
                  <div className="text-gray-400 text-sm">Correct</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">
                    {Math.round((correctAnswers / quizQuestions.length) * 100)}%
                  </div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  onClick={resetQuiz}
                  className="flex-1 px-6 py-3 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Retake Quiz
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Exploring
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};