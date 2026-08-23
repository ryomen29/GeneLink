<template>
  <div class="simulation-wrap">
    <div class="simulation-head">
      <div>
        <p class="eyebrow">🧪 Let's Explore!</p>
        <h3>{{ title }}</h3>
      </div>
      <span class="pill">Interactive</span>
    </div>

    <div class="iframe-shell">
      <iframe
        :src="url"
        :title="title"
        loading="lazy"
        allowfullscreen
      />
    </div>

    <div class="reflection-box">
      <p><strong>What did you notice?</strong></p>
      <p>What changed when you adjusted the controls? What pattern did you discover?</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'PhET simulation'
  }
})
</script>

<style scoped>
.simulation-wrap {
  margin-top: 20px;
  background: #f8faff;
  border: 1px solid #e3eaf6;
  border-radius: 22px;
  padding: 18px;
}

.simulation-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.iframe-shell {
  width: 100%;
  min-height: 420px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #dfe7f4;
  background: #fff;
}

.iframe-shell iframe {
  width: 100%;
  height: 420px;
  border: none;
}

.reflection-box {
  margin-top: 16px;
  background: #fff7df;
  border-radius: 15px;
  padding: 14px 16px;
  color: #3a3c43;
}
</style>
