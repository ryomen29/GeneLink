<template>
  <StudentShell title="Profile">
    <section class="profile-page">
      <div class="profile-header card">
        <div class="avatar-wrap">
          <div class="avatar">{{ initials }}</div>
        </div>

        <div class="profile-main">
          <div class="header-row">
            <div>
              <p class="eyebrow">Student Explorer</p>
              <h1>Good morning, Explorer! 👋</h1>
            </div>
            <button class="edit-btn" type="button">✏️ Edit profile</button>
          </div>

          <h2>{{ profile.full_name }}</h2>

          <div class="meta-grid">
            <span>📧 {{ profile.email }}</span>
            <span>🎓 Student Explorer</span>
            <span>📅 Joined {{ formattedJoinDate }}</span>
          </div>

          <p class="motivation">
            Your learning journey is looking great!<br />
            Keep going — you're making awesome progress!
          </p>
        </div>
      </div>

      <div class="summary-grid">
        <div class="card panel-progress">
          <div class="panel-header">
            <h3>Learning journey</h3>
            <span>{{ Math.round(overallProgress) }}%</span>
          </div>

          <div class="ring-wrap">
            <div class="progress-ring" :style="ringStyle">
              <div class="ring-center">
                <strong>{{ Math.round(overallProgress) }}%</strong>
              </div>
            </div>
          </div>

          <p class="stat-line">{{ progress.completedLessons }} of {{ progress.totalLessons }} lessons completed</p>
          <p class="soft-copy">You're {{ Math.round(overallProgress) }}% through your learning adventure!</p>

          <div class="mini-progress">
            <span :style="{ width: `${overallProgress}%` }"></span>
          </div>

          <div class="progress-meta">
            <span>{{ remainingLessons }} remaining</span>
            <span>{{ progress.completedLessons }} done</span>
          </div>
        </div>

        <div class="card panel-scores">
          <div class="panel-header">
            <h3>Score overview</h3>
          </div>

          <div class="score-grid">
            <article class="score-card purple-card">
              <span class="score-tag">Pre-Test</span>
              <strong>{{ scores.pretestScore }} / {{ scores.pretestTotal }}</strong>
              <em>{{ Math.round(pretestPercentage) }}%</em>
            </article>

            <article class="score-card blue-card">
              <span class="score-tag">Final Exam</span>
              <strong>{{ scores.finalExamScore }} / {{ scores.finalExamTotal }}</strong>
              <em>{{ Math.round(finalExamPercentage) }}%</em>
            </article>

            <article class="score-card mint-card">
              <span class="score-tag">Average</span>
              <strong>{{ Math.round(averageScore) }}%</strong>
              <em>Overall</em>
            </article>

            <article class="score-card orange-card">
              <span class="score-tag">Best Score</span>
              <strong>{{ bestScore }}%</strong>
              <em>Top result</em>
            </article>
          </div>
        </div>
      </div>

      <div class="card chart-card">
        <div class="panel-header">
          <h3>Performance chart</h3>
          <span>Ready for your next adventure?</span>
        </div>

        <div class="chart-bars" aria-label="Student performance chart">
          <div v-for="item in chartData" :key="item.label" class="bar-group">
            <div class="bar-value">{{ item.score }}%</div>
            <div class="bar-track">
              <span :class="item.label.toLowerCase().includes('final') ? 'final-bar' : ''" :style="{ height: `${item.score}%` }"></span>
            </div>
            <div class="bar-label">{{ item.label }}</div>
          </div>
        </div>
      </div>

      <div class="card lessons-card">
        <div class="panel-header">
          <h3>Lesson progress</h3>
          <span>{{ lessons.filter((lesson) => lesson.completed).length }} completed</span>
        </div>

        <div class="lesson-list">
          <article v-for="lesson in lessons" :key="lesson.id" class="lesson-row">
            <div class="lesson-number">{{ lesson.id }}</div>

            <div class="lesson-body">
              <div class="lesson-head">
                <h4>{{ lesson.title }}</h4>
                <span :class="getStatusClass(lesson)">
                  {{ getStatusText(lesson) }}
                </span>
              </div>

              <p>
                {{ lesson.completed ? 'Nice work! This lesson is complete.' : lesson.score !== null ? 'Almost there! Keep exploring.' : 'This lesson is waiting for you.' }}
              </p>
            </div>

            <div class="lesson-score">
              {{ lesson.score !== null ? `${lesson.score}%` : '—' }}
            </div>
          </article>
        </div>
      </div>

      <div class="badge-layout">
        <div class="card badge-card">
          <div class="panel-header">
            <h3>Achievements</h3>
            <span>{{ achievements.filter((badge) => badge.unlocked).length }} unlocked</span>
          </div>

          <div class="badge-grid">
            <div
              v-for="badge in achievements"
              :key="badge.key"
              class="badge-item"
              :class="badge.unlocked ? 'unlocked' : 'locked'"
            >
              <span class="badge-icon">{{ badge.icon }}</span>
              <div>
                <strong>{{ badge.name }}</strong>
                <small>{{ badge.description }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card insight-card">
          <div class="panel-header">
            <h3>Learning insights</h3>
          </div>

          <p class="insight-message">{{ learningInsight }}</p>
        </div>
      </div>
    </section>
  </StudentShell>
</template>

<script setup>
import { computed } from 'vue'
import StudentShell from '../../components/StudentShell.vue'
import { useStudentProfile } from '../../composables/useStudentProfile.js'

const {
  profile,
  progress,
  scores,
  lessons,
  chartData,
  overallProgress,
  remainingLessons,
  pretestPercentage,
  finalExamPercentage,
  averageScore,
  bestScore,
  learningInsight,
  achievements
} = useStudentProfile()

const initials = computed(() => {
  const name = profile.value.full_name || 'AE'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'A'
})

const formattedJoinDate = computed(() => {
  const date = new Date(profile.value.created_at)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const ringStyle = computed(() => ({
  background: `conic-gradient(#7a68f9 ${overallProgress.value * 3.6}deg, #edf1ff 0deg)`
}))

function getStatusClass(lesson) {
  if (lesson.completed) return 'status-success'
  if (lesson.status === 'in-progress') return 'status-progress'
  return 'status-locked'
}

function getStatusText(lesson) {
  if (lesson.completed) return 'Completed'
  if (lesson.status === 'in-progress') return 'In Progress'
  return 'Locked'
}
</script>

<style scoped>
.profile-page {
  display: grid;
  gap: 26px;
  max-width: 1200px;
  margin: 28px auto 0;
  padding: 0 24px 40px;
}

.card {
  background: white;
  border: 1px solid var(--border, #e7edf5);
  border-radius: 28px;
  box-shadow: 0 12px 30px rgba(51, 75, 110, 0.08);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px 30px;
  background: linear-gradient(135deg, #eef9ff 0%, #f4efff 52%, #fff7db 100%);
}

.avatar-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 118px;
  height: 118px;
  border-radius: 30px;
  background: linear-gradient(135deg, #7a68f9 0%, #59d0c2 100%);
  color: white;
  font-size: 2.3rem;
  font-weight: 900;
  display: grid;
  place-items: center;
  box-shadow: 0 16px 35px rgba(122, 104, 249, 0.28);
}

.profile-main {
  flex: 1;
}

.header-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

h1 {
  margin: 5px 0 0;
  font: 800 2.5rem 'Baloo 2', 'Nunito', sans-serif;
  line-height: 1.1;
  color: #24324a;
}

h2 {
  margin: 18px 0 12px;
  font-size: 2rem;
  font-weight: 900;
  color: #24324a;
}

.eyebrow {
  margin: 0;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 900;
  color: #6c63ff;
}

.meta-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  font-weight: 700;
  color: #4f617c;
}

.motivation {
  margin-top: 14px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #50627c;
}

.edit-btn {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(108, 99, 255, 0.12);
  color: #4b4cc2;
  border-radius: 14px;
  padding: 10px 16px;
  font-weight: 900;
  box-shadow: 0 8px 16px rgba(108, 99, 255, 0.08);
}

.summary-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.35fr;
  gap: 26px;
}

.panel-progress,
.panel-scores,
.chart-card,
.lessons-card,
.badge-card,
.insight-card {
  padding: 24px 22px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.45rem;
  color: #24324a;
}

.panel-header span {
  color: #6d7b91;
  font-weight: 800;
}

.ring-wrap {
  display: flex;
  justify-content: center;
  margin: 12px 0 18px;
}

.progress-ring {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
}

.progress-ring::before {
  content: '';
  position: absolute;
  inset: 16px;
  background: white;
  border-radius: 50%;
}

.ring-center {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  text-align: center;
}

.ring-center strong {
  font-size: 2rem;
  color: #24324a;
}

.stat-line {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #24324a;
  text-align: center;
}

.soft-copy {
  margin: 10px 0 16px;
  color: #6d7b91;
  text-align: center;
  font-weight: 700;
}

.mini-progress {
  height: 14px;
  border-radius: 999px;
  background: #edf1f8;
  overflow: hidden;
  margin-top: 18px;
}

.mini-progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7a68f9 0%, #59d0c2 100%);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  color: #5c6d87;
  font-weight: 700;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 14px;
}

.score-card {
  border-radius: 20px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 120px;
  justify-content: center;
}

.score-card strong {
  font-size: 1.5rem;
  color: #24324a;
}

.score-card em {
  font-style: normal;
  font-weight: 800;
  color: #5d708c;
}

.score-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.purple-card { background: #f1efff; }
.purple-card .score-tag { background: rgba(122, 104, 249, 0.12); color: #5b4de0; }

.blue-card { background: #eaf6ff; }
.blue-card .score-tag { background: rgba(26, 140, 255, 0.12); color: #1a7de1; }

.mint-card { background: #eafcf7; }
.mint-card .score-tag { background: rgba(25, 166, 132, 0.12); color: #0d8b67; }

.orange-card { background: #fff4e9; }
.orange-card .score-tag { background: rgba(255, 160, 69, 0.12); color: #d48019; }

.chart-bars {
  display: grid;
  grid-template-columns: repeat(7, minmax(70px, 1fr));
  gap: 12px;
  align-items: end;
  min-height: 260px;
  padding-top: 16px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 10px;
  min-height: 220px;
}

.bar-value {
  font-size: 0.68rem;
  font-weight: 800;
  color: #50627c;
}

.bar-track {
  width: 100%;
  height: 170px;
  display: flex;
  align-items: end;
  justify-content: center;
  background: linear-gradient(180deg, #f2f6fb 0%, #eef2ff 100%);
  border-radius: 18px 18px 12px 12px;
  padding: 8px;
}

.bar-track span {
  display: block;
  width: 100%;
  min-height: 18px;
  border-radius: 12px 12px 8px 8px;
  background: linear-gradient(180deg, #8fe7c9 0%, #6d63f0 100%);
}

.bar-track .final-bar {
  background: linear-gradient(180deg, #ffd98d 0%, #ff8a5b 100%);
}

.bar-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #5d708c;
  text-align: center;
}

.lesson-list {
  display: grid;
  gap: 12px;
}

.lesson-row {
  display: grid;
  grid-template-columns: 54px 1fr auto;
  gap: 16px;
  align-items: center;
  background: #f9fbff;
  border: 1px solid var(--border, #e7edf5);
  border-radius: 18px;
  padding: 16px 18px;
}

.lesson-number {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #eaf2ff 0%, #efefff 100%);
  border-radius: 18px;
  color: #564fe8;
  font-weight: 900;
}

.lesson-body {
  min-width: 0;
}

.lesson-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.lesson-head h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #24324a;
}

.lesson-body p {
  margin: 8px 0 0;
  color: #647a97;
  font-size: 0.96rem;
}

.status-success,
.status-progress,
.status-locked {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.status-success {
  background: #eafcf7;
  color: #0d8b67;
}

.status-progress {
  background: #fff5df;
  color: #d98605;
}

.status-locked {
  background: #eef1f7;
  color: #606f83;
}

.lesson-score {
  min-width: 60px;
  text-align: center;
  font-weight: 900;
  color: #466180;
}

.badge-layout {
  display: grid;
  grid-template-columns: 1.35fr 0.95fr;
  gap: 26px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 1fr));
  gap: 14px;
}

.badge-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 14px;
  border-radius: 18px;
  border: 1px solid var(--border, #e7edf5);
}

.badge-item strong {
  display: block;
  color: #24324a;
}

.badge-item small {
  color: #647a97;
  display: block;
  margin-top: 4px;
  line-height: 1.4;
}

.badge-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  font-size: 1.4rem;
  background: #f3f4ff;
}

.badge-item.unlocked {
  background: #f5fff9;
  border-color: rgba(35, 176, 118, 0.18);
}

.badge-item.unlocked .badge-icon {
  background: #defde8;
}

.badge-item.locked {
  background: #f7f8fb;
  opacity: 0.68;
}

.badge-item.locked .badge-icon {
  background: #eef1f5;
}

.insight-message {
  margin: 0;
  padding: 18px 18px 0;
  color: #3e4d63;
  line-height: 1.7;
  font-size: 1.05rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .summary-grid,
  .badge-layout {
    grid-template-columns: 1fr;
  }

  .chart-bars {
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 8px;
  }
}

@media (max-width: 680px) {
  .profile-page {
    padding-left: 15px;
    padding-right: 15px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .header-row {
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 2.1rem;
  }

  .score-grid,
  .badge-grid {
    grid-template-columns: 1fr;
  }

  .lesson-row {
    grid-template-columns: 46px 1fr;
  }

  .lesson-score {
    grid-column: 2;
    text-align: left;
    padding-left: 4px;
  }
}
</style>
