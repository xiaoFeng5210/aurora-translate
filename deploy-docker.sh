#!/bin/bash

# 显示彩色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}开始部署 Aurora Translate 应用...${NC}"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 停止并移除旧容器（如果存在）
echo -e "${YELLOW}停止并移除旧容器...${NC}"
docker-compose down

# 构建新镜像
echo -e "${YELLOW}构建新镜像...${NC}"
docker-compose build

# 启动容器
echo -e "${YELLOW}启动容器...${NC}"
docker-compose up -d

# 检查容器状态
echo -e "${YELLOW}检查容器状态...${NC}"
docker-compose ps

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}前端访问地址: http://localhost${NC}"
echo -e "${GREEN}后端API地址: http://localhost:8080${NC}"
echo -e "${GREEN}数据库地址: localhost:5432${NC}"

# 显示日志的提示
echo -e "${YELLOW}查看容器日志:${NC}"
echo "前端日志: docker logs -f aurora-translate-frontend"
echo "后端日志: docker logs -f aurora-translate-backend"
echo "数据库日志: docker logs -f aurora-translate-postgres" 
