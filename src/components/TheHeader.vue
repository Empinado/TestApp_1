<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container header-container">
      <div class="logo">SKYLINE</div>
      <nav>
        <ul class="nav-links" :class="{ active: isMenuOpen }">
          <li v-for="(link, index) in navLinks" :key="index">
            <a :href="link.href" @click="closeMenu">{{ link.text }}</a>
          </li>
        </ul>
        <div class="hamburger" @click="toggleMenu">
          <span :style="hamburgerStyles[0]"></span>
          <span :style="hamburgerStyles[1]"></span>
          <span :style="hamburgerStyles[2]"></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Props
const props = defineProps({
  navLinks: {
    type: Array,
    default: () => [
      { href: "#properties", text: "PROPERTIES" },
      { href: "#features", text: "FEATURES" },
      { href: "#contact", text: "CONTACT" },
    ],
  },
});

// Emits
const emit = defineEmits(["menuToggle"]);

// Reactive state
const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Computed properties
const hamburgerStyles = computed(() => {
  if (isMenuOpen.value) {
    return [
      { transform: "rotate(45deg) translate(5px, 5px)" },
      { opacity: "0" },
      { transform: "rotate(-45deg) translate(7px, -6px)" },
    ];
  } else {
    return [{ transform: "none" }, { opacity: "1" }, { transform: "none" }];
  }
});

// Methods
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  emit("menuToggle", isMenuOpen.value);
};

const closeMenu = () => {
  isMenuOpen.value = false;
  emit("menuToggle", false);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Header styles */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: background-color 0.3s ease, padding 0.3s ease;
}

header.scrolled {
  background-color: rgba(26, 26, 26, 0.95);
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: "Prata";
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
}

.nav-links li {
  margin-left: 30px;
}

.nav-links a {
  font-size: 0.8rem;
  letter-spacing: 1px;
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #c9a87a;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 2px;
  background-color: #f5f5f5;
  margin: 3px 0;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: rgba(26, 26, 26, 0.95);
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    margin: 15px 0;
  }

  .hamburger {
    display: flex;
  }
}
</style>
