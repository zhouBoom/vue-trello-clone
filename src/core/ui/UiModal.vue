<template>

  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background" @mousedown="cancel"></div>
    <div class="modal-content">
      <slot></slot>
      <button v-if="cancellable" class="modal-close" @click="cancel">&times;</button>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    active: Boolean,
    cancellable: [Number, Boolean],
  },

  mounted () {
    window.addEventListener('keydown', this.onKeyDown)
  },

  destroyed () {
    window.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    cancel () {
      if (this.cancellable) {
        this.close()
      }
    },

    close () {
      this.$emit('close')
    },

    onKeyDown (event) {
      if (event.key === 'Escape') {
        this.cancel()
      }
    }
  }
}

</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal.is-active {
  opacity: 1;
  visibility: visible;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  margin: 20px;
  max-width: 90%;
  max-height: 90vh;
  overflow: auto;
  animation: modal-fade-in 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  font-size: 24px;
  font-weight: 700;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: #f5f7fa;
  color: #333;
  transform: scale(1.1);
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
