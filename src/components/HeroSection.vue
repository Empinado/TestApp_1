<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>

        <div class="features-list">
          <div
            class="feature-item"
            v-for="(feature, index) in features"
            :key="index"
          >
            <div class="icon">✓</div>
            <span v-html="feature"></span>
          </div>
        </div>

        <button class="btn primary-btn" @click="$emit('action-click')">
          {{ buttonText }}
        </button>
      </div>
      <div class="hero-image">
        <img :src="require('@/assets/HeroArt.png')" alt="HeroArt" />
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
defineProps({
  title: {
    type: String,
    default: "Luxury Living Redefined",
  },
  subtitle: {
    type: String,
    default: "Experience the pinnacle of urban sophistication",
  },
  features: {
    type: Array,
    default: () => [
      "From <strong>$1,200,000</strong> premium finishes",
      "<strong>25%</strong> lower energy consumption",
      "Up to <strong>12%</strong> investment return",
    ],
  },
  buttonText: {
    type: String,
    default: "EXPLORE NOW",
  },
  image: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: "Luxury apartment building with glass facade",
  },
});

// Emits
defineEmits(["action-click"]);
</script>

<style scoped>
/* Hero Section */
.hero {
  padding: 150px 0 80px;
  overflow: hidden;
}

.hero-container {
  display: flex;
  align-items: center;
}

.hero-content {
  flex: 1;
  padding-right: 40px;
}

.hero-image {
  flex: 1;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  transition: transform 0.5s ease;
}

.hero-image:hover {
  transform: translateY(-10px);
}

.features-list {
  margin: 30px 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.icon {
  color: #c9a87a;
  margin-right: 15px;
  font-size: 1.2rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.primary-btn {
  background-color: #fff;
  color: #222;
}

.primary-btn:hover {
  background-color: #b89665;
  transform: translateY(-2px);
}

/* Responsive styles */
@media (max-width: 992px) {
  .hero-container {
    flex-direction: column;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 40px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2.2rem;
  }
}
</style>
