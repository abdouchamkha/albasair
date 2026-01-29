<template>
  <div class="learning-map">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">
          <img src="/منصة البصائر التعليمية.png" alt="بصائر">
          <!-- <span class="logo-text">بصائر <span class="logo-highlight">التعليمية</span></span> -->
        </router-link>

        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link"><i class="fas fa-home"></i> الرئيسية</router-link></li>
          <li><router-link to="/map" class="nav-link active"><i class="fas fa-map"></i> خريطة التعلم</router-link></li>
          <li><a href="#profile" class="nav-link"><i class="fas fa-user"></i> الملف الشخصي</a></li>
        </ul>
      </div>
    </nav>

    <div class="map-container">
      <div class="map-header">
        <h1 class="map-title">خريطة التعلم التفاعلية</h1>
        <p class="map-subtitle">اختر المستوى التالي في رحلتك التعليمية</p>

        <!-- User Progress -->
        <div class="user-progress">
          <div class="progress-info">
            <span class="level-info">المستوى الحالي: {{ currentUserLevel }}</span>
            <span class="points-info">النقاط: {{ userPoints }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="learning-path">
        <div class="path-line"></div>

        <!-- Phases -->
        <div v-for="phase in curriculumData.kidsPath" :key="phase.id" class="phase">
          <div class="phase-header">
            <h2 class="phase-title">{{ phase.title }}</h2>
            <p class="phase-subtitle">{{ phase.description }} • {{ phase.ageRange }}</p>
          </div>

          <div class="levels-grid">
            <div v-for="level in phase.levels" :key="level.id" class="level-node" :class="{
              'completed': isLevelCompleted(level.id),
              'current': isCurrentLevel(level.id),
              'locked': isLevelLocked(level.id)
            }" @click="selectLevel(level)">
              <div class="level-number">{{ level.levelNumber }}</div>

              <div class="level-icon">
                <i :class="getLevelIcon(level.pillar)"></i>
              </div>

              <h3 class="level-title">{{ level.title }}</h3>
              <p class="level-category">{{ level.category }}</p>

              <div class="level-stats">
                <div class="stat">
                  <span class="stat-value">{{ level.xpReward }}</span>
                  <span class="stat-label">نقطة</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ level.estimatedTime }}</span>
                  <span class="stat-label">وقت</span>
                </div>
              </div>

              <div class="stars">
                <i v-for="star in level.starsAvailable" :key="star" class="fas fa-star star"
                  :class="{ 'filled': getStarStatus(level.id, star) }"></i>
              </div>

              <!-- Lock indicator for locked levels -->
              <div v-if="isLevelLocked(level.id)" class="lock-overlay">
                <i class="fas fa-lock"></i>
                <span>أكمل المستويات السابقة أولاً</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Level Selection Modal -->
    <div v-if="selectedLevel" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-header">
          <h2>{{ selectedLevel.title }}</h2>
          <p>{{ selectedLevel.description }}</p>
        </div>

        <div class="modal-body">
          <div class="level-details">
            <div class="detail-item">
              <i class="fas fa-trophy"></i>
              <span>{{ selectedLevel.xpReward }} نقطة خبرة</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <span>{{ selectedLevel.estimatedTime }}</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-star"></i>
              <span>{{ selectedLevel.starsAvailable }} نجوم متاحة</span>
            </div>
            <div class="detail-item">
              <i class="fas fa-tag"></i>
              <span>{{ selectedLevel.category }}</span>
            </div>
          </div>

          <div v-if="selectedLevel.content" class="content-preview">
            <h3>محتوى الدرس:</h3>
            <ul>
              <li v-if="selectedLevel.content.objectives">
                <strong>أهداف التعلم:</strong>
                <ul>
                  <li v-for="objective in selectedLevel.content.objectives" :key="objective">
                    {{ objective }}
                  </li>
                </ul>
              </li>
              <li v-if="selectedLevel.content.activities">
                <strong>الأنشطة:</strong>
                <ul>
                  <li v-for="activity in selectedLevel.content.activities" :key="activity.title">
                    {{ activity.title }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="modal-actions">
          <button v-if="!isLevelLocked(selectedLevel.id)" class="btn btn-primary" @click="startLesson(selectedLevel)">
            <i class="fas fa-play"></i>
            ابدأ الدرس
          </button>

          <button v-if="isLevelCompleted(selectedLevel.id)" class="btn btn-secondary"
            @click="startLesson(selectedLevel)">
            <i class="fas fa-redo"></i>
            أعد الدرس
          </button>

          <button v-if="isLevelLocked(selectedLevel.id)" class="btn btn-disabled" disabled>
            <i class="fas fa-lock"></i>
            مقفول
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { curriculumData } from '@/data/curriculum'
import type { Level } from '@/types/curriculum'

const router = useRouter()
const selectedLevel = ref<Level | null>(null)

// User progress state (in real app, this would come from a store/API)
const userProgress = ref({
  currentLevel: 1,
  completedLevels: [1], // User has completed level 1
  levelStars: {
    1: 2 // User got 2 stars on level 1
  },
  totalPoints: 150
})

const currentUserLevel = computed(() => userProgress.value.currentLevel)
const userPoints = computed(() => userProgress.value.totalPoints)

const progressPercentage = computed(() => {
  const totalLevels = curriculumData.kidsPath.reduce((acc, phase) => acc + phase.levels.length, 0)
  const completedCount = userProgress.value.completedLevels.length
  return (completedCount / totalLevels) * 100
})

const isLevelCompleted = (levelId: number) => {
  return userProgress.value.completedLevels.includes(levelId)
}

const isCurrentLevel = (levelId: number) => {
  return levelId === userProgress.value.currentLevel && !isLevelCompleted(levelId)
}

const isLevelLocked = (levelId: number) => {
  // First level is always unlocked
  if (levelId === 1) return false

  // Check if previous level is completed
  const previousLevel = levelId - 1
  return !userProgress.value.completedLevels.includes(previousLevel)
}

const getStarStatus = (levelId: number, starNumber: number) => {
  const stars = userProgress.value.levelStars[levelId] || 0
  return starNumber <= stars
}

const getLevelIcon = (pillar: string) => {
  const icons = {
    worship: 'fas fa-moon',
    responsibility: 'fas fa-shield-alt',
    empathy: 'fas fa-heart',
    knowledge: 'fas fa-book-open',
    skills: 'fas fa-wrench'
  }
  return icons[pillar] || 'fas fa-star'
}

const selectLevel = (level: Level) => {
  selectedLevel.value = level
}

const closeModal = () => {
  selectedLevel.value = null
}

const startLesson = (level: Level) => {
  // Navigate to lesson page
  router.push(`/lesson/${level.id}`)
}

onMounted(() => {
  // Load user progress from localStorage
  const savedProgress = localStorage.getItem('userProgress')
  if (savedProgress) {
    try {
      userProgress.value = JSON.parse(savedProgress)
    } catch (error) {
      console.error('Error loading user progress:', error)
    }
  }
})
</script>

<style scoped>
/* Additional styles specific to learning map */
.user-progress {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4cc9f0, #4361ee);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.lock-overlay i {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 25px;
  padding: 40px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: var(--shadow-xl);
  max-height: 80vh;
  overflow-y: auto;
}

.close-modal {
  position: absolute;
  top: 20px;
  left: 20px;
  background: var(--gray-light);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--dark);
  transition: var(--transition);
}

.close-modal:hover {
  background: var(--warning);
  color: white;
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--dark);
}

.modal-header p {
  color: var(--gray);
  font-size: 1rem;
}

.modal-body {
  margin-bottom: 30px;
}

.level-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--gray-light);
  border-radius: 10px;
}

.detail-item i {
  color: var(--primary);
  font-size: 1.2rem;
}

.content-preview {
  background: var(--gray-light);
  border-radius: 15px;
  padding: 20px;
}

.content-preview h3 {
  margin-bottom: 15px;
  color: var(--dark);
}

.content-preview ul {
  list-style: none;
  padding: 0;
}

.content-preview li {
  margin-bottom: 10px;
  color: var(--dark);
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--gray-light);
  color: var(--dark);
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-secondary:hover {
  background: var(--gray);
  color: white;
}

.btn-disabled {
  background: var(--gray);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.6;
}
</style>
