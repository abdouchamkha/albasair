<template>
  <div class="home">
    <!-- شريط التنقل -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <a href="#" class="logo">
          <img src="/منصة البصائر التعليمية.png" alt="بصائر">
          <span class="logo-text">بصائر <span class="logo-highlight">التعليمية</span></span>
        </a>
        
        <ul class="nav-menu">
          <li><a href="#home" class="nav-link active"><i class="fas fa-home"></i> الرئيسية</a></li>
          <li><a href="#about" class="nav-link"><i class="fas fa-info-circle"></i> عن المنصة</a></li>
          <li><a href="#sections" class="nav-link"><i class="fas fa-th-large"></i> الأقسام</a></li>
          <li><a href="#features" class="nav-link"><i class="fas fa-star"></i> المميزات</a></li>
          <li><router-link to="/map" class="nav-link"><i class="fas fa-map"></i> خريطة التعلم</router-link></li>
          <li><a href="#login" class="nav-link login-link"><i class="fas fa-sign-in-alt"></i> دخول</a></li>
        </ul>
      </div>
    </nav>

    <!-- الهيرو -->
    <section class="hero" id="home">
      <div class="hero-bg">
        <div class="particles" id="particles"></div>
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
          <div class="shape shape-5"></div>
        </div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-line">تعلم بطريقة</span>
            <span class="title-line highlight">ممتعة وتفاعلية</span>
            <span class="title-line">تناسب عصرك</span>
          </h1>
          
          <p class="hero-subtitle">
            منصة تعليمية شاملة تجمع بين العلم والدين والأكاديميا في بيئة آمنة ومشوقة
          </p>
          
          <div class="hero-actions">
            <router-link to="/map" class="btn btn-gradient">
              <i class="fas fa-rocket"></i>
              ابدأ رحلتك التعليمية
            </router-link>
            <a href="#sections" class="btn btn-ghost">
              <i class="fas fa-eye"></i>
              استعرض الأقسام
            </a>
            <button @click="quickLogin" class="btn" style="background: #f72585; color: white;">
              <i class="fas fa-bolt"></i>
              دخول تجريبي
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- قسم الأقسام -->
    <section class="sections" id="sections">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            أقسام المنصة التعليمية
          </h2>
          <p class="section-subtitle">
            اختر مسارك التعليمي من بين ثلاثة أقسام رئيسية مصممة خصيصاً لك
          </p>
        </div>
        
        <div class="sections-grid">
          <!-- القسم الديني -->
          <div class="section-card" data-category="religious">
            <div class="card-header">
              <div class="category-icon">
                <i class="fas fa-star-and-crescent"></i>
              </div>
              <div class="category-badge">ديني</div>
            </div>
            
            <h3 class="card-title">المسار الديني</h3>
            <p class="card-desc">تعلم وتعمق في علوم الدين بطريقة عصرية</p>
            
            <div class="card-features">
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>أسئلة دينية تفاعلية</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>أذكار وأدعية يومية</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>متابعة الصلاة</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>قصص الأنبياء</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>تفسير القرآن المبسط</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>فقه العبادات</span>
              </div>
            </div>
            
            <router-link to="/map" class="card-btn">
              <span>انضم للمسار</span>
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          
          <!-- القسم العلمي -->
          <div class="section-card featured" data-category="scientific">
            <div class="card-header">
              <div class="category-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <div class="category-badge">علمي</div>
            </div>
            
            <h3 class="card-title">المسار العلمي</h3>
            <p class="card-desc">طور مهاراتك التقنية لمستقبل مشرق</p>
            
            <div class="card-features">
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>أساسيات البرمجة</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>التصميم والمونتاج</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>تعلم اللغات</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>الذكاء الاصطناعي</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>التفكير النقدي</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>الابتكار والإبداع</span>
              </div>
            </div>
            
            <router-link to="/map" class="card-btn">
              <span>ابدأ التعلم</span>
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          
          <!-- القسم الأكاديمي -->
          <div class="section-card" data-category="academic">
            <div class="card-header">
              <div class="category-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="category-badge">أكاديمي</div>
            </div>
            
            <h3 class="card-title">المسار الأكاديمي</h3>
            <p class="card-desc">حسّن مستواك الدراسي وكن متميزاً</p>
            
            <div class="card-features">
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>الرياضيات المتقدمة</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>الفيزياء والكيمياء</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>العلوم والأحياء</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>اللغة العربية</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>اللغة الإنجليزية</span>
              </div>
              <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>التاريخ والجغرافيا</span>
              </div>
            </div>
            
            <router-link to="/map" class="card-btn">
              <span>حسّن مستواك</span>
              <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isScrolled = ref(false)

onMounted(() => {
  // Initialize particles
  initParticles()
  
  // Handle scroll
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

const initParticles = () => {
  const container = document.getElementById('particles')
  if (!container) return
  
  const particleCount = 50
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    
    const size = Math.random() * 5 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    
    const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#4cc9f0', '#f72585']
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    particle.style.opacity = Math.random() * 0.3 + 0.1
    
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5
    particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`
    
    container.appendChild(particle)
  }
  
  // Add particle animation styles
  const style = document.createElement('style')
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    
    @keyframes floatParticle {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

const quickLogin = () => {
  // Create demo user
  const demoUser = {
    name: "أحمد محمد",
    email: "demo@albasaer.com",
    age: "16",
    categories: ["المسار الديني", "المسار العلمي", "المسار الأكاديمي"],
    registrationDate: new Date().toISOString(),
    points: 250,
    level: 3
  }
  
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('currentUser', JSON.stringify(demoUser))
  
  // Navigate to learning map
  router.push('/map')
}
</script>
