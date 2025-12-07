import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const exercises = {
  chest: ['Push-ups', 'Bench Press', 'Chest Fly', 'Dips'],
  back: ['Pull-ups', 'Rows', 'Lat Pulldown', 'Deadlift'],
  legs: ['Squats', 'Lunges', 'Leg Press', 'Calf Raises'],
  shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises', 'Shrugs'],
  arms: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls', 'Skull Crushers'],
  core: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises'],
};

const WorkoutPlanner = () => {
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('workoutPlan');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeDay, setActiveDay] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    localStorage.setItem('workoutPlan', JSON.stringify(workouts));
  }, [workouts]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleExercise = (exercise) => {
    setSelectedExercises(prev =>
      prev.includes(exercise) ? prev.filter(e => e !== exercise) : [...prev, exercise]
    );
  };

  const saveWorkout = () => {
    if (selectedExercises.length === 0) return;
    setWorkouts(prev => {
      const filtered = prev.filter(w => w.day !== activeDay);
      return [...filtered, { day: activeDay, exercises: selectedExercises }];
    });
    setActiveDay(null);
    setSelectedExercises([]);
  };

  const getWorkoutForDay = (day) => workouts.find(w => w.day === day);

  if (activeDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
        <button onClick={() => { setActiveDay(null); setSelectedExercises([]); }} className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">{activeDay} Workout</h1>

          {Object.entries(exercises).map(([category, exList]) => (
            <div key={category} className="mb-6">
              <h3 className="text-white/60 uppercase text-sm mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {exList.map(ex => (
                  <button
                    key={ex}
                    onClick={() => toggleExercise(ex)}
                    className={`p-3 rounded-lg text-left ${selectedExercises.includes(ex) ? 'bg-orange-500 text-white' : 'bg-white/10 text-white'}`}
                  >
                    {selectedExercises.includes(ex) ? '✓ ' : ''}{ex}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={saveWorkout}
            disabled={selectedExercises.length === 0}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg disabled:opacity-50"
          >
            Save Workout ({selectedExercises.length} exercises)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🏋️ Workout Planner</h1>

        <div className="space-y-3">
          {days.map(day => {
            const workout = getWorkoutForDay(day);
            return (
              <div
                key={day}
                onClick={() => { setActiveDay(day); setSelectedExercises(workout?.exercises || []); }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 cursor-pointer hover:bg-white/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-bold">{day}</h3>
                    {workout ? (
                      <p className="text-white/60 text-sm">{workout.exercises.length} exercises</p>
                    ) : (
                      <p className="text-white/40 text-sm">Rest day - tap to plan</p>
                    )}
                  </div>
                  <span className="text-2xl">{workout ? '💪' : '😴'}</span>
                </div>
                {workout && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {workout.exercises.slice(0, 4).map(ex => (
                      <span key={ex} className="px-2 py-0.5 bg-orange-500/30 text-orange-300 text-xs rounded">{ex}</span>
                    ))}
                    {workout.exercises.length > 4 && (
                      <span className="text-white/40 text-xs">+{workout.exercises.length - 4} more</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <div className="text-white/60 text-sm">Weekly Summary</div>
          <div className="text-2xl font-bold text-white">
            {workouts.reduce((sum, w) => sum + w.exercises.length, 0)} total exercises
          </div>
          <div className="text-white/40">{workouts.length} active days</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner;
