import { defineStore } from 'pinia';
import CardTemplateService from '@/services/CardTemplateService';
import { useBoardStore } from './boardStore';

// 初始化默认模板
CardTemplateService.initDefaultTemplates();

export const useCardTemplateStore = defineStore('cardTemplate', {
  state: () => ({
    templates: CardTemplateService.getTemplates()
  }),
  actions: {
    fetchTemplates() {
      this.templates = CardTemplateService.getTemplates();
    },
    createTemplate(template) {
      const newTemplate = CardTemplateService.createTemplate(template);
      this.templates.push(newTemplate);
      return newTemplate;
    },
    updateTemplate(template) {
      const updatedTemplate = CardTemplateService.updateTemplate(template);
      if (updatedTemplate) {
        const index = this.templates.findIndex(t => t.id === template.id);
        if (index !== -1) {
          this.templates[index] = updatedTemplate;
        }
      }
      return updatedTemplate;
    },
    deleteTemplate(id) {
      const success = CardTemplateService.deleteTemplate(id);
      if (success) {
        this.templates = this.templates.filter(t => t.id !== id);
      }
      return success;
    }
  }
});

export { useCardTemplateStore, useBoardStore };

export default useCardTemplateStore;
