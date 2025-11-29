<template>
  <div class="template-form">
    <h3 class="subtitle">{{ id ? '编辑模板' : '新建模板' }}</h3>
    <ui-input
      name="title"
      label="模板标题"
      v-model="title"
      v-validate="'required'"
      :error="getError('title')"
      @enter="validate"
    />
    <ui-input
      name="description"
      type="textarea"
      label="模板描述"
      v-model="description"
    />
    <div class="tag-fields">
      <div class="tag-field" v-for="(tag, index) in tags" :key="index">
        <ui-input
          :name="`tag${index}`"
          label="标签"
          v-model="tags[index]"
          @enter="addTagField"
        />
      </div>
      <ui-button v-if="tags.length < 3" type="text" @click="addTagField">添加标签</ui-button>
    </div>
    <div class="field is-grouped">
      <ui-button type="primary" @click="validate">{{ id ? '更新' : '保存' }}</ui-button>
      <ui-button type="text" @click="cancel">取消</ui-button>
    </div>
  </div>
</template>

<script>
import UiInput from 'core/ui/UiInput'
import UiButton from 'core/ui/UiButton'

function data() {
  return {
    id: null,
    title: '',
    description: '',
    tags: [''],
  }
}

export default {
  components: {
    UiInput,
    UiButton,
  },
  
  data() {
    return data()
  },
  
  methods: {
    show(data = {}) {
      Object.assign(this, data)
      if (!this.tags || this.tags.length === 0) {
        this.tags = ['']
      } else if (this.tags.length < 3) {
        // 确保至少有一个空标签字段
        this.tags.push('')
      }
      this.$nextTick(() => {
        this.$el.querySelector('input').focus()
      })
    },
    
    validate() {
      this.$validator.validate().then(state => {
        if (state) {
          // 过滤空标签
          const validTags = this.tags.filter(tag => tag.trim() !== '')
          const template = {
            id: this.id,
            title: this.title,
            description: this.description,
            tags: validTags,
          }
          this.$emit('submit', template)
        }
      })
    },
    
    cancel() {
      this.$emit('cancel')
      this.reset()
    },
    
    reset() {
      Object.assign(this, data())
    },
    
    addTagField() {
      if (this.tags.length < 3) {
        this.tags.push('')
      }
    },
    
    getError(name) {
      return (this.errors.first(name) || '').replace(/The .+ field/, 'This field')
    },
  },
}
</script>

<style lang="scss" scoped>
.template-form {
  width: 450px;
  padding: 40px 24px 24px 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.subtitle {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.field {
  margin-bottom: 20px;
}

.tag-fields {
  margin-bottom: 24px;
}

.tag-field {
  margin-bottom: 12px;
}

.button {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.button.is-primary {
  background-color: #0079bf;
  border-color: #0079bf;
  color: #fff;
}

.button.is-primary:hover {
  background-color: #006aa8;
  border-color: #006aa8;
}

.button.is-text {
  color: #666;
}

.button.is-text:hover {
  background-color: #f5f7fa;
  color: #333;
}
</style>