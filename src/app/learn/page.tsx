'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  ChevronRight,
  Trophy,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Card, Badge, ProgressBar, Button } from '@/components/ui';
import { learningLevels, Level, Lesson, getTotalLessons } from '@/data/learning';

export default function LearnPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Load completed lessons from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const totalLessons = getTotalLessons();
  const completedCount = completedLessons.length;
  const overallProgress = (completedCount / totalLessons) * 100;

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
    }
  };

  // Show lesson content
  if (selectedLesson) {
    return (
      <LessonView
        lesson={selectedLesson}
        isCompleted={isLessonCompleted(selectedLesson.id)}
        onComplete={() => markLessonComplete(selectedLesson.id)}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  // Show level lessons
  if (selectedLevel) {
    return (
      <LevelView
        level={selectedLevel}
        completedLessons={completedLessons}
        onSelectLesson={setSelectedLesson}
        onBack={() => setSelectedLevel(null)}
      />
    );
  }

  // Show all levels
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Investment 101</h1>
          </div>
          <p className="text-xl text-primary-100 max-w-3xl mb-8">
            Your complete beginner's guide to understanding money, investing, and
            making your savings work harder for you.
          </p>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary-100">Your Progress</span>
              <span className="font-bold">
                {completedCount}/{totalLessons} lessons
              </span>
            </div>
            <ProgressBar value={overallProgress} color="success" />
            {completedCount === totalLessons ? (
              <div className="flex items-center space-x-2 mt-4 text-yellow-300">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Course Completed!</span>
              </div>
            ) : (
              <p className="text-sm text-primary-200 mt-2">
                {totalLessons - completedCount} lessons remaining
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {learningLevels.map((level, index) => {
              const levelCompletedCount = level.lessons.filter((l) =>
                completedLessons.includes(l.id)
              ).length;
              const levelProgress = (levelCompletedCount / level.lessons.length) * 100;
              const isUnlocked = index === 0 ||
                learningLevels[index - 1].lessons.every((l) =>
                  completedLessons.includes(l.id)
                );

              return (
                <button
                  key={level.id}
                  onClick={() => isUnlocked && setSelectedLevel(level)}
                  disabled={!isUnlocked}
                  className={`text-left rounded-xl border-2 transition-all ${
                    isUnlocked
                      ? 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-lg cursor-pointer'
                      : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div
                    className="p-6"
                    style={{
                      borderBottom: `4px solid ${isUnlocked ? level.color : '#9CA3AF'}`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{level.icon}</span>
                        <div>
                          <p className="text-sm text-gray-500">Level {level.id}</p>
                          <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
                        </div>
                      </div>
                      {!isUnlocked && <Lock className="w-6 h-6 text-gray-400" />}
                      {levelProgress === 100 && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{level.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {level.lessons.length} lessons
                      </span>
                      {isUnlocked && levelProgress > 0 && levelProgress < 100 && (
                        <Badge variant="info">{Math.round(levelProgress)}% complete</Badge>
                      )}
                    </div>
                    {isUnlocked && (
                      <div className="mt-4">
                        <ProgressBar value={levelProgress} color="primary" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Apply What You've Learned?
          </h2>
          <p className="text-gray-600 mb-6">
            Get personalized scheme recommendations based on your profile
          </p>
          <Link
            href="/recommend"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Recommendations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

interface LevelViewProps {
  level: Level;
  completedLessons: string[];
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

function LevelView({ level, completedLessons, onSelectLesson, onBack }: LevelViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section
        className="py-12"
        style={{ backgroundColor: `${level.color}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back to all levels
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{level.icon}</span>
            <div>
              <p className="text-sm text-gray-500">Level {level.id}</p>
              <h1 className="text-3xl font-bold text-gray-900">{level.title}</h1>
              <p className="text-gray-600 mt-1">{level.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {level.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const previousCompleted =
                index === 0 || completedLessons.includes(level.lessons[index - 1].id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => previousCompleted && onSelectLesson(lesson)}
                  disabled={!previousCompleted}
                  className={`w-full text-left rounded-xl border transition-all ${
                    previousCompleted
                      ? 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-md cursor-pointer'
                      : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="p-6 flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      {isCompleted ? (
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                      ) : !previousCompleted ? (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-gray-400" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">{lesson.icon}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{lesson.subtitle}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="flex items-center text-xs text-gray-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center text-xs text-gray-400">
                          <Star className="w-3 h-3 mr-1" />
                          {lesson.quiz.length} quiz questions
                        </span>
                      </div>
                    </div>
                    {previousCompleted && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
}

function LessonView({ lesson, isCompleted, onComplete, onBack }: LessonViewProps) {
  const [currentSection, setCurrentSection] = useState<'content' | 'quiz'>('content');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizSubmit = () => {
    setShowResults(true);
    const allCorrect = lesson.quiz.every(
      (q, idx) => quizAnswers[idx] === q.correctAnswer
    );
    if (allCorrect) {
      onComplete();
    }
  };

  const correctCount = lesson.quiz.filter(
    (q, idx) => quizAnswers[idx] === q.correctAnswer
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSection('content')}
                className={`px-4 py-2 rounded-lg ${
                  currentSection === 'content'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Lesson
              </button>
              <button
                onClick={() => setCurrentSection('quiz')}
                className={`px-4 py-2 rounded-lg ${
                  currentSection === 'quiz'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Quiz
              </button>
            </div>
            {isCompleted && (
              <Badge variant="success">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentSection === 'content' ? (
            <div>
              {/* Lesson Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-4xl">{lesson.icon}</span>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                    <p className="text-gray-600">{lesson.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration} read
                  </span>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="space-y-6">
                {lesson.content.map((block, index) => (
                  <div key={index}>
                    {block.type === 'text' && (
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {block.content}
                      </p>
                    )}
                    {block.type === 'highlight' && (
                      <Card className="bg-primary-50 border-primary-200">
                        {block.title && (
                          <h3 className="font-semibold text-primary-900 mb-2">
                            {block.title}
                          </h3>
                        )}
                        <p className="text-primary-800 whitespace-pre-line">
                          {block.content}
                        </p>
                      </Card>
                    )}
                    {block.type === 'example' && (
                      <Card className="bg-amber-50 border-amber-200">
                        {block.title && (
                          <h3 className="font-semibold text-amber-900 mb-2">
                            {block.title}
                          </h3>
                        )}
                        <p className="text-amber-800 whitespace-pre-line">
                          {block.content}
                        </p>
                      </Card>
                    )}
                    {block.type === 'comparison' && (
                      <Card className="bg-gray-50 border-gray-200">
                        {block.title && (
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {block.title}
                          </h3>
                        )}
                        <p className="text-gray-700 whitespace-pre-line">
                          {block.content}
                        </p>
                      </Card>
                    )}
                  </div>
                ))}
              </div>

              {/* Continue to Quiz */}
              <div className="mt-12 text-center">
                <Button onClick={() => setCurrentSection('quiz')} size="lg">
                  Take the Quiz
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Quiz Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Time!</h2>
                <p className="text-gray-600">
                  Test your understanding of {lesson.title.toLowerCase()}
                </p>
              </div>

              {showResults ? (
                <div>
                  <Card
                    className={`text-center mb-8 ${
                      correctCount === lesson.quiz.length
                        ? 'bg-green-50 border-green-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="py-8">
                      {correctCount === lesson.quiz.length ? (
                        <>
                          <div className="text-6xl mb-4">🎉</div>
                          <h3 className="text-2xl font-bold text-green-800 mb-2">
                            Perfect Score!
                          </h3>
                          <p className="text-green-700">
                            You've mastered this lesson. Badge earned:{' '}
                            <strong>
                              {lesson.badge.icon} {lesson.badge.name}
                            </strong>
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="text-6xl mb-4">📚</div>
                          <h3 className="text-2xl font-bold text-amber-800 mb-2">
                            {correctCount}/{lesson.quiz.length} Correct
                          </h3>
                          <p className="text-amber-700">
                            Review the explanations below and try again!
                          </p>
                        </>
                      )}
                    </div>
                  </Card>

                  {/* Show answers */}
                  <div className="space-y-6">
                    {lesson.quiz.map((q, qIndex) => (
                      <Card
                        key={qIndex}
                        className={
                          quizAnswers[qIndex] === q.correctAnswer
                            ? 'border-green-200'
                            : 'border-red-200'
                        }
                      >
                        <h4 className="font-semibold text-gray-900 mb-4">
                          {qIndex + 1}. {q.question}
                        </h4>
                        <div className="space-y-2 mb-4">
                          {q.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-3 rounded-lg ${
                                oIndex === q.correctAnswer
                                  ? 'bg-green-100 text-green-800'
                                  : quizAnswers[qIndex] === oIndex
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-50 text-gray-600'
                              }`}
                            >
                              {option}
                              {oIndex === q.correctAnswer && (
                                <span className="ml-2">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center space-x-4">
                    {correctCount < lesson.quiz.length && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuizAnswers({});
                          setShowResults(false);
                        }}
                      >
                        Try Again
                      </Button>
                    )}
                    <Button onClick={onBack}>
                      {correctCount === lesson.quiz.length
                        ? 'Continue Learning'
                        : 'Back to Lessons'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {lesson.quiz.map((q, qIndex) => (
                    <Card key={qIndex}>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        {qIndex + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <button
                            key={oIndex}
                            onClick={() =>
                              setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })
                            }
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              quizAnswers[qIndex] === oIndex
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-primary-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </Card>
                  ))}

                  <div className="text-center pt-4">
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                      size="lg"
                    >
                      Submit Answers
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
