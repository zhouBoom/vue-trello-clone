<template>
  <div class="query-form card">
    <div class="card-content">
      <h2 class="title">New task</h2>
      
      <!-- 模板选择下拉框 -->
      <div class="field">
        <label class="label">模板选择</label>
        <div class="control">
          <div class="select">
            <select v-model="selectedTemplateId" @change="applyTemplate">
              <option value="">请选择模板</option>
              <option v-for="template in templates" :key="template.id" :value="template.id">{{ template.name }}</option>
            </select>
          </div>
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
import { useCardTemplateStore } from '../../state/index';

function data () {
  return {
    id: null,
    title: '',
    description: '',
    date: null,
    message: '',
    selectedTemplateId: ''
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
    templates () {
      return this.templateStore.templates
    }
  },

  setup() {
    const templateStore = useCardTemplateStore()
    templateStore.fetchTemplates()
    return {
      templateStore
    }
  },

  methods: {
    show (data) {
      Object.assign(this, data)
      this.$el.querySelector('input').focus()
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
    },

    // 应用模板
    applyTemplate () {
      if (this.selectedTemplateId) {
        const template = this.templates.find(t => t.id === this.selectedTemplateId)
        if (template) {
          this.title = template.title
          this.description = template.description
          // 模板中的标签暂时不处理，因为原表单没有标签字段
        }
      }
    }
  }
}

</script>

<style lang="scss">

</style>
