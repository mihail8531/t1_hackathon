<template>
  <main :class="$style.container">
    <slot name="default" />
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.container {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
