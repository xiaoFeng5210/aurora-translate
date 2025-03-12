#!/bin/bash

# 显示彩色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}准备启动 Aurora Translate 应用...${NC}"

# 确保日志目录存在
mkdir -p service/logs
echo -e "${GREEN}已创建日志目录: service/logs${NC}"

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

# 赋予部署脚本执行权限
chmod +x deploy-docker.sh

# 运行部署脚本
echo -e "${YELLOW}开始部署...${NC}"
./deploy-docker.sh

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}您可以通过以下命令查看日志:${NC}"
echo "前端日志: docker logs -f aurora-translate-frontend"
echo "后端日志: docker logs -f aurora-translate-backend"
echo "数据库日志: docker logs -f aurora-translate-postgres"
echo -e "${GREEN}日志文件位置: ./service/logs/${NC}" 
