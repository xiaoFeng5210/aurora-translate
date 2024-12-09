# 第一阶段: 构建阶段
FROM golang:1.20.4 AS builder

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

# 安装所需的 CA 证书（Gin 等框架可能需要）
RUN apk --no-cache add ca-certificates

# 设置工作目录
WORKDIR /root/

# 从构建阶段复制二进制文件
COPY --from=builder /app/main .

# 暴露服务端口（根据你的 Gin 项目配置的端口）
EXPOSE 8080

# 启动应用程序
CMD ["./main"]
