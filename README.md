# 我的 Vue3 + TSX 项目

## 编码规范

### ref 默认值

推荐使用

```tsx
const div = ref<HTMLDivElement>()
```

不推荐使用

```tsx
const div = ref<HTMLDivElement | null>(null)
```

## 如何开发

## 如何打包
```bash
pnpm run build
```

## 部署
```bash
bin/coscli-linux cp -r dist/ cos://mangosteen-1314521670
```

## api 文档地址

http://121.196.236.94:8080/apidoc/

https://mangosteen2.hunger-valley.com/apidoc/

## api 地址

http://121.196.236.94:8080/api/v1/me

https://mangosteen2.hunger-valley.com
