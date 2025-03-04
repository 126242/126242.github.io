# VitePress-Butterfly ����

����VitePress��Element Plus���ִ����ĵ����⣬���ɶ�����ǿ���ܺ��Ӿ��Ż���

## ? ����

- ���� VitePress 1.6.3 + Vue 3 ����
- ���� Element Plus �����
- ��Ӧʽ���ֺͶ�̬������
- �Զ���������ʽϵͳ
- �������¿�Ƭ����ǩ�Ƶ����
- ֧�ְ�ɫ/��ɫ�����л�
- SEO �Ѻ�����
- ��̬��Դ�Զ��Ż�

## ? ���ٿ�ʼ

### ��װ����
```bash
npm install
```
����ģʽ

```bash
npm run dev
```
���������汾
> �⽫���ɹ�����docsĿ¼������ֱ�Ӳ���GitHub Pages
>

```bash
npm run build:docs
```
## ����ָ��
�޸� .vitepress/config.mjs �����������ã�


```javascript
export default defineConfig({
  title: "վ�����",
  themeConfig: {
    // �����˵�����
    menuItems: [
      {
        label: '�ĵ�',
        icon: 'fa-regular fa-file',
        link: '/guide'
      }
    ],
    
    // ������Ϣ
    defaultauthor: '��������',
    
    // �罻����
    socialLinks: [
      { 
        name: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com/yourprofile'
      }
    ],
    
    // ҳ������
    footer: {
      message: "������Ϣ",
      copyright: "Copyright ? 2024-present Your Name"
    }
  }
})
```
### Ŀ¼�ṹ

```plainText
Blog/
������ .vitepress/
��   ������ theme/          # �������
��   ������ config.mjs      # վ������
������ posts/             # Markdown����
������ public/            # ��̬��Դ
������ package.json       # ��������
```
### ���¹淶
�� posts Ŀ¼�д��� .md �ļ���


```markdown
Apply
---
title: ���±���
date: 2024-03-20
author: ����
layout: home # ��ѡ����
---
```
����
��ӭ���״���ͷ������⡣