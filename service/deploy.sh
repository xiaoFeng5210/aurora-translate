#!/bin/bash

# 设置变量
SERVICE_NAME="translate_aurora"
EXECUTABLE_PATH="/home/service/translate_aurora/main"

# 添加颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否以 root 权限运行
if [ "$EUID" -ne 0 ]
  then echo -e "${RED}请使用 sudo 运行此脚本${NC}"
  exit 1
fi

# 为可执行文件添加执行权限
echo "为 $EXECUTABLE_PATH 添加执行权限..."
if chmod +x "$EXECUTABLE_PATH"; then
    echo -e "${GREEN}执行权限添加成功${NC}"
else
    echo -e "${RED}添加执行权限失败${NC}"
    exit 1
fi

# 重启服务
echo "重启 $SERVICE_NAME 服务..."
if systemctl restart $SERVICE_NAME; then
    echo -e "${GREEN}服务重启成功${NC}"
else
    echo -e "${RED}服务重启失败${NC}"
    exit 1
fi

# 检查服务状态
echo "检查服务状态..."
systemctl status $SERVICE_NAME

echo -e "${GREEN}脚本执行完毕${NC}"
