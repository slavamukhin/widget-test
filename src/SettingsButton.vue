<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  size?: number
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="settings-button" @click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size || 20"
      :height="props.size || 20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.14 12.936c.036-.3.06-.6.06-.936s-.024-.636-.072-.936l2.034-1.59a.5.5 0 0 0 .12-.624l-1.926-3.33a.5.5 0 0 0-.6-.222l-2.4.96a7.007 7.007 0 0 0-1.62-.936l-.36-2.52A.5.5 0 0 0 14.1 2h-4.2a.5.5 0 0 0-.492.42l-.36 2.52c-.6.24-1.14.552-1.62.936l-2.4-.96a.5.5 0 0 0-.6.222l-1.926 3.33a.5.5 0 0 0 .12.624l2.034 1.59c-.048.3-.072.612-.072.936s.024.636.072.936l-2.034 1.59a.5.5 0 0 0-.12.624l1.926 3.33a.5.5 0 0 0 .6.222l2.4-.96c.48.384 1.02.696 1.62.936l.36 2.52a.5.5 0 0 0 .492.42h4.2a.5.5 0 0 0 .492-.42l.36-2.52c.6-.24 1.14-.552 1.62-.936l2.4.96a.5.5 0 0 0 .6-.222l1.926-3.33a.5.5 0 0 0-.12-.624l-2.034-1.59zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
    </svg>
  </button>
</template>

<style scoped>
.settings-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
  position: absolute;
  top: 5px;
  right: 5px;
}

.settings-button:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
