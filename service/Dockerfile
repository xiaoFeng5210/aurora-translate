# 第一阶段: 构建阶段
FROM golang:1.24 AS builder

ENV GOPROXY=https://mirrors.aliyun.com/goproxy/

# 设置工作目录
WORKDIR /app

# 将 go.mod 和 go.sum 文件复制到工作目录
COPY go.mod go.sum ./

# 下载依赖
RUN go mod download

# 将源代码复制到工作目录
COPY . .

# 构建可执行文件
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o main .

# 第二阶段: 运行阶段
FROM alpine:latest

# 安装所需的 CA 证书和时区数据
RUN apk --no-cache add ca-certificates tzdata

# 设置工作目录
WORKDIR /root

# 创建日志目录
RUN mkdir -p /root/logs

# 从构建阶段复制二进制文件
COPY --from=builder /app/main .
COPY --from=builder /app/.env .

# 设置时区
ENV TZ=Asia/Shanghai

# 暴露服务端口
EXPOSE 8080

# 启动应用程序
CMD ["./main"]
