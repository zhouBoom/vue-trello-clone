<template>
  <div id="app">
    <div class="mb-4">
      <h1 class="is-size-3">Tasks</h1>
      <p class="subtitle is-6">Add lists and items by typing in the edit boxes. To enter further details, CMD or CTRL Enter.</p>
      <button class="button is-primary ml-2" @click="showTemplateModal = true">模板管理</button>
    </div>
    <div>
      <board/>
    </div>
    
    <!-- 模板管理 Modal -->
    <div class="modal" :class="{ 'is-active': showTemplateModal }">
      <div class="modal-background" @click="showTemplateModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">模板管理</p>
          <button class="delete" aria-label="close" @click="showTemplateModal = false"></button>
        </header>
        <section class="modal-card-body">
          <!-- 模板列表 -->
          <div class="mb-4">
            <h3 class="title is-5">现有模板</h3>
            <div class="template-list">
              <div v-for="template in templates" :key="template.id" class="box mb-2">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <p class="title is-6">{{ template.name }}</p>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <button class="button is-small is-info mr-1" @click="editTemplate(template)">编辑</button>
                      <button class="button is-small is-danger" @click="deleteTemplate(template.id)">删除</button>
                    </div>
                  </div>
                </div>
                <p class="subtitle is-7">{{ template.title }}</p>
                <div class="tags mt-1">
                  <span class="tag" v-for="tag in template.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 模板表单 -->
          <div>
            <h3 class="title is-5">{{ editingTemplate ? '编辑模板' : '创建新模板' }}</h3>
            <form @submit.prevent="saveTemplate">
              <div class="field">
                <label class="label">模板名称</label>
                <div class="control">
                  <input class="input" type="text" v-model="form.name" required>
                </div>
              </div>
              <div class="field">
                <label class="label">默认标题</label>
                <div class="control">
                  <input class="input" type="text" v-model="form.title" required>
                </div>
              </div>
              <div class="field">
                <label class="label">默认描述</label>
                <div class="control">
                  <textarea class="textarea" v-model="form.description"></textarea>
                </div>
              </div>
              <div class="field">
                <label class="label">默认标签 (最多 3 个)</label>
                <div class="control">
                  <div class="tags-input">
                    <input class="input tag-input" type="text" v-model="newTag" placeholder="添加标签" @keyup.enter="addTag">
                    <div class="tags mt-2">
                      <span class="tag" v-for="(tag, index) in form.tags" :key="index">
                        {{ tag }}
                        <button class="delete" @click="removeTag(index)"></button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-primary" type="submit">保存模板</button>
                </div>
                <div class="control">
                  <button class="button is-light" type="button" @click="resetForm">取消</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Board from 'elements/Board'
import { useCardTemplateStore } from './state/index'

export default {
  components: {
    Board
  },
  setup() {
    const templateStore = useCardTemplateStore();
    const showTemplateModal = ref(false);
    const editingTemplate = ref(null);
    const form = ref({
      name: '',
      title: '',
      description: '',
      tags: []
    });
    const newTag = ref('');

    // 获取模板列表
    templateStore.fetchTemplates();

    // 编辑模板
    const editTemplate = (template) => {
      editingTemplate.value = template;
      form.value = { ...template };
    };

    // 删除模板
    const deleteTemplate = (id) => {
      if (confirm('确定要删除这个模板吗？')) {
        templateStore.deleteTemplate(id);
      }
    };

    // 保存模板
    const saveTemplate = () => {
      if (editingTemplate.value) {
        templateStore.updateTemplate(form.value);
      } else {
        templateStore.createTemplate(form.value);
      }
      resetForm();
    };

    // 重置表单
    const resetForm = () => {
      editingTemplate.value = null;
      form.value = {
        name: '',
        title: '',
        description: '',
        tags: []
      };
      newTag.value = '';
    };

    // 添加标签
    const addTag = () => {
      if (newTag.value && form.value.tags.length < 3) {
        form.value.tags.push(newTag.value.trim());
        newTag.value = '';
      }
    };

    // 移除标签
    const removeTag = (index) => {
      form.value.tags.splice(index, 1);
    };

    return {
      templates: templateStore.templates,
      showTemplateModal,
      editingTemplate,
      form,
      newTag,
      editTemplate,
      deleteTemplate,
      saveTemplate,
      resetForm,
      addTag,
      removeTag
    };
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }

  body {
    padding: 20px;
  }
</style>
