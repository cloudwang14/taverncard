<template>
  <div class="status-bar">
    <div class="sb-header">
      <span class="sb-title">淫仙雌畜界完</span>
      <span class="sb-day">第 {{ data?.场景状态?.日次 ?? 1 }} 日</span>
    </div>

    <div class="sb-section">
      <div class="sb-label">位置</div>
      <div class="sb-value">{{ data?.世界?.当前区域 ?? '--' }} · {{ data?.世界?.当前场景 ?? '--' }}</div>
    </div>

    <div class="sb-section">
      <div class="sb-label">主角</div>
      <div class="sb-row">
        <span class="sb-stat">灵石 {{ data?.主角?.灵石 ?? 0 }}</span>
        <span class="sb-stat">声誉 {{ data?.主角?.声誉 ?? 0 }}</span>
        <span class="sb-stat">{{ data?.主角?.修为 ?? '凡人' }}</span>
      </div>
    </div>

    <div class="sb-section" v-if="currentFairy">
      <div class="sb-label">当前仙子</div>
      <div class="sb-fairy-name">{{ data?.当前互动仙子 }}</div>
      <div class="sb-row">
        <span class="sb-stat">好感 {{ currentFairy.好感度 ?? 0 }}</span>
        <span class="sb-stat">淫乱 {{ currentFairy.淫乱度 ?? 0 }}</span>
        <span class="sb-stat">{{ currentFairy.状态 ?? '--' }}</span>
      </div>
      <div class="sb-row" v-if="currentFairy.体型">
        <span class="sb-tag">体型: {{ currentFairy.体型 }}</span>
        <span class="sb-tag">类型: {{ currentFairy.类型 ?? '--' }}</span>
      </div>
      <div class="sb-mods" v-if="currentFairy.身体改造?.length">
        <span class="sb-tag-mod" v-for="mod in currentFairy.身体改造" :key="mod">{{ mod }}</span>
      </div>
    </div>

    <div class="sb-section">
      <div class="sb-label">掌柜 阮媚娘</div>
      <div class="sb-row">
        <span class="sb-stat">好感 {{ data?.掌柜?.好感度 ?? 0 }}</span>
        <span class="sb-stat">信任 {{ data?.掌柜?.信任度 ?? 0 }}</span>
      </div>
    </div>

    <div class="sb-section" v-if="fairyList.length > 0">
      <div class="sb-label">仙子图鉴 ({{ fairyList.length }})</div>
      <div
        v-for="fairy in fairyList"
        :key="fairy.key"
        :class="['sb-fairy-item', { active: fairy.key === data?.当前互动仙子 }]"
      >
        <span class="sb-fairy-entry">{{ fairy.key }}</span>
        <span class="sb-fairy-stats">{{ fairy.好感度 }} / {{ fairy.淫乱度 }} / {{ fairy.状态 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();
const data = computed(() => store.data);

const currentFairy = computed(() => {
  const name = data.value?.当前互动仙子;
  if (!name) return null;
  return data.value?.仙子图鉴?.[name] ?? null;
});

const fairyList = computed(() => {
  const gallery = data.value?.仙子图鉴;
  if (!gallery) return [];
  return Object.entries(gallery).map(([key, val]) => ({
    key,
    ...val,
  }));
});
</script>

<style lang="scss" scoped>
.status-bar {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 100%;
  overflow-y: auto;
}

.sb-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sb-title {
  font-size: 14px;
  font-weight: 700;
  color: #c084fc;
}

.sb-day {
  font-size: 11px;
  color: #94a3b8;
}

.sb-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 6px 8px;
}

.sb-label {
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.sb-value {
  font-size: 12px;
  color: #e2e8f0;
}

.sb-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.sb-stat {
  font-size: 12px;
  color: #e2e8f0;
}

.sb-fairy-name {
  font-size: 13px;
  font-weight: 600;
  color: #f472b6;
  margin-bottom: 2px;
}

.sb-tag {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  padding: 1px 6px;
  border-radius: 3px;
}

.sb-mods {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 4px;
}

.sb-tag-mod {
  font-size: 9px;
  background: rgba(168, 85, 247, 0.3);
  color: #e2e8f0;
  padding: 1px 5px;
  border-radius: 3px;
}

.sb-fairy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.05);
  margin-top: 2px;
}

.sb-fairy-item.active {
  border: 1px solid #f472b6;
}

.sb-fairy-entry {
  color: #e2e8f0;
  font-weight: 500;
}

.sb-fairy-stats {
  color: #94a3b8;
  font-size: 10px;
}
</style>
