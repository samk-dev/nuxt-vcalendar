<script setup lang="ts">
import { ref } from '#imports'
const date = ref(new Date())

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid'
    },
    dates: new Date()
  }
])
</script>

<template>
  <div>
    <client-only>
      <h2>Calendar</h2>
      <VCalendar v-model="date" />
      <h2>Date Picker</h2>
      <VDatePicker v-model="date" :attributes="attrs" />
    </client-only>
  </div>
</template>
