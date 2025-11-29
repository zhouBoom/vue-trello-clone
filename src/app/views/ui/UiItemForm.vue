<template>

  <div class="query-form card">
    <div class="card-content">
      <h2 class="title">New task</h2>
      
      <!-- 模板选择区域 -->
      <div class="template-select" v-if="templates.length > 0">
        <label class="label">选择模板</label>
        <div class="select">
          <select v-model="selectedTemplateId" @change="applyTemplate">
            <option value="">请选择模板</option>
            <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.title }}</option>
          </select>
        </div>
      </div>
      <ui-input name="title"
                label="Title"
                v-model="title"
                v-validate="'required'"
                :error="getError('title')"
                @enter="validate"
      />
      <ui-input name="description"
                type="textarea"
                label="Description"
                v-model="description"
      />
      <ui-input name="date"
                type="date"
                label="Date"
                v-model="date"
                @enter="validate"
      />
      <div class="field is-grouped">
        <ui-button type="primary" @click="validate">{{ id ? 'Update' : 'Add' }}</ui-button>
        <ui-button type="text" @click="cancel">Cancel</ui-button>
      </div>
    </div>
  </div>

</template>

<script>

function data () {
  return {
    id: null,
    title: '',
    description: '',
    date: null,
    message: '',
    selectedTemplateId: '',
  }
}

export default {
  data () {
    return data()
  },

  computed: {
    values () {
      return this.$data
    },
    
    templates() {
      return this.$store.getters.getAllTemplates
    },
  },

  methods: {
    show (data) {
      Object.assign(this, data)
      this.selectedTemplateId = ''
      this.$el.querySelector('input').focus()
    },
    
    applyTemplate() {
      if (this.selectedTemplateId) {
        const template = this.$store.getters.getTemplateById(this.selectedTemplateId)
        if (template) {
          this.title = template.title
          this.description = template.description
          // 可以在这里处理标签，但当前表单没有标签字段
        }
      }
    },

    validate () {
      this.$validator
        .validate()
        .then(state => {
          if (state) {
            return this.submit()
          }
          this.message = 'Please complete the required fields!'
        })
    },

    submit () {
      this.$emit('submit', this.values)
      this.reset()
    },

    cancel () {
      this.$emit('cancel', this.values)
      this.reset()
    },

    reset () {
      Object.assign(this, data())
    },

    getError (name) {
      return (this.errors.first(name) || '').replace(/The .+ field/, 'This field')
    }
  }
}

</script>

<style lang="scss">

</style>
