import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  RotateCcw, 
  Target, 
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useGamification } from '../gamification/GamificationSystem';

interface ScenarioChoice {
  id: string;
  text: string;
  consequence: string;
  points: number;
  nextScenario?: string;
  outcome: 'success' | 'warning' | 'info';
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  context: string;
  choices: ScenarioChoice[];
  category: 'business' | 'technical' | 'strategic';
}

interface ScenarioProgress {
  currentScenario: string;
  choicesMade: Array<{ scenarioId: string; choiceId: string; points: number }>;
  totalPoints: number;
  path: string[];
}

const scenarios: Scenario[] = [
  {
    id: 'start',
    title: 'Welcome to Your AI Journey',
    description: 'You\'re the CEO of a growing company looking to implement AI automation. Your team is excited but cautious about the changes ahead.',
    context: 'Your company has 200 employees and processes 1000+ customer inquiries daily. Manual processes are slowing growth.',
    choices: [
      {
        id: 'gradual',
        text: 'Start with a small pilot project in customer support',
        consequence: 'Smart choice! Pilot projects reduce risk and build confidence.',
        points: 20,
        nextScenario: 'pilot-success',
        outcome: 'success'
      },
      {
        id: 'aggressive',
        text: 'Implement AI across all departments immediately',
        consequence: 'Bold move, but this could overwhelm your team and create resistance.',
        points: 5,
        nextScenario: 'resistance',
        outcome: 'warning'
      },
      {
        id: 'research',
        text: 'Spend 6 months researching before making any decisions',
        consequence: 'Thorough research is valuable, but competitors might gain an advantage.',
        points: 10,
        nextScenario: 'analysis-paralysis',
        outcome: 'info'
      }
    ],
    category: 'strategic'
  },
  {
    id: 'pilot-success',
    title: 'Pilot Project Success',
    description: 'Your customer support AI pilot reduced response times by 70% and improved satisfaction scores. The team is excited about the results.',
    context: 'Customer complaints dropped 40%, and your support team now handles 3x more inquiries with the same headcount.',
    choices: [
      {
        id: 'expand-support',
        text: 'Expand AI to handle more complex support scenarios',
        consequence: 'Excellent! Building on success creates momentum and expertise.',
        points: 25,
        nextScenario: 'advanced-ai',
        outcome: 'success'
      },
      {
        id: 'new-department',
        text: 'Implement AI in sales and marketing next',
        consequence: 'Good strategy! Cross-department implementation leverages learnings.',
        points: 20,
        nextScenario: 'sales-automation',
        outcome: 'success'
      },
      {
        id: 'pause-celebrate',
        text: 'Pause to celebrate and perfect the current system',
        consequence: 'Celebration is important, but momentum is valuable in AI adoption.',
        points: 15,
        nextScenario: 'momentum-loss',
        outcome: 'info'
      }
    ],
    category: 'business'
  },
  {
    id: 'resistance',
    title: 'Team Resistance',
    description: 'Your aggressive AI rollout has created anxiety among employees. Some departments are actively resisting the changes.',
    context: 'Productivity has temporarily decreased, and you\'re hearing concerns about job security and system complexity.',
    choices: [
      {
        id: 'training-focus',
        text: 'Invest heavily in training and change management',
        consequence: 'Wise decision! Addressing concerns head-on builds trust and competency.',
        points: 30,
        nextScenario: 'culture-shift',
        outcome: 'success'
      },
      {
        id: 'force-adoption',
        text: 'Push forward and mandate AI usage across all teams',
        consequence: 'This approach may work short-term but could damage morale long-term.',
        points: 5,
        nextScenario: 'morale-issues',
        outcome: 'warning'
      },
      {
        id: 'rollback',
        text: 'Temporarily rollback and restart with a different approach',
        consequence: 'Sometimes stepping back is the right move. You can apply lessons learned.',
        points: 15,
        nextScenario: 'restart-strategy',
        outcome: 'info'
      }
    ],
    category: 'business'
  },
  {
    id: 'advanced-ai',
    title: 'Advanced AI Implementation',
    description: 'Your AI system now handles complex customer scenarios and has learned from thousands of interactions. You\'re considering next-level capabilities.',
    context: 'Customer satisfaction is at an all-time high, and your AI can resolve 85% of inquiries without human intervention.',
    choices: [
      {
        id: 'predictive',
        text: 'Add predictive analytics to anticipate customer needs',
        consequence: 'Brilliant! Predictive capabilities will set you apart from competitors.',
        points: 35,
        nextScenario: 'market-leader',
        outcome: 'success'
      },
      {
        id: 'integration',
        text: 'Integrate with more business systems for holistic automation',
        consequence: 'Smart integration creates powerful synergies across your business.',
        points: 30,
        nextScenario: 'system-synergy',
        outcome: 'success'
      },
      {
        id: 'maintain',
        text: 'Focus on maintaining and optimizing current capabilities',
        consequence: 'Stability is valuable, but innovation drives competitive advantage.',
        points: 20,
        nextScenario: 'steady-state',
        outcome: 'info'
      }
    ],
    category: 'technical'
  },
  {
    id: 'market-leader',
    title: 'Market Leadership',
    description: 'Your AI implementation has made you an industry leader. Competitors are trying to catch up, and customers see you as the innovation benchmark.',
    context: 'Revenue has grown 150%, customer retention is 95%, and you\'re being featured in industry publications.',
    choices: [
      {
        id: 'share-knowledge',
        text: 'Share your AI journey publicly to help the industry',
        consequence: 'Thought leadership builds your brand and attracts top talent.',
        points: 40,
        outcome: 'success'
      },
      {
        id: 'competitive-advantage',
        text: 'Keep your AI strategies secret to maintain competitive advantage',
        consequence: 'Protecting advantages is smart, but collaboration can accelerate innovation.',
        points: 25,
        outcome: 'info'
      },
      {
        id: 'expand-globally',
        text: 'Use AI success to expand into new global markets',
        consequence: 'AI-powered expansion can scale efficiently across markets.',
        points: 35,
        outcome: 'success'
      }
    ],
    category: 'strategic'
  }
];

export const BranchingScenarios: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState<ScenarioProgress>({
    currentScenario: 'start',
    choicesMade: [],
    totalPoints: 0,
    path: ['start']
  });
  const [showConsequence, setShowConsequence] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const { addPoints, showNotification } = useGamification();

  const currentScenario = scenarios.find(s => s.id === progress.currentScenario);

  const makeChoice = (choice: ScenarioChoice) => {
    setSelectedChoice(choice);
    setShowConsequence(true);

    // Add points to gamification system
    addPoints(choice.points, `Scenario choice: ${choice.text}`);

    // Update progress
    const newProgress = {
      ...progress,
      choicesMade: [...progress.choicesMade, {
        scenarioId: progress.currentScenario,
        choiceId: choice.id,
        points: choice.points
      }],
      totalPoints: progress.totalPoints + choice.points
    };

    setProgress(newProgress);
  };

  const continueToNext = () => {
    if (!selectedChoice) return;

    if (selectedChoice.nextScenario) {
      setProgress(prev => ({
        ...prev,
        currentScenario: selectedChoice.nextScenario!,
        path: [...prev.path, selectedChoice.nextScenario!]
      }));
      setShowConsequence(false);
      setSelectedChoice(null);
    } else {
      setIsComplete(true);
      showNotification('Scenario complete! You\'ve mastered AI decision-making.', 'achievement');
    }
  };

  const resetScenario = () => {
    setProgress({
      currentScenario: 'start',
      choicesMade: [],
      totalPoints: 0,
      path: ['start']
    });
    setShowConsequence(false);
    setSelectedChoice(null);
    setIsComplete(false);
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      default: return null;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success': return 'border-green-400 bg-green-400/10';
      case 'warning': return 'border-yellow-400 bg-yellow-400/10';
      case 'info': return 'border-blue-400 bg-blue-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
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

        {/* Scenario Modal */}
        <motion.div
          className="relative w-full max-w-4xl glass-card rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {!isComplete ? (
            <>
              {/* Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-purple-400" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Decision Scenarios</h2>
                      <p className="text-gray-400">Navigate real-world AI implementation challenges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{progress.totalPoints}</div>
                      <div className="text-xs text-gray-400">Points</div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Progress Path */}
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Path:</span>
                    {progress.path.map((scenarioId, index) => (
                      <React.Fragment key={scenarioId}>
                        <span className="text-purple-400">
                          {scenarios.find(s => s.id === scenarioId)?.title || scenarioId}
                        </span>
                        {index < progress.path.length - 1 && <ArrowRight className="w-4 h-4" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scenario Content */}
              <div className="p-6">
                {currentScenario && (
                  <AnimatePresence mode="wait">
                    {!showConsequence ? (
                      <motion.div
                        key="scenario"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Scenario Info */}
                        <div className="mb-8">
                          <div className="flex items-center space-x-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              currentScenario.category === 'business' ? 'bg-green-500/20 text-green-400' :
                              currentScenario.category === 'technical' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {currentScenario.category.toUpperCase()}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {currentScenario.title}
                          </h3>
                          
                          <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                            {currentScenario.description}
                          </p>
                          
                          <div className="glass p-4 rounded-xl">
                            <div className="flex items-start space-x-3">
                              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-white font-medium mb-2">Context</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                  {currentScenario.context}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Choices */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            What's your decision?
                          </h4>
                          {currentScenario.choices.map((choice, index) => (
                            <motion.button
                              key={choice.id}
                              onClick={() => makeChoice(choice)}
                              className={`w-full p-6 text-left rounded-xl transition-all duration-300 border-2 ${getOutcomeColor(choice.outcome)} hover:scale-102`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    {getOutcomeIcon(choice.outcome)}
                                    <span className="text-white font-medium">{choice.text}</span>
                                  </div>
                                  <p className="text-gray-400 text-sm">
                                    Click to see the consequences of this choice
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <span className="text-purple-400 font-bold">+{choice.points}</span>
                                  <ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      /* Consequence Display */
                      <motion.div
                        key="consequence"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className="mb-8">
                          <motion.div
                            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                            style={{
                              background: selectedChoice?.outcome === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' :
                                         selectedChoice?.outcome === 'warning' ? 'linear-gradient(135deg, #F59E0B, #D97706)' :
                                         'linear-gradient(135deg, #3B82F6, #2563EB)'
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {selectedChoice && getOutcomeIcon(selectedChoice.outcome)}
                          </motion.div>

                          <h3 className="text-2xl font-bold text-white mb-4">
                            Decision Made!
                          </h3>
                          
                          <div className="glass p-6 rounded-xl mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Your Choice:</h4>
                            <p className="text-gray-300 mb-4">"{selectedChoice?.text}"</p>
                            
                            <div className="border-t border-glass-border pt-4">
                              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                                Consequence:
                              </h4>
                              <p className="text-gray-300 leading-relaxed">
                                {selectedChoice?.consequence}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="glass p-4 rounded-xl">
                              <div className="text-2xl font-bold text-purple-400">+{selectedChoice?.points}</div>
                              <div className="text-gray-400 text-sm">Points Earned</div>
                            </div>
                            <div className="glass p-4 rounded-xl">
                              <div className="text-2xl font-bold text-cyan-400">{progress.totalPoints + (selectedChoice?.points || 0)}</div>
                              <div className="text-gray-400 text-sm">Total Points</div>
                            </div>
                          </div>

                          <motion.button
                            onClick={continueToNext}
                            className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300 flex items-center mx-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {selectedChoice?.nextScenario ? 'Continue Journey' : 'Complete Scenario'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </>
          ) : (
            /* Completion Screen */
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Scenario Complete!
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  You've successfully navigated the AI implementation journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass p-6 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{progress.totalPoints}</div>
                  <div className="text-gray-400">Total Points</div>
                </div>
                <div className="glass p-6 rounded-xl">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{progress.choicesMade.length}</div>
                  <div className="text-gray-400">Decisions Made</div>
                </div>
                <div className="glass p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-400 mb-2">{progress.path.length}</div>
                  <div className="text-gray-400">Scenarios Completed</div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <motion.button
                  onClick={resetScenario}
                  className="px-8 py-4 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Try Different Path
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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