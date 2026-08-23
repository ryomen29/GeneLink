<template>
  <div>
    <PhetSimulation
      v-if="activityType === 'phet'"
      :url="topic.activity_url || 'https://phet.colorado.edu/'"
      :title="topic.activity_title || topic.title"
    />

    <DnaBuilderActivity v-else-if="activityType === 'dna_builder'" />

    <ChromosomeVisualizer v-else-if="activityType === 'chromosome_visualizer'" />

    <HierarchyDragDrop v-else-if="activityType === 'hierarchy_drag_drop'" />

    <PunnettSquare v-else-if="activityType === 'punnett_square'" />

    <div v-else class="fallback-activity">
      <p class="eyebrow">🧪 Ready for the challenge</p>
      <p>Explore the idea in your own words, then explain it to a partner or to your AI buddy.</p>
    </div>
  </div>
</template>

<script setup>
import PhetSimulation from './PhetSimulation.vue'
import DnaBuilderActivity from './DnaBuilderActivity.vue'
import ChromosomeVisualizer from './ChromosomeVisualizer.vue'
import HierarchyDragDrop from './HierarchyDragDrop.vue'
import PunnettSquare from './PunnettSquare.vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true
  }
})

const activityType = props.topic?.activity_type || 'fallback'
</script>

<style scoped>
.fallback-activity {
  background: #f8faff;
  border: 1px solid #dfe8f4;
  border-radius: 18px;
  padding: 18px;
}
</style>
