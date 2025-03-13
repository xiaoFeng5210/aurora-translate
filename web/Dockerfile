# 第一阶段: 构建阶段
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 复制所有文件
COPY . .

# 注意：next.config.mjs已经设置为output: 'export'，无需修改

# 构建应用 - 静态导出
RUN pnpm build

# 第二阶段: 使用Nginx提供静态文件服务
FROM nginx:alpine

# 复制静态文件到Nginx目录
COPY --from=builder /app/out /usr/share/nginx/html

# 复制Nginx配置文件
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# Nginx在前台运行
CMD ["nginx", "-g", "daemon off;"] 
