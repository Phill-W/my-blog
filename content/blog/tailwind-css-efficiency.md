---
title: 使用 Tailwind CSS 提升开发效率
description: 整理我在实际写页面时常用的 Tailwind CSS 经验。
date: 2026-05-12
readingTime: 8 分钟阅读
tags:
  - Tailwind CSS
  - CSS
---

## 一、为什么我喜欢 Tailwind CSS

它最大的好处不是类名多，而是你写样式的时候不用频繁在 JSX 和 CSS 文件之间来回跳。

对于练布局和组件拆分特别友好，因为你能很快看到页面结构和样式是怎么对应的。

## 二、我最常用的写法

像 `grid`、`flex`、`gap`、`rounded-2xl`、`text-muted-foreground` 这种组合，我在做博客原型时会高频复用。

当页面组件边界清楚时，Tailwind 会让视觉调整变得非常快。

## 三、容易踩的坑

初学时最容易把所有类都堆在一个大组件里，最后 JSX 很长，反而看不懂。

正确做法不是少写类，而是及时拆组件，让每个组件只负责一小块 UI。
