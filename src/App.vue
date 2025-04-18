<template>
  <div>
    <TheHeader :navLinks="navLinks" @menuToggle="handleMenuToggle" />

    <HeroSection
      :image="images.building1"
      :features="heroFeatures"
      @action-click="scrollToSection('properties')"
    />

    <section id="properties" class="properties">
      <div class="container">
        <div class="properties-grid">
          <div class="property-image">
            <img
              :src="require('@/assets/HeroArt3.png')"
              alt="Modern apartment building with landscaping"
            />
          </div>
          <div class="property-features">
            <div
              class="feature-card"
              v-for="(feature, index) in propertyFeatures"
              :key="index"
              ref="featureCards"
            >
              <div class="feature-icon">
                <span>{{ feature.icon }}</span>
              </div>
              <div class="feature-text">
                <p>{{ feature.text }}</p>
              </div>
            </div>

            <button
              class="btn secondary-btn"
              @click="scrollToSection('contact')"
            >
              REQUEST DETAILS
            </button>
          </div>
          <div class="property-image right-image">
            <img
              :src="require('@/assets/HeroArt2.png')"
              alt="Luxury building with pool and outdoor space"
            />
          </div>
        </div>
      </div>
    </section>

    <ContactForm :image="images.agent" @form-submit="handleFormSubmit" />

    <footer>
      <div class="container">
        <div class="footer-top">
          <div class="logo">SKYLINE</div>
          <div class="social-links">
            <a
              href="#"
              v-for="(social, index) in socialLinks"
              :key="index"
              :aria-label="social.name"
            >
              <div class="social-icon">{{ social.icon }}</div>
            </a>
          </div>
          <button
            class="btn primary-btn footer-btn"
            @click="scrollToSection('contact')"
          >
            CONTACT US
          </button>
        </div>
        <div class="footer-bottom">
          <p>© {{ currentYear }}, Skyline Properties. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import TheHeader from "./components/TheHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import ContactForm from "./components/ContactForm.vue";
import "@/assets/fonts/fonts.css";

// Reactive state
const currentYear = new Date().getFullYear();
const featureCards = ref([]);

// Navigation links
const navLinks = [
  { href: "#properties", text: "PROPERTIES" },
  { href: "#features", text: "FEATURES" },
  { href: "#contact", text: "CONTACT" },
];

// Features data
const heroFeatures = [
  "From <strong>$1,200,000</strong> premium finishes",
  "<strong>25%</strong> lower energy consumption",
  "Up to <strong>12%</strong> investment return",
];

const propertyFeatures = [
  {
    icon: "♣",
    text: "Sustainable design with green rooftops and energy-efficient systems",
  },
  {
    icon: "◉",
    text: "Prime location with stunning city views and access to amenities",
  },
  {
    icon: "⬚",
    text: "Architectural excellence with floor-to-ceiling windows and premium materials throughout",
  },
  {
    icon: "⚔",
    text: "Security and concierge services for ultimate peace of mind",
  },
];

const socialLinks = [
  { name: "Instagram", icon: "◉" },
  { name: "TikTok", icon: "♪" },
  { name: "LinkedIn", icon: "in" },
  { name: "Facebook", icon: "f" },
  { name: "Telegram", icon: "✈" },
  { name: "YouTube", icon: "▶" },
];

// Image placeholders
const images = reactive({
  building1: "",
  building2: "",
  building3: "",
  agent: "",
});

// Methods
const handleMenuToggle = (isOpen) => {
  console.log("Menu is now", isOpen ? "open" : "closed");
};

const handleFormSubmit = (formData) => {
  console.log("Form submitted with values:", formData);
  alert("Thank you for your inquiry! We will contact you soon.");
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }
};

const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".feature-card, .property-image, .contact-content"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

const createPlaceholderImage = (width, height, text) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#2c3e50");
  gradient.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw some building-like shapes
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  for (let i = 0; i < 8; i++) {
    const buildingWidth = Math.random() * 80 + 40;
    const buildingHeight = Math.random() * 200 + 100;
    const x = Math.random() * (width - buildingWidth);
    ctx.fillRect(x, height - buildingHeight, buildingWidth, buildingHeight);
  }

  // Add some windows
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  for (let i = 0; i < 100; i++) {
    const windowSize = 5;
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillRect(x, y, windowSize, windowSize);
  }

  // Add text
  if (text) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, width / 2, height / 2);
  }

  return canvas.toDataURL();
};

// Lifecycle hooks
onMounted(() => {
  // Add scroll event listener
  window.addEventListener("scroll", animateOnScroll);

  // Set initial state for animated elements
  const elements = document.querySelectorAll(
    ".feature-card, .property-image, .contact-content"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Generate placeholder images
  images.building1 = createPlaceholderImage(500, 600, "Luxury Building 1");
  images.building2 = createPlaceholderImage(500, 600, "Luxury Building 2");
  images.building3 = createPlaceholderImage(500, 600, "Luxury Building 3");
  images.agent = createPlaceholderImage(500, 600, "Agent");

  // Trigger animation for elements in view on page load
  animateOnScroll();
});

onUnmounted(() => {
  // Remove event listeners
  window.removeEventListener("scroll", animateOnScroll);
});
</script>

<style>
/* Base Styles and Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: #f5f5f5;
  background-color: #222;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
  font-family: Arial, sans-serif;
  font-style: italic;
}

a:hover {
  color: #c9a87a;
}

ul {
  list-style: none;
}

/* Typography */
h1 {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1rem;
  font-family: Prata;
}

h2 {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-family: Prata;
  white-space: pre-line;
}

p {
  margin-bottom: 1rem;
}

/* Buttons */
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
  color: #1a1a1a;
}

.primary-btn:hover {
  background-color: #b89665;
  transform: translateY(-2px);
}

.secondary-btn {
  background-color: transparent;
  color: #fff;
  border: 1px solid #f5f5f5;
  width: 100%;
}

.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Properties Section */
.properties {
  padding: 80px 0;
}

.properties-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
}

.property-image {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.property-image img {
  height: 100%;
  transition: transform 0.5s ease;
}

.property-image:hover img {
  transform: scale(1.05);
}

.property-features {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateX(5px);
}

.feature-icon {
  background-color: rgba(201, 168, 122, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.feature-icon span {
  color: #c9a87a;
  font-size: 1rem;
}

/* Footer */
footer {
  padding: 60px 0 30px;
  background-color: #1a1a1a;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.social-links {
  display: flex;
}

.social-links a {
  margin: 0 10px;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-3px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links a {
  margin-left: 20px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Social Icons */
.social-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

/* Responsive Design */
@media (max-width: 992px) {
  .properties-grid {
    grid-template-columns: 1fr;
  }
  .property-image img {
    display: none;
  }
  .property-image.right-image {
    grid-row: 3;
  }
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    text-align: center;
  }

  .logo {
    margin-bottom: 20px;
  }

  .social-links {
    margin-bottom: 20px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    margin-top: 15px;
  }

  .footer-links a {
    margin: 0 10px;
  }
}
</style>
