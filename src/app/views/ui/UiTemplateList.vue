<template>
  <div class="template-list">
    <div class="template-list-header">
      <h2 class="title">模板管理</h2>
      <ui-button type="primary" @click="openCreateTemplateModal">新建模板</ui-button>
    </div>
    
    <div class="template-items">
      <div v-for="template in templates" :key="template.id" class="template-item">
        <div class="template-content">
          <h3 class="template-title">{{ template.title }}</h3>
          <p class="template-description" v-if="template.description">{{ template.description }}</p>
          <div class="template-tags" v-if="template.tags.length > 0">
            <span v-for="tag in template.tags" :key="tag" class="template-tag">{{ tag }}</span>
          </div>
        </div>
        <div class="template-actions">
          <ui-button type="text" @click="openEditTemplateModal(template)">编辑</ui-button>
          <ui-button type="text" @click="deleteTemplate(template.id)">删除</ui-button>
        </div>
      </div>
      <div v-if="templates.length === 0" class="no-templates">
        暂无模板，请点击上方按钮创建第一个模板
      </div>
    </div>
    
    <!-- 创建模板模态框 -->
    <ui-modal :active="showCreateModal" :cancellable="1" @close="closeCreateTemplateModal">
      <UiTemplateForm ref="createForm" @submit="createTemplate" @cancel="closeCreateTemplateModal"/>
    </ui-modal>
    
    <!-- 编辑模板模态框 -->
    <ui-modal :active="showEditModal" :cancellable="1" @close="closeEditTemplateModal">
      <UiTemplateForm ref="editForm" @submit="updateTemplate" @cancel="closeEditTemplateModal"/>
    </ui-modal>
  </div>
</template>

<script>
import UiButton from 'core/ui/UiButton'
import UiModal from 'core/ui/UiModal'
import UiTemplateForm from './UiTemplateForm'

export default {
  components: {
    UiButton,
    UiModal,
    UiTemplateForm,
  },
  
  data() {
    return {
      showCreateModal: false,
      showEditModal: false,
      editingTemplate: null,
    }
  },
  
  computed: {
    templates() {
      return this.$store.getters.getAllTemplates
    },
  },
  
  methods: {
    openCreateTemplateModal() {
      this.showCreateModal = true
    },
    
    closeCreateTemplateModal() {
      this.showCreateModal = false
    },
    
    openEditTemplateModal(template) {
      this.editingTemplate = template
      this.showEditModal = true
      this.$nextTick(() => {
        this.$refs.editForm.show(template)
      })
    },
    
    closeEditTemplateModal() {
      this.editingTemplate = null
      this.showEditModal = false
    },
    
    async createTemplate(template) {
      await this.$store.dispatch('createTemplate', template)
      this.closeCreateTemplateModal()
    },
    
    async updateTemplate(template) {
      await this.$store.dispatch('updateTemplate', template)
      this.closeEditTemplateModal()
    },
    
    async deleteTemplate(id) {
      if (confirm('确定要删除这个模板吗？')) {
        await this.$store.dispatch('deleteTemplate', id)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.template-list {
  width: 550px;
  background-color: #fff;
  border-radius: 12px;
  padding: 40px 24px 24px 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.template-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.template-items {
  max-height: 450px;
  overflow-y: auto;
}

.template-item {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.2s ease;
  border: 1px solid #f0f0f0;
}

.template-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.template-content {
  flex: 1;
  margin-right: 16px;
}

.template-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.template-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
}

.template-tags {
  display: flex;
  flex-wrap: wrap;
  
  .template-tag {
    background: #f5f7fa;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    margin-right: 6px;
    margin-bottom: 6px;
    color: #333;
    border: 1px solid #e0e0e0;
  }
}

.template-actions {
  display: flex;
  flex-direction: column;
  
  button {
    margin-bottom: 6px;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
  }
}

.no-templates {
  text-align: center;
  color: #999;
  padding: 60px 20px;
  background-color: #fafafa;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #f0f0f0;
}
</style>