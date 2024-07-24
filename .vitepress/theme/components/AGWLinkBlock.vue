<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from "axios"
import { shared } from "../../config/shared"

const props = defineProps<{ href: string }>()

const isExternal = computed(() => /https?:\/\//.test(props.href))

const domain = shared.sitemap.hostname

const title = ref<string>('')

const fetchTitle = async (url: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/${url}`)
    const text = response.data
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const pageTitle = doc.querySelector('title')?.textContent || 'Заголовок страницы не найден'
    title.value = pageTitle
  } catch (error) {
    console.error('Не удалось загрузить заголовок:', error)
    title.value = 'Не удалось загрузить заголовок'
  }
}

onMounted(() => {
  fetchTitle(props.href)
})
</script>

<template>
  <a :href="props.href" :target="isExternal ? '_blank' : undefined">
    <div class="custom-block link-block">
      <p class="custom-block-title">
        {{ title }}
      </p>
      <div class="content">
        <p class="href">
          <img style="height: 24px; width: 24px" :src="isExternal
            ? `https://s2.googleusercontent.com/s2/favicons?domain_url=${props.href}&sz=96`
            : `favicon.png`
            " />
          &nbsp;
          {{ props.href }}
        </p>
        <p>{{ domain }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.link-block {
  background-color: var(--vp-c-bg-soft);
  transition-duration: .25s;
  color: var(--vp-custom-block-info-text)
}

.link-block:hover {
  border-color: var(--vp-c-brand);
}

a,
a:hover,
a:active {
  text-decoration: none;
}

.content {
  display: flex;
  gap: 10px;
  justify-content: space-between
}

.href {
  display: flex;
  align-items: center
}
</style
