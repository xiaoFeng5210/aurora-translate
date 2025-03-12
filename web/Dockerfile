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

# 创建自定义Nginx配置
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # 处理前端路由 \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # API代理 - 将/api开头的请求转发到后端服务 \
    location /api/ { \
        proxy_pass http://backend:8080/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# Nginx在前台运行
CMD ["nginx", "-g", "daemon off;"] 
