import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

function UserQuestionnaire() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [step, setStep] = useState(1);
  const MAX_STEPS = 14;

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    isPregnant: '',
    height: '',
    weight: '',
    bmi: '',
    fitnessLevel: '',
    experience: '',
    yogaGoals: [],
    focusAreas: [],
    practiceEnvironment: [],
    practiceFrequency: '',
    durationPreference: '',
    energyLevel: '',
    flexibilityLevel: '',
    preferredTime: '',
    healthConditions: {
      backPain: false,
      boneFracture: false,
      highBloodPressure: false,
      diabetes: false,
      otherIllnesses: '',
      injuries: ''
    }
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        console.log('No user logged in, redirecting to /auth');
        navigate('/auth');
      } else {
        console.log('Authenticated user:', u.uid, 'Email:', u.email);
      }
    });
    return unsubscribe;
  }, [auth, navigate]);

  const fetchData = async () => {
    try {
      axios.post(`http://localhost:5000/api/getYogaSuggestions`,
        {
          "userData": [
            { "question": "Age", "answer": formData.age },
            { "question": "Gender", "answer": formData.gender },
            { "question": "Is Pregnant", "answer": formData.isPregnant },
  {" question": "Height", "answer": formData.height },
  { "question": "Weight", "answer": formData.weight },
  { "question": "BMI", "answer": formData.bmi },
  { "question": "Fitness Level", "answer": formData.fitnessLevel },
  { "question": "Experience", "answer": formData.experience },
  {" question": "Yoga Goals", "answer": formData.yogaGoals.join(', ') },
  {" question": "Focus Areas"," answer": formData.focusAreas.join(', ') },
  { "question": "Practice Environment", "answer": formData.practiceEnvironment.join(', ') },
  { "question": "Practice Frequency", "answer": formData.practiceFrequency },
  { "question": "Duration Preference", "answer": formData.durationPreference },
  { "question": "Energy Level", "answer": formData.energyLevel },
  { "question": "Flexibility Level", "answer": formData.flexibilityLevel },
  {" question": "Preferred Time", "answer": formData.preferredTime },
  { "question": "Health Condition - Back Pain", "answer": formData.healthConditions.backPain ? 'Yes' : 'No' },
  { "question": "Health Condition - Bone Fracture"," answer": formData.healthConditions.boneFracture ? 'Yes' : 'No' },
  { "question": "Health Condition - High Blood Pressure", "answer": formData.healthConditions.highBloodPressure ? 'Yes' : 'No' },
  { "question": "Health Condition - Diabetes", "answer": formData.healthConditions.diabetes ? 'Yes' : 'No' },
  { "question": "Other Illnesses", "answer": formData.healthConditions.otherIllnesses },
  { "question": "Injuries", "answer": formData.healthConditions.injuries },
          
          ]
        }
      ).then((res) => {
        if(res.status === 200){
          if(res.data?.candidates[0]?.content?.parts[0]?.text){
            const rawText = res.data?.candidates[0]?.content?.parts[0]?.text;
            const cleanedText = rawText.replace(/```json\n?|```/g, '').trim();
            
            // alert(`Description: ${cleanedText[0].description} \n
            //   Benefits: ${cleanedText[0].benefits}`)
            alert(cleanedText)
          }
        }
      })
    } catch (error) {

    }
  }

  const calculateBMI = (h, w) => {
    if (!h || !w) return { bmi: '', category: '', advice: '', healthNote: '' };
    const m = h / 100;
    const bmi = (w / (m * m)).toFixed(1);
    let category = '', advice = '', healthNote = '';
    if (bmi < 18.5) {
      category = 'Underweight';
      advice = 'Weight gain recommended';
      healthNote = 'Underweight can lead to deficiencies—consult a professional.';
    } else if (bmi < 25) {
      category = 'Normal';
      advice = 'Maintain your healthy weight!';
      healthNote = 'Great job—keep up a balanced diet and activity.';
    } else if (bmi < 30) {
      category = 'Overweight';
      advice = 'Weight loss recommended';
      healthNote = 'Consider regular exercise and a balanced diet.';
    } else {
      category = 'Obese';
      advice = 'Significant weight loss recommended';
      healthNote = 'Consult a healthcare provider for personalized guidance.';
    }
    return { bmi, category, advice, healthNote };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.healthConditions) {
      setFormData((p) => ({
        ...p,
        healthConditions: {
          ...p.healthConditions,
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (['yogaGoals', 'focusAreas', 'practiceEnvironment'].includes(name)) {
      setFormData((p) => ({
        ...p,
        [name]: checked
          ? [...p[name], value]
          : p[name].filter((v) => v !== value)
      }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
      if (name === 'height' || name === 'weight') {
        const h = name === 'height' ? value : formData.height;
        const w = name === 'weight' ? value : formData.weight;
        setFormData((p) => ({ ...p, bmi: calculateBMI(h, w).bmi }));
      }
    }
  };

  const nextStep = () => {
    let msg = '';
    switch (step) {
      case 1:
        if (!formData.age) msg = 'Please enter your age.';
        break;
      case 2:
        if (!formData.gender) msg = 'Please select your gender.';
        break;
      case 3:
        if (formData.gender === 'Female' && !formData.isPregnant)
          msg = 'Please let us know if you are pregnant.';
        break;
      case 4:
        if (!formData.height || !formData.weight)
          msg = 'Please enter both height and weight.';
        break;
      case 5:
        if (!formData.fitnessLevel)
          msg = 'Please select your fitness level.';
        break;
      case 6:
        if (!formData.experience)
          msg = 'Please select your years of yoga experience.';
        break;
      case 7:
        if (!formData.yogaGoals.length)
          msg = 'Please choose at least one yoga goal.';
        break;
      case 8:
        if (!formData.focusAreas.length)
          msg = 'Please select at least one focus area.';
        break;
      case 9:
        if (!formData.practiceEnvironment.length)
          msg = 'Please choose at least one practice environment.';
        break;
      case 10:
        if (!formData.practiceFrequency)
          msg = 'Please select your practice frequency.';
        break;
      case 11:
        if (!formData.durationPreference)
          msg = 'Please select your preferred practice duration.';
        break;
      case 12:
        if (!formData.flexibilityLevel)
          msg = 'Please select your flexibility level.';
        break;
      case 13:
        if (!formData.preferredTime)
          msg = 'Please select your preferred time.';
        break;
      case 14:
        if (!formData.energyLevel)
          msg = 'Please select your energy level.';
        break;
      default:
        break;
    }
    if (msg) {
      alert(msg + '\n\nOtherwise I can’t suggest the best poses for you.');
      return;
    }

    if (step === 2 && formData.gender !== 'Female') {
      setStep(4);
      return;
    }

    setStep((p) => Math.min(p + 1, MAX_STEPS));
  };

  const prevStep = () => {
    if (step === 4 && formData.gender !== 'Female') {
      setStep(2);
    } else {
      setStep((p) => Math.max(p - 1, 1));
    }
  };

  const suggestPoses = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('No authenticated user');
      console.log('Calling backend with userId:', userId);
      const response = await axios.post(
        'https://us-central1-calmasana-dc908.cloudfunctions.net/suggestPoses',
        { userId },
        { timeout: 10000 }
      );
      console.log('Backend response:', JSON.stringify(response.data, null, 2));
      if (!response.data.poses || !Array.isArray(response.data.poses)) {
        throw new Error('Invalid poses in response: ' + JSON.stringify(response.data));
      }
      return response.data.poses;
    } catch (err) {
      console.error('Backend Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        stack: err.stack
      });
      throw err; // Propagate error to handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.durationPreference || !formData.flexibilityLevel || !formData.preferredTime || !formData.energyLevel) {
      alert('Please complete all required fields.\n\nOtherwise I can’t suggest the best poses.');
      return;
    }
    try {
      fetchData()
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('User not authenticated');
      console.log('Starting submit for user:', uid);

      // Call backend
      console.log('Fetching suggested poses...');
      const suggestedPoses = await suggestPoses();
      console.log('Suggested poses received:', JSON.stringify(suggestedPoses, null, 2));

      // Save user profile
      console.log('Saving profile to Firestore...');
      await setDoc(doc(db, 'users', uid), {
        profile: formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      console.log('Profile saved successfully');

      // Save progress
      console.log('Saving progress to Firestore...');
      await setDoc(doc(db, 'progress', uid), {
        weeklyStats: [{ week: new Date().toISOString().split('T')[0], totalSessions: 0, averageAccuracy: 0 }],
        poseHistory: suggestedPoses.map(p => ({
          pose: p.name,
          date: new Date().toISOString(),
          accuracy: 0
        })),
      }, { merge: true });
      console.log('Progress saved successfully');

      // Navigate
      console.log('Navigating to /poses with poses:', suggestedPoses.length);
      navigate('/poses', { state: { poses: suggestedPoses } });
    } catch (err) {
      console.error('Submit Error:', {
        message: err.message,
        code: err.code,
        stack: err.stack
      });
      //alert(`Failed to save: ${err.message}`);
    }
  };

  

  const bmiInfo = calculateBMI(formData.height, formData.weight);
  const user = auth.currentUser;
  const userName = user?.email?.split('@')[0] || 'Friend';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-6">
          <h2 className="text-2xl font-bold">Welcome {userName}! 🧘</h2>
          <p className="mt-1">Step {step} of {MAX_STEPS}</p>
        </header>

        {/* <button onClick={fetchData}>api test</button> */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <div>
              <label className="block mb-1">How old are you?</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {step === 3 && formData.gender === 'Female' && (
            <div>
              <label className="block mb-1">Are you currently pregnant?</label>
              <select
                name="isPregnant"
                value={formData.isPregnant}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded-lg"
                />
              </div>
              {bmiInfo.bmi && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>BMI:</strong> {bmiInfo.bmi} ({bmiInfo.category})</p>
                  <p>{bmiInfo.advice}</p>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="block mb-1">Fitness level</label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          )}

          {step === 6 && (
            <div>
              <label className="block mb-1">Years of yoga experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="3+">More than 3 years</option>
              </select>
            </div>
          )}

          {step === 7 && (
            <div>
              <label className="block mb-1">Why do you want to do yoga?</label>
              <div className="grid grid-cols-2 gap-2">
                {['Fitness', 'Stress Relief', 'Sleep', 'Flexibility', 'Strength', 'Balance'].map((g) => (
                  <label key={g} className="flex items-center">
                    <input
                      type="checkbox"
                      name="yogaGoals"
                      value={g}
                      checked={formData.yogaGoals.includes(g)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 8 && (
            <div>
              <label className="block mb-1">Focus areas</label>
              <div className="grid grid-cols-2 gap-2">
                {['Core', 'Back', 'Legs', 'Arms', 'Mindfulness', 'Balance'].map((f) => (
                  <label key={f} className="flex items-center">
                    <input
                      type="checkbox"
                      name="focusAreas"
                      value={f}
                      checked={formData.focusAreas.includes(f)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 9 && (
            <div>
              <label className="block mb-1">Practice environment</label>
              <div className="grid grid-cols-2 gap-2">
                {['Home', 'Gym', 'Outdoors', 'Studio'].map((e) => (
                  <label key={e} className="flex items-center">
                    <input
                      type="checkbox"
                      name="practiceEnvironment"
                      value={e}
                      checked={formData.practiceEnvironment.includes(e)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {e}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 10 && (
            <div>
              <label className="block mb-1">Practice frequency</label>
              <select
                name="practiceFrequency"
                value={formData.practiceFrequency}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>Daily</option>
                <option>3-4 times a week</option>
                <option>1-2 times a week</option>
                <option>Occasionally</option>
              </select>
            </div>
          )}

          {step === 11 && (
            <div>
              <label className="block mb-1">Preferred duration</label>
              <select
                name="durationPreference"
                value={formData.durationPreference}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
          )}

          {step === 12 && (
            <div>
              <label className="block mb-1">Flexibility level</label>
              <select
                name="flexibilityLevel"
                value={formData.flexibilityLevel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
          )}

          {step === 13 && (
            <div>
              <label className="block mb-1">Preferred time of day</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Anytime</option>
              </select>
            </div>
          )}

          {step === 14 && (
            <div>
              <label className="block mb-1">Energy level</label>
              <select
                name="energyLevel"
                value={formData.energyLevel}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg"
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}
           
            {step < MAX_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Finish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserQuestionnaire;