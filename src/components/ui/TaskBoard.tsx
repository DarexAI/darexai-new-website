import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Flag,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Button from './Button';
import Card from './Card';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'complete' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Column {
  id: string;
  title: string;
  status: Task['status'];
  color: string;
  icon: React.ElementType;
}

interface TaskBoardProps {
  tasks?: Task[];
  onTaskCreate?: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
  className?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks = [],
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  className = ''
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const columns: Column[] = [
    { id: 'pending', title: 'Pending', status: 'pending', color: 'text-gray-400', icon: Clock },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'text-warning-orange', icon: AlertCircle },
    { id: 'complete', title: 'Complete', status: 'complete', color: 'text-success-green', icon: CheckCircle },
    { id: 'cancelled', title: 'Cancelled', status: 'cancelled', color: 'text-error-red', icon: XCircle },
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-500';
      case 'medium': return 'bg-electric-blue';
      case 'high': return 'bg-warning-orange';
      case 'urgent': return 'bg-error-red';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    if (draggedTask && onTaskUpdate) {
      onTaskUpdate(draggedTask.id, { status: newStatus });
    }
    setDraggedTask(null);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          const ColumnIcon = column.icon;

          return (
            <div
              key={column.id}
              className="glass-card p-4 min-h-96"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ColumnIcon className={`w-5 h-5 ${column.color}`} />
                  <h3 className="font-heading font-semibold text-white">
                    {column.title}
                  </h3>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => {
                    if (onTaskCreate) {
                      onTaskCreate({
                        title: 'New Task',
                        status: column.status,
                        priority: 'medium'
                      });
                    }
                  }}
                />
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                <AnimatePresence>
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="cursor-move"
                    >
                      <Card
                        className="p-4 hover:shadow-glow-blue transition-all duration-300"
                        hover={true}
                      >
                        {/* Task Header */}
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-white text-sm line-clamp-2">
                            {task.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<MoreHorizontal className="w-3 h-3" />}
                          />
                        </div>

                        {/* Task Description */}
                        {task.description && (
                          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        {/* Task Tags */}
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {task.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-electric-blue bg-opacity-20 text-electric-blue text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {task.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                                +{task.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Task Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {/* Priority Indicator */}
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            
                            {/* Due Date */}
                            {task.dueDate && (
                              <div className="flex items-center space-x-1 text-gray-400">
                                <Calendar className="w-3 h-3" />
                                <span className="text-xs">
                                  {formatDate(task.dueDate)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Assignee */}
                          {task.assignee && (
                            <div className="flex items-center space-x-1">
                              {task.assignee.avatar ? (
                                <img
                                  src={task.assignee.avatar}
                                  alt={task.assignee.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                                  <User className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Empty State */}
              {columnTasks.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ColumnIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-sm">No tasks yet</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      if (onTaskCreate) {
                        onTaskCreate({
                          title: 'New Task',
                          status: column.status,
                          priority: 'medium'
                        });
                      }
                    }}
                  >
                    Add first task
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;