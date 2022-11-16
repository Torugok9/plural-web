<template>
  <v-overlay style="z-index: 100;" :value="loading">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: ["loading"],
};
</script>

<style></style>
