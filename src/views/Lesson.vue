<template>
  <div class="lesson-page">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <img src="/منصة البصائر التعليمية.png" alt="بصائر">
          <span class="logo-text">بصائر <span class="logo-highlight">التعليمية</span></span>
        </router-link>
        
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link"><i class="fas fa-home"></i> الرئيسية</router-link></li>
          <li><router-link to="/map" class="nav-link"><i class="fas fa-map"></i> خريطة التعلم</router-link></li>
          <li><a href="#profile" class="nav-link"><i class="fas fa-user"></i> الملف الشخصي</a></li>
        </ul>
      </div>
    </nav>

    <div class="lesson-container">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <div class="lesson-progress">
          <div class="progress-info">
            <span>التقدم: {{ progressPercentage }}%</span>
            <span>{{ currentStep + 1 }} / {{ totalSteps }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
        
        <h1 class="lesson-title">{{ level?.title }}</h1>
        <p class="lesson-category">{{ level?.category }}</p>
        
        <div class="lesson-stats">
          <div class="stat">
            <i class="fas fa-trophy"></i>
            <span>{{ level?.xpReward }} نقطة</span>
          </div>
          <div class="stat">
            <i class="fas fa-clock"></i>
            <span>{{ level?.estimatedTime }}</span>
          </div>
          <div class="stat">
            <i class="fas fa-star"></i>
            <span>{{ earnedStars }} / {{ level?.starsAvailable }} نجوم</span>
          </div>
        </div>
      </div>

      <!-- Lesson Content -->
      <div class="lesson-content">
        <!-- Welcome Step -->
        <div v-if="currentStep === 0" class="content-section">
          <h2>مرحباً في درس: {{ level?.title }}</h2>
          <p>{{ level?.description }}</p>
          
          <div v-if="level?.content?.objectives" class="objectives">
            <h3>أهداف التعلم:</h3>
            <ul>
              <li v-for="objective in level.content.objectives" :key="objective">
                {{ objective }}
              </li>
            </ul>
          </div>
          
          <div class="lesson-actions">
            <button @click="nextStep" class="btn btn-primary">
              <i class="fas fa-play"></i>
              ابدأ الدرس
            </button>
          </div>
        </div>

        <!-- Interactive Content Steps -->
        <div v-else-if="currentStep > 0 && currentStep < totalSteps - 1" class="content-section">
          <!-- Prayer Simulation Game -->
          <div v-if="level?.type === 'interactive_game' && currentStep === 1" class="game-container">
            <h3>لعبة محاكاة الوضوء والصلاة</h3>
            <div class="game-area">
              <div class="wudu-steps">
                <h4>رتب خطوات الوضوء الصحيحة:</h4>
                <div class="drag-drop-game">
                  <div class="steps-container">
                    <div 
                      v-for="(step, index) in wuduSteps" 
                      :key="index"
                      class="step-item"
                      draggable="true"
                      @dragstart="dragStart($event, index)"
                      @dragover.prevent
                      @drop="drop($event, index)"
                    >
                      <i class="fas fa-grip-vertical"></i>
                      <span>{{ step }}</span>
                    </div>
                  </div>
                  <button @click="checkWuduOrder" class="btn btn-secondary">تحقق من الإجابة</button>
                  <div v-if="wuduFeedback" class="feedback" :class="wuduFeedback.type">
                    {{ wuduFeedback.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Story Lesson -->
          <div v-else-if="level?.type === 'story_lesson'" class="story-container">
            <h3>قصة تفاعلية: {{ level?.title }}</h3>
            <div v-if="level?.content?.chapters" class="story-chapters">
              <div 
                v-for="(chapter, index) in level.content.chapters" 
                :key="index"
                class="chapter"
              >
                <h4>{{ chapter.title }}</h4>
                <p>{{ chapter.content }}</p>
                <div class="lesson-box">
                  <strong>الدرس المستفاد:</strong> {{ chapter.lesson }}
                </div>
              </div>
            </div>
          </div>

          <!-- Audio Lesson -->
          <div v-else-if="level?.type === 'audio_lesson'" class="audio-container">
            <h3>أذكار يومية</h3>
            <div v-if="level?.content?.audioTracks" class="audio-tracks">
              <div 
                v-for="track in level.content.audioTracks" 
                :key="track.id"
                class="audio-track"
              >
                <h4>{{ track.title }}</h4>
                <p>المدة: {{ track.duration }}</p>
                <div class="athkar-list">
                  <div 
                    v-for="athkar in track.athkar" 
                    :key="athkar.text"
                    class="athkar-item"
                  >
                    <p class="athkar-text">{{ athkar.text }}</p>
                    <p class="repeat-info">كرر {{ athkar.repeat }} مرة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Task -->
          <div v-else-if="level?.type === 'video_task'" class="video-container">
            <h3>مهمة فيديو: {{ level?.title }}</h3>
            <div v-if="level?.content?.episodes" class="episodes">
              <div 
                v-for="episode in level.content.episodes" 
                :key="episode.title"
                class="episode"
              >
                <h4>{{ episode.title }}</h4>
                <p>{{ episode.description }}</p>
                <div class="tasks-list">
                  <h5>المهام:</h5>
                  <ul>
                    <li v-for="task in episode.tasks" :key="task">{{ task }}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div v-if="level?.content?.taskChecklist" class="task-checklist">
              <h4>قائمة المهام:</h4>
              <div 
                v-for="task in level.content.taskChecklist" 
                :key="task.id"
                class="task-item"
              >
                <label class="checkbox">
                  <input 
                    type="checkbox" 
                    v-model="completedTasks" 
                    :value="task.id"
                  >
                  <span class="checkmark"></span>
                  <span>{{ task.label }} ({{ task.points }} نقطة)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Interactive Story -->
          <div v-else-if="level?.type === 'interactive_story'" class="interactive-story">
            <h3>قصة تفاعلية: {{ level?.title }}</h3>
            <div v-if="level?.content?.stories" class="stories">
              <div 
                v-for="story in level.content.stories" 
                :key="story.title"
                class="story-scenario"
              >
                <h4>{{ story.title }}</h4>
                <p class="scenario">{{ story.scenario }}</p>
                <div class="choices">
                  <button 
                    v-for="choice in story.choices" 
                    :key="choice.text"
                    class="choice-btn"
                    @click="makeChoice(choice)"
                  >
                    {{ choice.text }}
                  </button>
                </div>
                <div v-if="selectedChoice" class="choice-feedback" :class="selectedChoice.result">
                  {{ selectedChoice.feedback }}
                </div>
              </div>
            </div>
          </div>

          <div class="lesson-actions">
            <button @click="previousStep" class="btn btn-secondary">
              <i class="fas fa-arrow-right"></i>
              السابق
            </button>
            <button @click="nextStep" class="btn btn-primary">
              التالي
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
        </div>

        <!-- Quiz Step -->
        <div v-else-if="currentStep === totalSteps - 1" class="content-section">
          <h2>اختبار الدرس</h2>
          <p>أجب عن الأسئلة التالية للتأكد من فهمك للدرس:</p>
          
          <div v-if="level?.quiz" class="quiz-container">
            <div 
              v-for="(question, qIndex) in level.quiz" 
              :key="question.id"
              class="question-item"
            >
              <h3>{{ qIndex + 1 }}. {{ question.text }}</h3>
              <div class="options">
                <label 
                  v-for="option in question.options" 
                  :key="option"
                  class="option-label"
                >
                  <input 
                    type="radio" 
                    :name="`question-${question.id}`"
                    :value="option"
                    v-model="quizAnswers[question.id]"
                  >
                  <span class="option-text">{{ option }}</span>
                </label>
              </div>
              <div v-if="quizFeedback[question.id]" class="feedback" :class="quizFeedback[question.id].type">
                {{ quizFeedback[question.id].message }}
              </div>
            </div>
          </div>
          
          <div class="lesson-actions">
            <button @click="previousStep" class="btn btn-secondary">
              <i class="fas fa-arrow-right"></i>
              السابق
            </button>
            <button @click="submitQuiz" class="btn btn-primary">
              <i class="fas fa-check"></i>
              إنهاء الاختبار
            </button>
          </div>
        </div>

        <!-- Completion Step -->
        <div v-else-if="currentStep === totalSteps" class="content-section">
          <div class="completion-message">
            <h2>🎉 مبروك! أكملت الدرس بنجاح</h2>
            <div class="results">
              <div class="result-item">
                <i class="fas fa-trophy"></i>
                <span>ربحت {{ level?.xpReward }} نقطة خبرة</span>
              </div>
              <div class="result-item">
                <i class="fas fa-star"></i>
                <span>حصلت على {{ earnedStars }} من {{ level?.starsAvailable }} نجوم</span>
              </div>
              <div class="stars-display">
                <i 
                  v-for="star in level?.starsAvailable" 
                  :key="star"
                  class="fas fa-star star"
                  :class="{ 'filled': star <= earnedStars }"
                ></i>
              </div>
            </div>
          </div>
          
          <div class="lesson-actions">
            <router-link to="/map" class="btn btn-secondary">
              <i class="fas fa-map"></i>
              العودة للخريطة
            </router-link>
            <button v-if="nextLevelId" @click="goToNextLevel" class="btn btn-primary">
              <i class="fas fa-arrow-left"></i>
              المستوى التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { curriculumData } from '@/data/curriculum'
import type { Level } from '@/types/curriculum'

const router = useRouter()
const route = useRoute()

const levelId = parseInt(route.params.id as string)
const level = computed(() => {
  for (const phase of curriculumData.kidsPath) {
    const foundLevel = phase.levels.find(l => l.id === levelId)
    if (foundLevel) return foundLevel
  }
  return null
})

// Lesson progress
const currentStep = ref(0)
const totalSteps = computed(() => {
  if (!level.value) return 1
  return level.value.type === 'exam' ? 3 : 4 // Welcome, Content, Quiz, Completion
})

const progressPercentage = computed(() => {
  return Math.round((currentStep.value / (totalSteps.value - 1)) * 100)
})

const earnedStars = ref(0)
const nextLevelId = computed(() => {
  if (!level.value) return null
  return levelId + 1
})

// Game state
const wuduSteps = ref([
  "غسل اليدين",
  "المضمضة", 
  "الاستنشاق",
  "غسل الوجه",
  "غسل اليدين للمرفقين",
  "مسح الرأس",
  "غسل القدمين"
])

const wuduFeedback = ref<{ type: string; message: string } | null>(null)

// Task completion
const completedTasks = ref<string[]>([])

// Story choices
const selectedChoice = ref<{ result: string; feedback: string } | null>(null)

// Quiz state
const quizAnswers = ref<Record<string, string>>({})
const quizFeedback = ref<Record<string, { type: string; message: string }>>({})

// Methods
const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Wudu game methods
const dragStart = (event: DragEvent, index: number) => {
  event.dataTransfer?.setData('text/plain', index.toString())
}

const drop = (event: DragEvent, dropIndex: number) => {
  event.preventDefault()
  const dragIndex = parseInt(event.dataTransfer?.getData('text/plain') || '0')
  
  const draggedItem = wuduSteps.value[dragIndex]
  wuduSteps.value.splice(dragIndex, 1)
  wuduSteps.value.splice(dropIndex, 0, draggedItem)
}

const checkWuduOrder = () => {
  const correctOrder = [
    "غسل اليدين",
    "المضمضة",
    "الاستنشاق", 
    "غسل الوجه",
    "غسل اليدين للمرفقين",
    "مسح الرأس",
    "غسل القدمين"
  ]
  
  const isCorrect = wuduSteps.value.every((step, index) => step === correctOrder[index])
  
  if (isCorrect) {
    wuduFeedback.value = {
      type: 'success',
      message: 'أحسنت! رتبت خطوات الوضوء بشكل صحيح'
    }
  } else {
    wuduFeedback.value = {
      type: 'error',
      message: 'حاول مرة أخرى. ترتيب الخطوات غير صحيح'
    }
  }
}

// Story choice method
const makeChoice = (choice: { result: string; feedback: string }) => {
  selectedChoice.value = choice
}

// Quiz methods
const submitQuiz = () => {
  if (!level.value?.quiz) return
  
  let correctAnswers = 0
  
  level.value.quiz.forEach(question => {
    const userAnswer = quizAnswers.value[question.id]
    const isCorrect = userAnswer === question.correctAnswer
    
    if (isCorrect) {
      correctAnswers++
      quizFeedback.value[question.id] = {
        type: 'success',
        message: `✓ إجابة صحيحة! ${question.explanation}`
      }
    } else {
      quizFeedback.value[question.id] = {
        type: 'error',
        message: `✗ إجابة خاطئة. ${question.explanation}`
      }
    }
  })
  
  // Calculate stars based on performance
  const percentage = (correctAnswers / level.value.quiz.length) * 100
  if (percentage >= 80) {
    earnedStars.value = 3
  } else if (percentage >= 60) {
    earnedStars.value = 2
  } else {
    earnedStars.value = 1
  }
  
  // Save progress
  saveProgress()
  
  // Move to completion step
  setTimeout(() => {
    currentStep.value = totalSteps.value
  }, 2000)
}

const saveProgress = () => {
  // Get existing progress
  const savedProgress = localStorage.getItem('userProgress')
  let progress = savedProgress ? JSON.parse(savedProgress) : {
    completedLevels: [],
    levelStars: {},
    totalPoints: 0
  }
  
  // Update progress
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId)
  }
  
  progress.levelStars[levelId] = Math.max(
    progress.levelStars[levelId] || 0,
    earnedStars.value
  )
  
  progress.totalPoints += level.value?.xpReward || 0
  
  // Save to localStorage
  localStorage.setItem('userProgress', JSON.stringify(progress))
}

const goToNextLevel = () => {
  if (nextLevelId.value) {
    router.push(`/lesson/${nextLevelId.value}`)
  } else {
    router.push('/map')
  }
}

onMounted(() => {
  if (!level.value) {
    router.push('/map')
  }
})
</script>

<style scoped>
/* Additional styles for lesson components */
.game-container, .story-container, .audio-container, .video-container, .interactive-story {
  background: var(--gray-light);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
}

.drag-drop-game {
  margin-top: 20px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  cursor: move;
  transition: var(--transition);
}

.step-item:hover {
  transform: translateX(-5px);
  box-shadow: var(--shadow-md);
}

.step-item i {
  color: var(--gray);
}

.story-chapters {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chapter {
  background: white;
  border-radius: 15px;
  padding: 25px;
}

.lesson-box {
  background: var(--primary);
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}

.audio-tracks {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.audio-track {
  background: white;
  border-radius: 15px;
  padding: 25px;
}

.athkar-list {
  margin-top: 15px;
}

.athkar-item {
  background: var(--gray-light);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.athkar-text {
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 5px;
}

.repeat-info {
  color: var(--gray);
  font-size: 0.9rem;
}

.episodes {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.episode {
  background: white;
  border-radius: 15px;
  padding: 25px;
}

.tasks-list ul {
  list-style: none;
  padding: 0;
}

.tasks-list li {
  background: var(--gray-light);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.task-checklist {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-top: 25px;
}

.task-item {
  margin-bottom: 15px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray);
  border-radius: 5px;
  position: relative;
  transition: var(--transition);
}

.checkbox input:checked + .checkmark {
  background: var(--success);
  border-color: var(--success);
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
  right: 5px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox input:checked + .checkmark::after {
  display: block;
}

.stories {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.story-scenario {
  background: white;
  border-radius: 15px;
  padding: 25px;
}

.scenario {
  font-size: 1.1rem;
  margin: 20px 0;
  padding: 15px;
  background: var(--gray-light);
  border-radius: 10px;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.choice-btn {
  padding: 15px 20px;
  border: 2px solid var(--primary);
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
}

.choice-btn:hover {
  background: var(--primary);
  color: white;
}

.choice-feedback {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  font-weight: 600;
}

.choice-feedback.positive {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.choice-feedback.negative {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.choice-feedback.neutral {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.quiz-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.question-item {
  background: white;
  border-radius: 15px;
  padding: 25px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: var(--gray-light);
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
}

.option-label:hover {
  background: var(--gray);
}

.option-label input[type="radio"] {
  width: 20px;
  height: 20px;
}

.option-text {
  flex: 1;
}

.feedback {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  font-weight: 600;
}

.feedback.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.feedback.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.completion-message {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
}

.results {
  margin-top: 30px;
}

.result-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.stars-display {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.star {
  font-size: 2rem;
  color: #ddd;
  transition: var(--transition);
}

.star.filled {
  color: #ffd700;
  animation: starPop 0.3s ease;
}

@keyframes starPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--gray-light);
  color: var(--dark);
}

.btn-secondary:hover {
  background: var(--gray);
  color: white;
}

.lesson-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}
</style>
