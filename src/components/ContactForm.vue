<template>
  <section id="contact" class="contact">
    <div class="container contact-container">
      <div class="contact-content">
        <h2>{{ title }}</h2>

        <form id="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              v-model="formData.name"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              v-model="formData.email"
              required
            />
          </div>
          <div class="form-group checkbox">
            <input
              type="checkbox"
              name="privacy"
              id="privacy"
              v-model="formData.privacy"
              required
            />
            <label for="privacy">I accept Privacy policy</label>
          </div>
          <button type="submit" class="btn submit-btn">{{ buttonText }}</button>
        </form>
      </div>
      <div class="contact-image">
        <img :src="require('@/assets/Girl.png')" alt="Girl" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

// Props
defineProps({
  title: {
    type: String,
    default: "Experience Luxury\nLiving",
  },
  buttonText: {
    type: String,
    default: "SUBMIT INQUIRY",
  },
  image: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: "Professional real estate agent",
  },
});

// Emits
const emit = defineEmits(["form-submit"]);

// Form data
const formData = reactive({
  name: "",
  email: "",
  privacy: false,
});

// Methods
const submitForm = () => {
  emit("form-submit", { ...formData });

  // Reset form after submission
  formData.name = "";
  formData.email = "";
  formData.privacy = false;
};
</script>

<style scoped>
/* Contact Section */
.contact {
  padding: 80px 0;
  background-color: #f5f5f5;
  color: #1a1a1a;
  border-radius: 8px;
  margin: 0 20px;
  background-image: url("~@/assets/ContactArt.png");
  background-position: right;
  background-repeat: no-repeat;
  position: relative; /* Устанавливаем относительное позиционирование для родителя */
  /* overflow: hidden; Скрываем все, что выходит за пределы блока */
}

.contact-container {
  display: flex;
  align-items: center;
  align-items: flex-start; /* Выравниваем элементы по верхнему краю */
}

.contact-content {
  flex: 1;
  padding-right: 40px;
}

.contact-image {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(38%);
  clip-path: inset(0 0 38% 0);
}

.form-group {
  margin-bottom: 20px;
  max-width: 650px;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #c9a87a;
  outline: none;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  margin-right: 10px;
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
  max-width: 650px;
}

.submit-btn {
  background-color: #222;
  color: #fff;
  width: 100%;
}

.submit-btn:hover {
  background-color: #2a2a2a;
}

/* Responsive styles */
@media (max-width: 992px) {
  .contact {
    background: #fff;
  }
  .contact-container {
    flex-direction: column;
    align-items: center;
  }

  .contact-content {
    padding-right: 0;
    margin-bottom: 40px;
  }
  .contact-image img {
    display: none;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.8rem;
  }

  .contact {
    margin: 0;
    border-radius: 0;
  }
}
</style>
