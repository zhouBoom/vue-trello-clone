<template>

  <div class="card" :class="classes" :data-id="item.id">
    <div class="icons">
      <span v-if="isDue" class="icon icon-due has-text-warning" :title="`Item is due on ${item.date}`">
        <i class="fas fa-star"></i>
      </span>
      <span v-else-if="timestamp" class="icon icon-date" :title="`Item is due on ${item.date}`">
        <i class="far fa-bell"></i>
      </span>
      <span class="icon icon-edit" @click="edit">
        <i class="fas fa-edit"></i>
      </span>
      <span class="icon icon-delete" @click="remove">
        <i class="fas fa-trash"></i>
      </span>
    </div>
    <div>
      <p class="item-title">{{ item.title }}</p>
      <p class="item-description" v-if="item.description">{{ item.description }}</p>
    </div>
  </div>

</template>

<script>
import { format } from 'date-fns'
import CardService from '@/services/CardService'

export default {
  props: {
    item: Object
  },

  computed: {
    classes () {
      return {
        'card-overdue': this.isOverdue,
        'card-due': this.isDue,
      }
    },
    timestamp () {
      return this.item.date ? format(this.item.date, 'MMM D, YYYY') : ''
    },
    isOverdue () {
      return this.item.date && this.item.date < new Date()
    },
    isDue () {
      return this.item.date && this.item.date >= new Date()
    }
  },

  methods: {
    edit () {
      this.$emit('edit', this.item)
    },
    remove () {
      if (confirm('确定要删除这个卡片吗？')) {
        CardService.deleteCard(this.item.id)
        this.$emit('delete', this.item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 3px;
  cursor: default;
}

.item-description {
  font-size: 0.7em;
}

.icons {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.is-due {
  border: 1px solid yellow;
}

.is-overdue {
  border: 1px solid red;
}

.card:hover {
  .icon-due,
  .icon-date {
    display: none;
  }
}

.icon-edit,
.icon-date {
  color: #DDD;
}

.icon-edit {
  display: none;
  margin-right: -5px;
  .card:hover & {
    display: block;
  }
}

.icon-delete {
  color: #ff3860;
}
</style>
